const Card = ({ thumbnail }) => {
    return (
        <div>
            <img className="card" src={thumbnail.url} alt={thumbnail.title} />
        </div>
    )
}

export default Card