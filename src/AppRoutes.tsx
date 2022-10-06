import { Route, Routes } from 'react-router-dom';

import Login from '#/views/admin/Login';
import NotFound from '#/views/NotFound';

import AdminHome from './views/admin';
import AuthGuard from './views/admin/AuthGuard';
import PublicHome from './views/home';

export const adminLoginPath = `/admin/login`; // Keep this in back ticks for react-router-dom to use correctly

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/">
                <Route index element={<PublicHome />} />
                <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="admin">
                <Route
                    index
                    element={
                        <AuthGuard>
                            <AdminHome />
                        </AuthGuard>
                    }
                />
                <Route path="login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}
