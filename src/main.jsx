import { createRoot } from "react-dom/client";
import App from "~/App.jsx";
import CssBaseline from "@mui/material/CssBaseline";
// import { ThemeProvider } from "@mui/material/styles";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import theme from "~/theme";
import { ToastContainer } from "react-toastify";
import { ConfirmProvider } from "material-ui-confirm";

//Cấu hình redux store
import { Provider } from "react-redux";
import { store } from "~/redux/store";

//Cấu hình react-router-dom với BrowserRouter
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
    <BrowserRouter basename="/">
        <Provider store={store}>
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
        </Provider>
    </BrowserRouter>
);
