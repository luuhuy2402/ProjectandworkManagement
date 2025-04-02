import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "~/App.jsx";
import CssBaseline from "@mui/material/CssBaseline";
// import { ThemeProvider } from "@mui/material/styles";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import theme from "~/theme";
import { ToastContainer } from "react-toastify";
import { ConfirmProvider } from "material-ui-confirm";
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <CssVarsProvider theme={theme}>
            <ConfirmProvider
                defaultOptions={{
                    allowClose: false,
                    dialogProps: { maxWidth: "xs" },
                    confirmationButtonProps: { color: "secondary" },
                    cancellationButtonProps: { color: "inherit" },
                }}
            >
                <CssBaseline />
                <App />
                <ToastContainer position="bottom-left" theme="dark" />
            </ConfirmProvider>
        </CssVarsProvider>
    </StrictMode>
);
