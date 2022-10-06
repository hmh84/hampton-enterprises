import { createTheme, ThemeProvider } from '@mui/material';
import { styled, SxProps } from '@mui/material/styles';
import { Box } from '@mui/system';
import { PropsWithChildren } from 'react';
import { Helmet } from 'react-helmet-async';

import { getThemedComponents, getThemeOptions } from '#/theme';
import { appName } from '#/util/helper';

export interface AppLayoutProps {
    pageTitle: string;
    sx?: SxProps;
}

const AppLayoutRoot = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    width: '100vw',
    minHeight: '100vh',
    background: '#fff',
});

const Main = styled('main')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    flex: 1,
    padding: 5,
});

const theme = createTheme(getThemeOptions('light'));
const components = getThemedComponents(theme);

export default function AppLayout({ children, pageTitle, sx }: PropsWithChildren<AppLayoutProps>) {
    return (
        <ThemeProvider theme={{ ...theme, ...components }}>
            <Helmet>
                <title>
                    {pageTitle} - {appName}
                </title>
            </Helmet>
            <AppLayoutRoot className="app-layout-root">
                <Main className="app-layout-main">
                    <Box className="page-content" sx={{ display: 'flex', flex: 1, ...sx }}>
                        {children}
                    </Box>
                </Main>
            </AppLayoutRoot>
        </ThemeProvider>
    );
}
