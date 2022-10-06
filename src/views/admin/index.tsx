import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { FormInputText } from '#/components/form/FormInputText';
import Loading from '#/components/Loading';
import Missing from '#/components/Missing';
import { useLogout } from '#/data/auth';
import { useUpdateUser, useUserInfo } from '#/data/user';
import AppLayout from '#/layout/AppLayout';
import { getErrorMsg } from '#/util/helper';
import { UpdateUserParams } from '#api/models/User';

const validation = yup
    .object({
        displayName: yup.string().min(3).required(),
    })
    .required();

export default function AdminHome() {
    const { enqueueSnackbar } = useSnackbar();
    const { data: user, isLoading: userIsLoading } = useUserInfo();
    const logOut = useLogout();
    const updateUser = useUpdateUser();

    const disableActions = logOut.isLoading || updateUser.isLoading;

    const { handleSubmit, control, getValues } = useForm<UpdateUserParams>({
        resolver: yupResolver(validation),
        defaultValues: {
            displayName: user?.displayName,
        },
    });

    if (userIsLoading) return <Loading text="Loading user data..." />;
    if (!user) return <Missing text="Loading user data..." />;

    const handleLogout = async () => {
        try {
            await logOut.mutateAsync();
        } catch (error) {
            enqueueSnackbar(getErrorMsg(error), {
                variant: 'error',
            });
        }
    };

    const handleUpdateUser = async () => {
        try {
            await updateUser.mutateAsync(getValues());
            enqueueSnackbar('Updated', {
                variant: 'success',
            });
        } catch (error) {
            enqueueSnackbar(getErrorMsg(error), {
                variant: 'error',
            });
        }
    };

    return (
        <AppLayout pageTitle="Administration" sx={{ flexDirection: 'column' }}>
            <Typography variant="h4" component="h1" sx={{ mb: 1 }}>
                Hello {user.displayName} ({user.email})
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit(handleUpdateUser)}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                }}
            >
                <FormInputText
                    defaultValue={user.displayName}
                    name="displayName"
                    label="Display Name"
                    placeholder="Jane Doe"
                    control={control}
                    type="name"
                    fullWidth
                    autoFocus
                    sx={{ mb: 1 }}
                />
                <LoadingButton type="submit" disabled={disableActions} loading={updateUser.isLoading} sx={{ mb: 1 }}>
                    Save
                </LoadingButton>
                <LoadingButton onClick={handleLogout} disabled={disableActions} loading={logOut.isLoading}>
                    Logout
                </LoadingButton>
            </Box>
        </AppLayout>
    );
}
