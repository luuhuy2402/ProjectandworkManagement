import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

const theme = extendTheme({
    custom: {
        appBarHeight: "58px",
        boardBarHeight: "60px",
    },
    colorSchemes: {
        light: {},
        dark: {},
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                "::-webkit-scrollbar": {
                    width: "4px",
                    height: "4px",
                },
                "::-webkit-scrollbar-thumb": {
                    borderRadius: "6px",
                    backgroundColor: "#dcdde1",
                },
                "::-webkit-scrollbar-thumb:hover": {
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
