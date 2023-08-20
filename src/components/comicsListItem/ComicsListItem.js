import { Link } from 'react-router-dom';

const ComicsListItem = ({title, image, price, id, styles, scrollDispatch}) => {
    return (
        <li className="comics__item" style={styles}>
            <Link to={`./${id}`}>
                <img src={image} alt={title} className="comics__item-img"/>
                <div className="comics__item-name">{title}</div>
                <div className="comics__item-price">{price === 0 ? 'Free' : price + '$'}</div>
            </Link>
        </li>
    );
}
export default ComicsListItem;