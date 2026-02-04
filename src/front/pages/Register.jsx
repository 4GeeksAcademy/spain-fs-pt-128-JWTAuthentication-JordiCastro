import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { register } from "../services/backendServices"

export const Register = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()

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
        register(user, navigate)
        
    }

    return (
        <div className="container mt-3">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="Enter your email"
                        className="form-control"
                        value={user.email}
                        onChange={handleChange}
                    ></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="text"
                        name="password"
                        placeholder="Enter your password"
                        className="form-control"
                        value={user.password}
                        onChange={handleChange}
                    ></input>
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
        </div>
    )
}