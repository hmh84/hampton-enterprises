import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useAxios } from '#/context/AxiosProvider';
import { UpdateUserParams } from '#api/models/User';
import { User } from '#api/models/User';

export const useUserInfo = () => {
    const axios = useAxios();

    return useQuery<User>(['me'], async () => {
        return (await axios.get('/api/user/user')).data;
    });
};

export const useUpdateUser = () => {
    const axios = useAxios();
    const queryClient = useQueryClient();

    return useMutation(
        async (data: UpdateUserParams) => {
            return (await axios.patch('/api/user/update', data)).data;
        },
        {
            onSuccess: (res, updateParams) => [
                queryClient.setQueryData<User | undefined>(['me'], (oldData) => {
                    return !oldData ? oldData : { ...oldData, ...updateParams };
                }),
            ],
        }
    );
};
