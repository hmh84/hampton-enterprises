import Axios, { AxiosInstance, AxiosError } from 'axios';
import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

import { adminLoginPath } from '#/AppRoutes';

export function isAxiosError(value: any): value is AxiosError {
    return !!(value as AxiosError);
}

export const AxiosContext = createContext<AxiosInstance>(Axios);

export default function AxiosProvider({ children }: PropsWithChildren<unknown>) {
    const axios = useMemo(() => {
        const axiosInstance = Axios.create({
            headers: {
                'Content-Type': 'application/json',
            },
        });

        axiosInstance.defaults.withCredentials = true;

        // 401 Unauthorized responses should immediately redirect to login page
        axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response.status !== 401) {
                    return Promise.reject(error);
                }

                if (window.location.pathname !== adminLoginPath) {
                    window.location.href = adminLoginPath;
                }
            }
        );

        return axiosInstance;
    }, []);

    return <AxiosContext.Provider value={axios}>{children}</AxiosContext.Provider>;
}

export const useAxios = () => useContext(AxiosContext);
