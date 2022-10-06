import { yupResolver } from '@hookform/resolvers/yup';
import { Email, Password } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, InputAdornment, Typography } from '@mui/material';
import { useModal } from 'mui-modal-provider';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import ConfirmDialog from '#/components/ConfirmDialog';
import { FormInputText } from '#/components/form/FormInputText';
import { useLogin, useSendPasswordResetEmail } from '#/data/auth';
import AppLayout from '#/layout/AppLayout';
import { appName, getErrorMsg } from '#/util/helper';
import { emailRegEx } from '#/util/validation';

interface LoginForm {
    email: string;
    password: string;
    confirmPassword: string;
}

const validation = yup
    .object({
        email: yup
            .string()
            .required('Email address is required')
            .matches(emailRegEx, { message: 'You must enter a valid email address' }),
        password: yup.string().required('Password is required'),
    })
    .required();

export default function Login() {
    const { showModal } = useModal();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const login = useLogin();
    const sendPasswordResetEmail = useSendPasswordResetEmail();

    const { handleSubmit, control, getValues } = useForm<LoginForm>({
        resolver: yupResolver(validation),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async () => {
        try {
            await login.mutateAsync(getValues());
            navigate(`/admin`);
        } catch (error) {
            enqueueSnackbar(getErrorMsg(error), {
                variant: 'error',
            });
        }
    };

    const handleSendResetPasswordEmail = async () => {
        const { email } = getValues();

        const modal = showModal(ConfirmDialog, {
            title: 'Reset Password',
            message: `Send a reset password email to ${email}?`,
            acceptButtonText: 'Send',
            declineButtonText: 'Cancel',
            onDecline: () => {
                modal.hide();
            },
            onAccept: async () => {
                try {
                    await sendPasswordResetEmail.mutateAsync({ email });
                    modal.hide();
                    enqueueSnackbar('Password reset email sent.', {
                        variant: 'success',
                    });
                } catch (error) {
                    enqueueSnackbar(getErrorMsg(error), {
                        variant: 'error',
                    });
                }
            },
        });
    };

    return (
        <AppLayout pageTitle="Login" sx={{ flexDirection: 'column', maxWidth: 650 }}>
            <Box sx={{ my: 'auto' }}>
                <Typography variant="h4" component="h1" color="primary" textAlign="center">
                    {appName} Administration
                    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                        <FormInputText
                            name="email"
                            placeholder="Email"
                            control={control}
                            type="email"
                            fullWidth
                            autoFocus
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start" sx={{ color: 'primary.main' }}>
                                        <Email />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ mb: 1 }}
                        />
                        <FormInputText
                            name="password"
                            placeholder="Password"
                            control={control}
                            type="password"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start" sx={{ color: 'primary.main' }}>
                                        <Password />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ mb: 1 }}
                        />
                        <LoadingButton
                            variant="outlined"
                            color="error"
                            loading={sendPasswordResetEmail.isLoading}
                            disabled={login.isLoading}
                            loadingPosition="center"
                            onClick={handleSendResetPasswordEmail}
                            sx={{ mr: 1 }}
                        >
                            Reset Password
                        </LoadingButton>
                        <LoadingButton
                            variant="contained"
                            color="primary"
                            type="submit"
                            loading={login.isLoading}
                            disabled={sendPasswordResetEmail.isLoading}
                            loadingPosition="center"
                        >
                            Login
                        </LoadingButton>
                    </Box>
                </Typography>
            </Box>
        </AppLayout>
    );
}
