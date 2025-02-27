import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

const APP_BAR_HEIGHT = "58px";
const BOARD_BAR_HEIGHT = "60px";
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`;
const COLUMN_HEADER_HEIGHT = "50px";
const COLUMN_FOOTER_HEIGHT = "56px";

const theme = extendTheme({
    custom: {
        appBarHeight: APP_BAR_HEIGHT,
        boardBarHeight: BOARD_BAR_HEIGHT,
        boardContentHeight: BOARD_CONTENT_HEIGHT,
        columnHeaderHeight: COLUMN_HEADER_HEIGHT,
        columnFooterHeight: COLUMN_FOOTER_HEIGHT,
    },
    colorSchemes: {
        light: {},
        dark: {},
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                "*::-webkit-scrollbar": {
                    width: "4px",
                    height: "4px",
                },
                "*::-webkit-scrollbar-thumb": {
                    borderRadius: "6px",
                    backgroundColor: "#dcdde1",
                },
                "*::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: "white",
                },
            },
        },

        MuiButton: {
            styleOverrides: {
                // Name of the slot
                root: {
                    textTransform: "none",
                    borderWidth: "0.5px",
                    "&:hover": { borderWidth: "2px" },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // color: theme.palette.primary.main,
                    fontSize: "0.875rem",
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                // Name of the slot
                root: {
                    "&.MuiTypography-body1": {
                        fontSize: "0.875rem",
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                // Name of the slot
                root: {
                    fontSize: "0.875rem",
                    "& fieldset": {
                        borderWidth: "0.5px !important", //đậm nhạt đường viền
                    },
                    "&:hover fieldset": {
                        borderWidth: "2px !important", //đậm nhạt đường viền
                    },
                    "&:Mui-focused fieldset": {
                        borderWidth: "2px !important", //đậm nhạt đường viền
                    },
                },
            },
        },
    },
});

export default theme;
