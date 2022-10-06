import { Typography } from '@mui/material';

import AppLayout from '#/layout/AppLayout';

export default function PublicHome() {
    return (
        <AppLayout pageTitle="Home">
            <Typography variant="h1">Hello World</Typography>
        </AppLayout>
    );
}
