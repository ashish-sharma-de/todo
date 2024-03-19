import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";

function RegistrationPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const apiHost = 'http://localhost:3000';

	const handleSubmit = (e) => {
		e.preventDefault();
		registerUser();

	};

	const registerUser = async () => {
		const token = localStorage.getItem('token');
		try {
			const response = await fetch(`${apiHost}/user/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
				body: JSON.stringify({ email: email,
					password: password }),
			});
			if (response.ok) {
				navigate("/");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Email:</label>
					<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
				</div>
				<div>
					<label>Password:</label>
					<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				</div>
				<button type="submit">register</button><br/>
			</form>
		</div>
	);
}

export default RegistrationPage;
