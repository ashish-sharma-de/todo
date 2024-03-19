import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const API_BASE_URL = 'http://localhost:3000';

	const login = async (email, password) => {
		try {
			const response = await fetch(`${API_BASE_URL}/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});

			const data = await response.json();
			if (response.ok) {
				setUser({ email });
				localStorage.setItem('token', data.access_token); // Store the token
			} else {
				throw new Error(data.message || "An error occurred");
			}
		} catch (error) {
			console.error(error.message);
		}
	};

	const logout = () => {
		setUser(null);
	};

	const register = (email, password) => {
		setUser({ email });
	};

	const value = { user, login, logout, register };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
