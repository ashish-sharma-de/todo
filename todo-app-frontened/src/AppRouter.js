import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage";
import HomePage from "./HomePage";
import AuthProvider from "./context/AuthProvider";

function AppRouter() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="/register" element={<RegistrationPage />} />
					<Route path="/home" element={<HomePage />} />
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default AppRouter;
