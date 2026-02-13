import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { privateCheck } from "../services/backendServices"
import { Photo } from "../components/Photo"
import { Card } from "../components/Card"

export const Private = () => {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [usuario, setUsuario] = useState("")

    const publications = [
        {
            image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg",
            title: "Un paisaje increible",
            likes: "204 Likes",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et officia debitis voluptatum, ipsa illum explicabo recusandae distinctio optio vitae nostrum quam rerum harum reprehenderit dolores, delectus voluptate exercitationem labore deleniti."
        },
        {
            image: "https://img2.huffingtonpost.es/files/og_thumbnail/uploads/2022/12/21/63a33247bdff7.jpeg",
            title: "Perrito",
            likes: "10M Likes",
            description: "Intentando manipularos emocionalmente con este perrito para que seáis benevolentes conmigo."
        },
        {
            image: "https://preview.redd.it/the-original-sad-cat-image-v0-keatpsrp5fce1.png?width=640&crop=smart&auto=webp&s=cd5c7dadb1c7b5200f551b58c983909398e1bbad",
            title: "Gatito",
            likes: "10M Likes",
            description: "Por si sois más de gatos que de perros."
        }
    ]


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
                <div className="container bg-white p-5">
                    <div className="user-info d-flex justify-content-between align-items-center">
                        <div className="photo-wrapper">
                            <button type="button" className="user-photo img-thumbnail" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <img className="user-photo rounded-circle shadow" src="https://media.tenor.com/znx_AntI870AAAAM/gorilla-middle-finger.gif" alt="" />
                            </button>
                            <p className="mt-1">@{usuario}</p>
                        </div>
                        <div className="user-data d-flex gap-3">
                            <h6>{publications.length} publicaciones</h6>
                            <h6>250 seguidores</h6>
                            <h6>760 seguidos</h6>
                        </div>
                    </div>
                    <div className="publications mt-5">
                        <nav>
                            <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="grid-tab" data-bs-toggle="tab" data-bs-target="#grid-tab-panel"
                                        type="button" role="tab" aria-controls="grid-tab-panel" aria-selected="true"><i
                                            className="fa-solid fa-table-cells"></i></button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="column-tab" data-bs-toggle="tab" data-bs-target="#column-tab-panel"
                                        type="button" role="tab" aria-controls="column-tab-panel" aria-selected="false"><i
                                            className="fa-solid fa-square"></i></button>
                                </li>
                            </ul>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="grid-tab-panel" role="tabpanel" aria-labelledby="grid-tab-panel">
                                <div className="row">
                                    {publications.map((publication, index) => {
                                        return (
                                            <Photo publication={publication} key={index} />
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="tab-pane fade" id="column-tab-panel" role="tabpanel" aria-labelledby="column-tab-panel">
                                {publications.map((publication, index) => {
                                    return (
                                        <Card publication={publication} key={index} />
                                    )
                                })}
                            </div>
                        </div>

                    </div>

                    {/* Modal */}
                    <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Change image</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    ¿Me odias, verdad? ¿Quieres cambiarme, verdad?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            )}
        </>
    )
}