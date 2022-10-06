import { CssBaseline } from '@mui/material';
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import { PropsWithChildren, useMemo } from 'react';

import { getThemedComponents, getThemeOptions } from '#/theme';

export default function ThemeContext({ children }: PropsWithChildren<{}>) {
    const theme = useMemo(() => {
        const options = getThemeOptions('light');
        const newTheme = createTheme(options);
        const components = getThemedComponents(newTheme);

        return {
            ...newTheme,
            ...components,
        };
    }, []);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
}
