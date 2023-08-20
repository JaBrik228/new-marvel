import './singleCharPage.scss';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';


const SingleCharPage = ({description, name, thumbnail}) => {
    return (
        <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content={`${name} Character`}
                    />
                <title>{name}</title>
            </Helmet>
            <img src={thumbnail} alt={name} className="single-comic__char-img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
            <Link to={"/"} className="single-comic__back">Back to all</Link>
        </div>
    );
};


SingleCharPage.propTypes = {
    description: PropTypes.string,
    name: PropTypes.string,
    thumbnail: PropTypes.string,
}

export default SingleCharPage;