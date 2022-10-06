import fbAdmin from 'firebase-admin';

import * as AuthModels from '../models/Auth';
import * as AuthService from '../services/Auth';
import { Controller, Status } from './';

export const authTokenName = process.env.VITE_AUTH_TOKEN_NAME as string;

const AuthController: Controller = {
    prefix: '/auth',
    routes: [
        {
            endpoint: '/login',
            method: 'POST',
            authorized: false,
            callback: async (req, res) => {
                const { email, password } = req.body as AuthModels.AuthLoginParams;
                const { status, user, authToken, tokenExpiration } = await AuthService.Login({ email, password });

                if (status !== Status.Ok || !user || !authToken || !tokenExpiration) {
                    return res.status(Status.BadRequest).send(status as string);
                }

                return res
                    .cookie(authTokenName, authToken, {
                        sameSite: 'strict',
                        httpOnly: false,
                        expires: tokenExpiration,
                    })
                    .status(status)
                    .send(user);
            },
        },
        {
            endpoint: '/logout',
            method: 'POST',
            authorized: true,
            callback: async (req, res) => {
                try {
                    await fbAdmin.auth().revokeRefreshTokens(req.uid);
                    return res.clearCookie(authTokenName).status(Status.Ok).send(Status.Ok);
                } catch (error) {
                    return res.status(Status.BadRequest).send((error as Error).message);
                }
            },
        },
        {
            endpoint: '/forgotPassword',
            method: 'POST',
            authorized: false,
            callback: async (req, res) => {
                const status = await AuthService.SendPasswordResetEmail(req.body);
                return status === Status.Ok
                    ? res.status(status).send(status)
                    : res.status(Status.BadRequest).send(status);
            },
        },
    ],
};

export default AuthController;
