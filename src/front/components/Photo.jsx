export const Photo = ({ publication }) => {
    return (
        <div className="col-lg-4 col-md-6 p-2">
            <div className="ratio ratio-1x1">
                <img className="w-100 h-100 object-fit-cover"
                    src={publication.image}
                    alt=""/>
            </div>
        </div>
    )
}