import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { privateCheck } from "../services/backendServices"

export const Private = () => {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [usuario, setUsuario] = useState("")


    const checkToken = async () => {
        const response = await privateCheck()
        console.log(response);
        if (response) {
            setUser(response)
            setLoading(false)

        }
        else {
            localStorage.removeItem("token")
            navigate("/")
        }
    }


    useEffect(() => {
        if (!localStorage.getItem("token")) {
            setTimeout(() => {
                navigate("/")
            }, 1000)

        } else {
            checkToken()
        }
    }, [])
    useEffect(() => {
        if (user?.email) {
            setUsuario(user.email.split("@")[0]);
        }
    }, [user])

    return (
        <>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="container bg-white my-5 rounded" style={{ height: "70vh" }}>
                    <h1 className="mt-3">Hello {usuario}!</h1>
                    <h5 className="mt-2">Here you will find all the private information you provide to us.</h5>
                    <div className="d-flex mt-5 justify-content-center gap-5 border p-5">
                        <div className="photo">
                            <img className="rounded-circle w-100 h-75" src="https://media.tenor.com/znx_AntI870AAAAM/gorilla-middle-finger.gif" alt="" />
                        </div>
                        <div className="inputs">
                            <label htmlFor="User" className="form-label">User Name:</label>
                            <input
                                type="text"
                                name="Username"
                                placeholder={usuario}
                                className="form-control"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                            ></input>

                            <label htmlFor="User" className="form-label mt-5">Name</label>
                            <input
                                type="text"
                                name="Username"
                                placeholder="Please, write your name"
                                className="form-control"
                            ></input>

                        </div>
                    </div>
                </div>
            )}
        </>
    )
}