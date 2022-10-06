import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { PropsWithChildren, useMemo } from 'react';

import { getErrorMsg } from '#/util/helper';

export default function QueryProvider({ children }: PropsWithChildren<unknown>) {
    const { enqueueSnackbar } = useSnackbar();

    const queryClient = useMemo(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        retry: false,
                        staleTime: 1000 * 60 * 10, // five minutes
                    },
                },
                queryCache: new QueryCache({
                    onError: (error, query) => {
                        const message = getErrorMsg(error);

                        // only show error toasts if we already have data in the cache
                        // which indicates a failed background update
                        if (query.state.data !== undefined) {
                            console.error(message);
                            enqueueSnackbar(message, {
                                variant: 'error',
                            });
                        }
                    },
                }),
            }),
        [enqueueSnackbar]
    );

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
