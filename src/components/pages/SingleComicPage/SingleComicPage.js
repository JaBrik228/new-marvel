import './singleComicPage.scss';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const SingleComicPage = ({description, pages, title, lang, price, image}) => {
    return (
        <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content={`${title} comics book`}
                    />
                <title>{title}</title>
            </Helmet>
            <img src={image} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pages} pages</p>
                <p className="single-comic__descr">Language: {lang}</p>
                <div className="single-comic__price">{price === 0 ? 'Free' : price + '$'}</div>
            </div>
            <Link to={"/comics"} className="single-comic__back">Back to all</Link>
        </div>
    );
};

SingleComicPage.propTypes = {
    description: PropTypes.string,
    pages: PropTypes.number,
    title: PropTypes.string,
    lang: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string
}

export default SingleComicPage;
