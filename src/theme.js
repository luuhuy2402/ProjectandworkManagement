import { cyan, deepOrange, orange, teal } from "@mui/material/colors";
import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

const theme = extendTheme({
    custom: {
        appBarHeight: "58px",
        boardBarHeight: "60px",
    },
    colorSchemes: {
        light: {
            palette: {
                primary: teal,
                secondary: deepOrange,
            },
        },
        dark: {
            palette: {
                primary: cyan,
                secondary: orange,
            },
        },
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
                    backgroundColor: "#bdc3c7", // Màu đỏ
                },
                "::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: "#00b894", // Màu đỏ đậm khi hover
                },
            },
        },

        MuiButton: {
            styleOverrides: {
                // Name of the slot
                root: { textTransform: "none" },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                // Name of the slot
                root: ({ theme }) => ({
                    color: theme.palette.primary.main,
                    fontSize: "0.875rem",
                }),
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                // Name of the slot
                root: ({ theme }) => {
                    return {
                        color: theme.palette.primary.main,
                        fontSize: "0.875rem",
                        ".MuiOutlinedInput-notchedOutline": {
                            borderColor: theme.palette.primary.light,
                        },
                        "&:hover": {
                            ".MuiOutlinedInput-notchedOutline": {
                                borderColor: theme.palette.primary.main,
                            },
                        },
                        // "& fieldset": {
                        //     borderWidth: "1px !important", //đậm nhạt đường viền
                        // },
                    };
                },
            },
        },
    },
});

export default theme;
