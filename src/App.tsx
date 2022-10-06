import * as Sentry from '@sentry/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './theme/index.css';

import AppRoutes from './AppRoutes';
import AppProviders from './context/AppProviders';
import { isProd } from './util/helper';

if (isProd()) {
    Sentry.init({
        debug: true,
        dsn: import.meta.env.VITE_SENTRY_DSN,
        environment: import.meta.env.NODE_ENV,
        ignoreErrors: ['Non-Error exception captured'],
        denyUrls: [/extensions\//i, /^chrome:\/\//i],
    });
}

const container = document.getElementById('root') as HTMLElement;

createRoot(container).render(
    <StrictMode>
        <AppProviders>
            <AppRoutes />
        </AppProviders>
    </StrictMode>
);
