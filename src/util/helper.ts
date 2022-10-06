import { isError } from '@tanstack/react-query';

import { isAxiosError } from '#/context/AxiosProvider';

export const appName = 'Hampton Enterprises';

export const isDevel = () => {
    return import.meta.env.ENVIRONMENT === 'DEVELOPMENT';
};

export const isProd = () => {
    return import.meta.env.ENVIRONMENT === 'PRODUCTION';
};

export const getErrorMsg = (error: any) => {
    if (isAxiosError(error) && error.response?.data) {
        return error.response.data as string;
    }

    if (isError(error)) {
        return error.message;
    }

    return 'An unknown error occurred.';
};
