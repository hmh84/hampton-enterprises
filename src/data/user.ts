import { useQuery } from '@tanstack/react-query';

import { useAxios } from '#/context/AxiosProvider';
import { User } from '#api/models/User';

export const useUserInfo = () => {
    const axios = useAxios();
    return useQuery<User>(['me'], async () => {
        return (await axios.get('/api/user/user')).data;
    });
};
