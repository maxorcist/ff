import "./CardMovie.css"

const CardMovie = ({title, popularity}) => {

    return (
        <div className="CardMovie">
            <span className="CardMovie__Title">{title}</span>
            <span className="CardMovie__Rating">{popularity}</span>
        </div>
    )
}

export default CardMovie;