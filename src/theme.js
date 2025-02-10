import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

const theme = extendTheme({
    custom: {
        appBarHeight: "48px",
        boardBarHeight: "58px",
    },
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: "#66cfbb",
                },
            },
            // spacing: (factor) => `${0.25 * factor}rem`, //cuastom spacing
        },
        dark: {
            palette: {
                primary: {
                    main: "#fff",
                },
            },
            // spacing: (factor) => `${0.25 * factor}rem`,
        },
    },
    // Mặc định hệ thống theo chế độ "system"
});

export default theme;
