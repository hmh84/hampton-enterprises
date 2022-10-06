import fbAdmin from 'firebase-admin';

import * as UserModels from '../models/User';
import { Status } from '../controllers';

export const GetUser = async (uid: UserModels.User['uid']) => {
    try {
        const userRec = await fbAdmin.auth().getUser(uid);

        const enCapUser: UserModels.User = {
            uid: userRec.uid,
            displayName: userRec.displayName ?? '',
            email: userRec.email ?? '',
            emailVerified: userRec.emailVerified,
            photoURL: userRec.photoURL,
            phoneNumber: userRec.phoneNumber,
            _disabled: userRec.disabled,
            _metadata: userRec.metadata,
            _providerData: userRec.providerData,
            _passwordHash: userRec.passwordHash,
            _passwordSalt: userRec.passwordSalt,
            _tenantId: userRec.tenantId,
            _tokensValidAfterTime: userRec.tokensValidAfterTime,
            _multiFactor: userRec.multiFactor,
        };

        return { status: Status.Ok, user: enCapUser };
    } catch (error) {
        return { status: (error as Error).message };
    }
};

export const UpdateUser = async (uid: UserModels.User['uid'], paramsToUpdate: UserModels.UpdateUserParams) => {
    try {
        const { status, user } = await GetUser(uid);

        if (status !== Status.Ok || !user) return status;

        await fbAdmin.auth().updateUser(uid, paramsToUpdate);
        return Status.Ok;
    } catch (error) {
        return (error as Error).message;
    }
};
