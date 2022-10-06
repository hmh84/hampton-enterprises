import { Button } from '@mui/material';
import { SnackbarKey, SnackbarProvider, useSnackbar } from 'notistack';
import { PropsWithChildren } from 'react';

function SnackbarCloseButton({ snackbarId }: { snackbarId: SnackbarKey }) {
    const { closeSnackbar } = useSnackbar();

    return (
        <Button variant="text" sx={{ color: 'background.default' }} onClick={() => closeSnackbar(snackbarId)}>
            Close
        </Button>
    );
}

export default function SnackbarsProvider({ children }: PropsWithChildren<unknown>) {
    return (
        <SnackbarProvider
            maxSnack={2}
            action={(snackbarId) => <SnackbarCloseButton snackbarId={snackbarId} />}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            autoHideDuration={5000}
        >
            {children}
        </SnackbarProvider>
    );
}
