import { Typography, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';

import AppLayout from '#/layout/AppLayout';

export default function NotFound() {
    const { pathname } = useLocation();

    return (
        <AppLayout
            pageTitle="Not Found"
            sx={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Typography variant="h1">404 Page not found.</Typography>
            <br />
            <Typography color="text.secondary">
                If you believe this is a mistake and continue to see this message, please let us know.
            </Typography>
            <br />
            <Button href={`${pathname.startsWith('/admin') ? '/admin' : '/'}`} variant="contained" color="secondary">
                Return to Home
            </Button>
        </AppLayout>
    );
}
