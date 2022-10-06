import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { adminLoginPath } from '#/AppRoutes';
import { useAxios } from '#/context/AxiosProvider';
import { AuthLoginParams, SendPasswordResetEmailParams } from '#api/models/Auth';
import { User } from '#api/models/User';

export const useLogin = () => {
    const axios = useAxios();
    const queryClient = useQueryClient();

    return useMutation(
        async (data: AuthLoginParams) => {
            return (await axios.post<User>('/api/auth/login', data)).data;
        },
        {
            onSuccess: (user) => {
                queryClient.setQueryData<User>(['me'], user);
            },
        }
    );
};

export const useLogout = () => {
    const axios = useAxios();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation(
        async () => {
            return (await axios.post('/api/auth/logout')).data;
        },
        {
            onSuccess: async () => {
                navigate(adminLoginPath);
                await queryClient.cancelQueries();
                await queryClient.clear();
            },
        }
    );
};

export const useSendPasswordResetEmail = () => {
    const axios = useAxios();

    return useMutation(async (data: SendPasswordResetEmailParams) => {
        return (await axios.post('/api/auth/forgotPassword', data)).data;
    });
};
