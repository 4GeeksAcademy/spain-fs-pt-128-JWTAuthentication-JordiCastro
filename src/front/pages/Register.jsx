import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { register } from "../services/backendServices"

export const Register = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [showPassword, setShowPassword] = useState(false)

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
        <div className="container d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
            <div className="bg-white p-5 rounded-5 text-secondary shadow" style={{ width: "25rem" }}>
                <div className="text-center">
                    <div
                        className="d-inline-flex justify-content-center align-items-center border border-4 rounded-circle bg-light text-secondary"
                        style={{ width: "80px", height: "80px" }}>
                        <i className="fa-solid fa-user-plus fa-2xl"></i>
                    </div>
                </div>
                <h1>Register</h1>
                <h6>Create your account.</h6>
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
                                required
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
                                required
                            ></input>
                            <div className="input-group-text">
                                <button type="button" className="btn" onClick={() => setShowPassword(prev => !prev)}>
                                    <i className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success w-100">Register</button>
                </form>
            </div>
        </div>
    )
}