import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from './context/AuthProvider';

function HomePage() {
	const [todos, setTodos] = useState([]);
	const [todoTitle, setTodoTitle] = useState('');
	const [todoDesc, setTodoDesc] = useState('');
	const {logout} = useAuth();
	const navigate = useNavigate();
	const API_BASE_URL = 'http://localhost:3000';

	useEffect(() => {
		fetchTodos();
	}, []);

	const fetchTodos = async () => {
		const token = localStorage.getItem('token');
		try {
			const response = await fetch(`${API_BASE_URL}/todos`, {
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${token}`,
				},
			});
			if (response.ok) {
				const data = await response.json();
				setTodos(data);
			} else {
				// Handle error or token expiration
				logout();
				navigate('/');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const addTodo = async () => {
		const token = localStorage.getItem('token');

		try {
			const response = await fetch(`${API_BASE_URL}/todos`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
				body: JSON.stringify({
					title: todoTitle,
					description: todoDesc
				}),
			});
			if (response.ok) {
				await fetchTodos();
				setTodoTitle('');
				setTodoDesc('');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const deleteTodo = async (todoId) => {
		const token = localStorage.getItem('token');
		try {
			const response = await fetch(`${API_BASE_URL}/todos/${todoId}`, {
				method: 'DELETE',
				headers: {
					'Authorization': `Bearer ${token}`,
				},
			});
			if (response.ok) {
				fetchTodos(); // Refresh the list
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<h2>Todo List</h2>
			<ul>
				{todos.map(todo => (
					<li key={todo.id}>
						{todo.title} - {todo.description}
						<button onClick={() => deleteTodo(todo.id)}>Delete</button>
					</li>
				))}
			</ul>
			<input
				type="text"
				value={todoTitle}
				onChange={(e) => setTodoTitle(e.target.value)}
			/>
			<input
				type="text"
				value={todoDesc}
				onChange={(e) => setTodoDesc(e.target.value)}
			/>
			<button onClick={addTodo} disabled={!todoTitle.trim()}>Add Todo</button><br/><br/><br/><br/><br/><br/>
			<button onClick={() => {
				logout();
				navigate('/');
			}}>Logout
			</button>
		</div>
	);
}

export default HomePage;
