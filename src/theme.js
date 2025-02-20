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
            // spacing: (factor) => `${0.25 * factor}rem`, //cuastom spacing
        },
        dark: {
            palette: {
                primary: cyan,
                secondary: orange,
            },
            // spacing: (factor) => `${0.25 * factor}rem`,
        },
    },
    // Mặc định hệ thống theo chế độ "system"
});

export default theme;
