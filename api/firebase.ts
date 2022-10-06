import * as dotenv from 'dotenv';
import admin, { ServiceAccount } from 'firebase-admin';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const { env } = process;

dotenv.config();

// Additional SDKs for Firebase products
// https://firebase.google.com/docs/web/setup#available-libraries
const appConfig = {
    apiKey: env.FIREBASE_API_KEY,
    appId: env.FIREBASE_APP_ID,
    authDomain: env.FIREBASE_AUTH_DOMAIN,
    projectId: env.FIREBASE_PROJECT_ID,
    storageBucket: env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
};

const sdkKey = {
    projectId: env.FIREBASE_SDK_PROJECT_ID,
    clientEmail: env.FIREBASE_SDK_CLIENT_EMAIL,
    privateKey: (env.FIREBASE_SDK_PRIVATE_KEY as string).replace(/\\n/g, '\n'),
} as ServiceAccount;

export const fbApp = initializeApp(appConfig);
admin.initializeApp({ credential: admin.credential.cert(sdkKey) });
console.log('Initialized Firebase');
export const auth = getAuth(fbApp);
export const db = getFirestore(fbApp);
