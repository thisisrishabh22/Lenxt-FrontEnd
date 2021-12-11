import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./pages/404";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AppRouter from "./routes/AppRouter";
import { AuthActionsProvider } from "./store/Actions/AuthActions";
import { AuthContenxtProvider } from "./store/Context/AuthContext";

const App = () => {
  return (
    <AuthContenxtProvider>
      <AuthActionsProvider>
        <AppRouter />
      </AuthActionsProvider>
    </AuthContenxtProvider>
  );
};

export default App;
