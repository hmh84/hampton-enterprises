import { yupResolver } from '@hookform/resolvers/yup';
import { Email, Password } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, InputAdornment, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

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
        } catch (error: any) {
            enqueueSnackbar(getErrorMsg(error), {
                variant: 'error',
            });
        }
    };

    const handleResetPassword = async () => {
        const { email } = getValues();

        try {
            await sendPasswordResetEmail.mutateAsync({ email });
            enqueueSnackbar('Password reset email sent.', {
                variant: 'success',
            });
        } catch (error: any) {
            enqueueSnackbar(getErrorMsg(error), {
                variant: 'error',
            });
        }
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
                            variant="contained"
                            color="primary"
                            type="submit"
                            loading={login.isLoading}
                            disabled={sendPasswordResetEmail.isLoading}
                            loadingPosition="center"
                        >
                            Login
                        </LoadingButton>
                        <LoadingButton
                            variant="outlined"
                            color="error"
                            loading={sendPasswordResetEmail.isLoading}
                            disabled={login.isLoading}
                            loadingPosition="center"
                            onClick={handleResetPassword}
                        >
                            Reset Password
                        </LoadingButton>
                    </Box>
                </Typography>
            </Box>
        </AppLayout>
    );
}
