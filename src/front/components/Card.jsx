export const Card = ({ publication }) => {
    return (
        <div className="card mx-auto my-3" style={{width: "30rem"}}>
            <div
                className="card-header bg-transparent border-light d-flex justify-content-between align-items-center p-2">
                <h5 className="my-0">{publication.title}</h5>
                <p className="my-0">20/12</p>
            </div>
            <img src={publication.image}
                alt="Card image cap"/>
                <div className="card-body">
                    <p className="card-text fw-bold border-bottom border-light mb-1">
                        {publication.likes}
                    </p>
                    <p className="card-text">
                        {publication.description}
                    </p>
                </div>
        </div>
    )
}