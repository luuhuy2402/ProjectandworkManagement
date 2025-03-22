import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "~/App.jsx";
import CssBaseline from "@mui/material/CssBaseline";
// import { ThemeProvider } from "@mui/material/styles";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import theme from "~/theme";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <CssVarsProvider theme={theme}>
            <CssBaseline />
            <App />
            <ToastContainer position="bottom-left" theme="dark" />
        </CssVarsProvider>
    </StrictMode>
);
