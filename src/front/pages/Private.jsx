import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { privateCheck } from "../services/backendServices"

export const Private = () => {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

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

    const usuario = user?.email?.split("@")[0]

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            setTimeout(() => {
                navigate("/")
            }, 1000)

        } else {
            checkToken()
        }
    }, [])

    return (
        <>
            {loading ? (
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            ) : (
                <div className="container">
                    <h1 className="mt-3">Hola {usuario},</h1>
                    <h5>Aquí encontrarás toda la información privada que nos proporciones.</h5>
                </div>
            )}
        </>
    )
}