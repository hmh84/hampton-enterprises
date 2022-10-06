// used the mui.com website code for building out this theme logic, can reference it for additional changes (they do a lot in there)
// https://github.com/mui-org/material-ui/blob/master/docs/src/modules/brandingTheme.ts

import { ThemeOptions, Theme } from '@mui/material/styles';

declare module '@mui/material/styles/createPalette' {
    interface Palette {
        sidebar: PaletteColor;
        attendance: AttendancePaletteColor;
        ctaButton: CtaButtonColor;
        border: BorderColor;
        link: LinkColor;
        card: CardColor;
    }
    interface PaletteOptions {
        sidebar?: PaletteColorOptions;
        attendance?: AttendancePaletteColorOptions;
        ctaButton?: CtaButtonColorOptions;
        border?: BorderColorOptions;
        link?: LinkColorOptions;
        card?: CardColorOptions;
    }
    interface AttendancePaletteColor {
        absent: string;
        tardy: string;
        present: string;
    }
    interface AttendancePaletteColorOptions {
        absent?: string;
        tardy?: string;
        present?: string;
    }
    interface CtaButtonColor {
        main: string;
        hover: string;
    }
    interface CtaButtonColorOptions {
        main?: string;
        hover?: string;
    }
    interface BorderColor {
        main: string;
    }
    interface BorderColorOptions {
        main?: string;
    }

    interface LinkColor {
        main: string;
        hover: string;
    }
    interface LinkColorOptions {
        main?: string;
        hover?: string;
    }
    interface CardColor {
        main: string;
    }
    interface CardColorOptions {
        main?: string;
    }
}

declare module '@mui/material/styles/createTypography' {}

declare module '@mui/material/Typography/Typography' {
    // Define new typography variants here
    interface TypographyPropsVariantOverrides {
        emptytext: true;
        headersmcap: true;
        headermain: true;
        subtext: true;
    }
}

/* The following colors need to meet WCAG 2.1 AA color contrast standards wherever they are used. Any changes need to be
re-tested for contrast issues. We are targeting WCAG 3 APCA (Lc75) standards which are more accurate because
they are based on human visual perception rather than math. See:
https://github.com/Myndex/SAPC-APCA/blob/master/documentation/WhyAPCA.md#why-the-new-contrast-method-apca
https://cliambrown.com/contrast/ , https://www.myndex.com/BPCA/
 */
export const getThemeOptions = (mode: 'light' | 'dark') =>
    ({
        palette: {
            ...(mode === 'light' && {
                mode,
                text: {
                    primary: '#000',
                    secondary: '#757575',
                    disabled: 'rgba(0, 0, 0, 0.4)',
                    //hint: 'rgba(0, 0, 0, 0.38)',
                },
                background: {
                    default: '#fff',
                    paper: '#fff',
                },
                primary: {
                    main: '#363c47',
                },
                secondary: {
                    main: '#3F72CF',
                },
                error: {
                    main: '#c1191e',
                    contrastText: '#fff',
                },
                warning: {
                    main: '#946000',
                    contrastText: '#fff',
                },
                info: {
                    main: '#027ec2',
                    contrastText: '#fff',
                },
                success: {
                    main: '#458257',
                    contrastText: '#fff',
                },
                documents: {
                    okResponse: '#5db575',
                    warningReponse: '#ff6c71',
                },
                attendance: {
                    present: '#d6f6d0',
                    tardy: '#fff7c8',
                    absent: '#ffc8c8',
                },
                ctaButton: {
                    main: '#226fe1',
                    hover: '#164ea1',
                },
                border: {
                    main: 'rgba(0, 0, 0, 0.12);',
                },
                link: {
                    main: '#3F72CF',
                },
                card: {
                    main: '#ffffff',
                },
            }),
            ...(mode === 'dark' && {
                mode,
                text: {
                    primary: '#fff',
                    secondary: '#b9b9b9',
                    disabled: 'rgba(255, 255, 255, 0.4)',
                    //hint: 'rgba(0, 0, 0, 0.38)',
                },
                background: {
                    default: '#2F3336' /* #2b2b2b */,
                    paper: '#2F3336',
                },
                primary: {
                    main: '#fff',
                },
                secondary: {
                    main: '#3F72CF',
                },
                error: {
                    main: '#ff5d62',
                    contrastText: '#fff',
                },
                warning: {
                    main: '#F4B721',
                    contrastText: '#fff',
                },
                info: {
                    main: '#027ec2',
                    contrastText: '#fff',
                },
                success: {
                    main: '#5db575',
                    contrastText: '#fff',
                },
                attendance: {
                    present: '#5db575',
                    tardy: '#F4B721',
                    absent: '#d8666a',
                },
                ctaButton: {
                    main: '#226fe1',
                    hover: '#164ea1',
                },
                border: {
                    main: 'rgba(255, 255, 255, 0.12);',
                },
                link: {
                    main: '#a1bae7',
                },
                card: {
                    main: '#474D52',
                },
            }),
        },

        spacing: 10,
        typography: {
            fontFamily: 'Open Sans, Helvetica, Arial, sans-serif',
        },
    } as ThemeOptions);

