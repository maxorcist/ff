import CardMovie from "../CardMovie/CardMovie";

const ListMovie = ({ items = [] }) => {
    return (
        <div>
            {items.length && items.map((item, i) => (
                <CardMovie {...item} key={i} />
            ))}
        </div>
    )
};

export default ListMovie;