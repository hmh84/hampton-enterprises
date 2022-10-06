import { MultiFactorSettings, UserInfo, UserMetadata } from 'firebase-admin/lib/auth/user-record';

export interface User {
    uid: string;
    displayName: string;
    email: string;
    emailVerified: boolean;
    photoURL?: string;
    phoneNumber?: string;
    _disabled: boolean;
    _metadata: UserMetadata;
    _providerData: UserInfo[];
    _passwordHash?: string;
    _passwordSalt?: string;
    _tenantId?: string | null;
    _tokensValidAfterTime?: string;
    _multiFactor?: MultiFactorSettings;
}

export type UpdateUserParams = Pick<Partial<User>, 'displayName'>;