export const getThemedComponents = (theme: Theme) => ({
    components: {
        MuiButtonBase: {
            defaultProps: {
                disableTouchRipple: true,
            },
        },

        MuiButton: {
            defaultProps: {
                size: 'small',
            },

            styleOverrides: {
                outlined: {
                    borderColor: theme.palette.border.main,
                    color: theme.palette.text.primary,
                    '&.MuiButton-text': {
                        color: theme.palette.link.main,
                    },
                    '&:hover': {
                        borderColor: theme.palette.text.primary,
                    },
                },
                root: {},
                textPrimary: {
                    color: theme.palette.link.main,
                    '&:hover': {
                        backgroundColor: theme.palette.mode === 'light' ? '#555e6f14' : '#c6d8fb14',
                    },
                },
                containedPrimary: {
                    '&:hover': {
                        backgroundColor: theme.palette.mode === 'light' ? 'theme.palette.primary' : '#606060',
                    },
                },
                containedSecondary: {
                    '&:hover': {
                        backgroundColor: theme.palette.ctaButton.hover,
                    },
                },
            },
        },
        MuiLoadingButton: {
            defaultProps: {
                loadingPosition: 'center',
            },
        },
        MuiButtonGroup: {
            styleOverrides: {
                grouped: {
                    '&:hover': {
                        borderColor: theme.palette.text.primary,
                    },
                },
            },
        },
        MuiToggleButtonGroup: {
            defaultProps: {
                size: 'small',
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    '& .MuiSvgIcon-root': {
                        color: theme.palette.link.main,
                    },
                },
            },
        },
        MuiInputBase: {
            defaultProps: {
                size: 'small',
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    // fix for placeholder/labels sitting too low in fields for some reason
                    top: '-7px',
                },
                shrink: {
                    // reset when label shrinks to top position
                    top: '0',
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    padding: 10,
                    background: theme.palette.background.paper,
                },
            },
        },
        MuiTable: {
            styleOverrides: {
                root: {
                    caption: {
                        captionSide: 'top',
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        color: theme.palette.text.primary,
                        padding: '15px',
                    },
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&.MuiTableRow-head': {
                        backgroundColor: theme.palette.background.default,
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    fontWeight: '600',
                },
                root: {
                    backgroundColor: 'inherit',
                },
            },
        },
        MuiSwitch: {
            defaultProps: {
                color: 'success',
            },
            styleOverrides: {
                thumb: {
                    boxShadow:
                        theme.palette.mode === 'light'
                            ? '1px 1px 2px 1px rgba(0,0,0,0.39);'
                            : '0px 0px 2px 1px rgba(255,255,255,0.39);',
                    backgroundColor: theme.palette.mode === 'light' ? '#fff' : theme.palette.background.default,
                    width: '10px',
                    height: '10px',
                },
                switchBase: {
                    padding: '14px',
                },
                track: {
                    opacity: `1!important`,
                    backgroundColor: '#b9b9b9',
                },
            },
        },

        MuiCheckbox: {
            defaultProps: {
                color: 'link',
            },
        },
        MuiRadio: {
            defaultProps: {
                color: 'link',
            },
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    '& .MuiTabs-indicator': {
                        backgroundColor: theme.palette.link.main + '!important', // !important necessary to target new tabs -tv
                    },
                },
            },
        },

        MuiTab: {
            styleOverrides: {
                root: {
                    color: theme.palette.text.primary,
                    '&.Mui-selected': {
                        color: theme.palette.text.primary,
                    },
                    padding: '5px',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'row',
                },
            },
        },
        MuiLink: {
            defaultProps: {
                underline: 'always',
                color: theme.palette.link.main,
            },
            styleOverrides: {
                root: {
                    textDecorationColor: theme.palette.link.main,
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    '&.MuiDivider-root': {
                        borderColor: theme.palette.border.main,
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    '&.MuiDrawer-paper': {
                        borderColor: theme.palette.border.main,
                    },
                },
            },
        },
        MuiAlert: {
            /* hardcoding colors so they keep the light colors in dark mode. This is the only way to retain an
            accessible yellow (warning color), which otherwise turns brown. */
            styleOverrides: {
                root: {
                    '&.MuiAlert-standardInfo': {
                        backgroundColor: '#e5f6fd',
                        color: '#014361',
                    },
                    '&.MuiAlert-standardWarning': {
                        backgroundColor: '#fff4e5',
                        color: '#663c00',
                    },
                    '&.MuiAlert-standardError': {
                        backgroundColor: '#fdeded',
                        color: '#5f2120',
                    },
                    '&.MuiAlert-standardSuccess': {
                        backgroundColor: '#edf7ed',
                        color: '#1e4620',
                    },
                },
            },
        },
        MuiBadge: {
            defaultProps: {
                color: 'error',
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    color: theme.palette.text.primary,
                },
            },
        },

        MuiTypography: {
            // new variants must be declared above in the module override first
            variants: [
                {
                    props: { variant: 'emptytext' },
                    style: {
                        color: '#8c8c8c',
                        fontSize: '1 rem',
                        fontWeight: 600,
                        height: 50,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                },
                {
                    props: { variant: 'headersmcap' },
                    style: {
                        color: theme.palette.text.primary,
                        fontSize: '.875rem',
                        textTransform: 'uppercase',
                        marginTop: 0,
                        marginBottom: 0,
                    },
                },
                {
                    props: { variant: 'subtext' },
                    style: {
                        opacity: 0.6,
                        fontSize: '.875rem',
                        marginTop: 0,
                        marginBottom: 0,
                    },
                },
                {
                    props: { variant: 'headermain' },
                    style: {
                        fontSize: 18,
                        marginBottom: theme.spacing(),
                    },
                },
            ],
        },
    },
});
