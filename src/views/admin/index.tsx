import { Typography } from '@mui/material';

import Loading from '#/components/Loading';
import Missing from '#/components/Missing';
import { useUserInfo } from '#/data/user';
import AppLayout from '#/layout/AppLayout';

export default function AdminHome() {
    const { data: user, isLoading: userIsLoading } = useUserInfo();

    if (userIsLoading) return <Loading text="Loading user data..." />;
    if (!user) return <Missing text="Loading user data..." />;

    return (
        <AppLayout pageTitle="Administration">
            <Typography variant="h4" component="h1">
                Hello {user.displayName ?? 'Undefined'} ({user.email})
            </Typography>
        </AppLayout>
    );
}
