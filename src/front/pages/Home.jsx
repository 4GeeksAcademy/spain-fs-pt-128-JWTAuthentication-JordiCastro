import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { login } from "../services/backendServices.js";
import { useNavigate } from "react-router-dom";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const navigate = useNavigate()
	const [user, setUser] = useState({
		email: "",
		password: ""
	})
	const [showPassword, setShowPassword] = useState(false)

	const handleChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!user.email || !user.password) {
			alert("All fields are required")
			return
		}
		login(user, navigate)
	}

	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}

	useEffect(() => {
		loadMessage()
	}, [])

	return (
			<div className="container d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
				<div className="bg-white p-5 rounded-5 text-secondary shadow" style={{ width: "25rem" }}>
					<div className="text-center">
						<div
							className="d-inline-flex justify-content-center align-items-center border border-4 rounded-circle bg-light text-secondary"
							style={{ width: "80px", height: "80px" }}>
							<i className="fa-solid fa-user-check fa-2xl"></i>
						</div>
					</div>
					<h1>Login</h1>
					<h6>Welcome back! Please login.</h6>
					<form onSubmit={handleSubmit} className="mt-3">
						<div className="mb-3">
							<label htmlFor="email" className="form-label">Email</label>
							<div className="input-group">
								<div className="input-group-text">
									<i className="fa-solid fa-user"></i>
								</div>
								<input
									type="text"
									name="email"
									placeholder="Enter your email"
									className="form-control"
									value={user.email}
									onChange={handleChange}
								></input>
							</div>
						</div>
						<div className="mb-3">
							<label htmlFor="password" className="form-label">Password</label>
							<div className="input-group">
								<div className="input-group-text">
									<i className="fa-solid fa-lock"></i>
								</div>
								<input
									type={showPassword ? "text" : "password"}
									name="password"
									placeholder="Enter your password"
									className="form-control"
									value={user.password}
									onChange={handleChange}
								></input>
								<div className="input-group-text">
                                <button type="button" className="btn" onClick={() => setShowPassword(prev => !prev)}>
                                    <i className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
                                </button>
                            </div>
							</div>
						</div>
						<button type="submit" className="btn btn-primary w-100">Login</button>
					</form>
				</div>
			</div>
	)
}