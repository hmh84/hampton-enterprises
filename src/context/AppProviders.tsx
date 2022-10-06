import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ModalProvider from 'mui-modal-provider';
import { PropsWithChildren } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import AxiosProvider from './AxiosProvider';
import QueryProvider from './QueryProvider';
import SnackbarProvider from './SnackbarProvider';
import ThemeProvider from './ThemeProvider';

export default function AppProviders({ children }: PropsWithChildren<unknown>) {
    return (
        <HelmetProvider>
            <AxiosProvider>
                <ThemeProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <SnackbarProvider>
                            <QueryProvider>
                                <BrowserRouter>
                                    <ModalProvider>{children}</ModalProvider>
                                </BrowserRouter>
                            </QueryProvider>
                        </SnackbarProvider>
                    </LocalizationProvider>
                </ThemeProvider>
            </AxiosProvider>
        </HelmetProvider>
    );
}
