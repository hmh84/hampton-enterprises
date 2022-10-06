import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogProps,
    DialogTitle,
} from '@mui/material';

interface ConfirmDialogProps extends DialogProps {
    message: string;
    title?: string;
    acceptButtonText?: string;
    onAccept?: () => void;
    declineButtonText?: string;
    onDecline?: () => void;
}

export default function ConfirmDialog({
    title,
    message,
    onAccept,
    acceptButtonText = 'Yes',
    onDecline,
    declineButtonText = 'No',
    children,
    ...rest
}: ConfirmDialogProps) {
    return (
        <Dialog aria-labelledby="confirm-dialog-title" aria-describedby="confirm-dialog-description" {...rest}>
            {title && <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>}
            <DialogContent>
                <DialogContentText id="confirm-dialog-description" sx={{ mb: !!children ? 2 : 0 }}>
                    {message}
                </DialogContentText>
                {children}
            </DialogContent>
            <DialogActions>
                {onDecline && <Button onClick={() => onDecline()}>{declineButtonText}</Button>}
                {!!onAccept && (
                    <Button color="secondary" variant="contained" onClick={() => onAccept()}>
                        {acceptButtonText}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}
