import { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { adminLoginPath } from '#/AppRoutes';
import Loading from '#/components/Loading';
import { useUserInfo } from '#/data/user';

export default function AuthGuard({ children }: PropsWithChildren<unknown>) {
    const { data: user, isLoading: userIsLoading } = useUserInfo();
    const location = useLocation();

    if (userIsLoading) return <Loading text="Logging in..." />;

    if (!user) return <Navigate to={adminLoginPath} state={{ from: location }} />;

    return <>{children}</>;
}
