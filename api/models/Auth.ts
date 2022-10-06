export interface AuthLoginParams {
    email: string;
    password: string;
}

export type SendPasswordResetEmailParams = Pick<AuthLoginParams, 'email'>;
