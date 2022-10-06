import fbAdmin from 'firebase-admin';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';

import { Status } from '../controllers';
import { auth } from '../firebase';
import * as AuthModels from '../models/Auth';
import * as UserService from '../services/User';

export const CheckAuth = async (authToken: string | undefined) => {
    if (!authToken) return { isVerified: false, uid: undefined };

    try {
        const verifyTokenResult = await fbAdmin.auth().verifyIdToken(authToken);
        const { uid } = verifyTokenResult;
        return { isVerified: uid.length > 0, uid };
    } catch (error) {
        return { isVerified: false, uid: undefined };
    }
};

export const Login = async ({ email, password }: AuthModels.AuthLoginParams) => {
    try {
        const signInResult = await signInWithEmailAndPassword(auth, email, password);
        const { token: authToken, expirationTime } = await signInResult.user.getIdTokenResult();
        const { status, user } = await UserService.GetUser(signInResult.user.uid);

        if (status !== Status.Ok || !user) return { status };

        return { status: Status.Ok, user, authToken, tokenExpiration: new Date(expirationTime) };
    } catch (error) {
        return { status: (error as Error).message };
    }
};

export const SendPasswordResetEmail = async ({ email }: AuthModels.SendPasswordResetEmailParams) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return Status.Ok;
    } catch (error) {
        return (error as Error).message;
    }
};
