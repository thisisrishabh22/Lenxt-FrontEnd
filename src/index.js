import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContenxtProvider } from "./store/Context/AuthContext";
import { AuthActionsProvider } from "./store/Actions/AuthActions";
import * as serviceWorker from "./serviceWorkerRegistration";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8338EC",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthContenxtProvider>
        <AuthActionsProvider>
          <App />
        </AuthActionsProvider>
      </AuthContenxtProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
