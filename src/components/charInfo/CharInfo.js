import { useEffect, useState } from 'react';

import useMarvelServices from '../../services/MarvelServices';
import setContent from '../../utils/setContent';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import './charInfo.scss';

const CharInfo = () => {
    const [char, setChar] = useState(null);

    const marvelService = useMarvelServices();

    const clickedCharId = useSelector(state => state.selectedChar.selectedChar);
    

    useEffect(() => {
        onCharUpdate(clickedCharId);
        // eslint-disable-next-line
    }, [clickedCharId]);

    const onCharLoaded = (char) => {
        setChar(char);
        marvelService.setProcess('confirmed');
    }

    const onCharUpdate = (id) => {
        if (!id) {
            return;
        }

        marvelService.clearError();

        marvelService
            .getCharacter(id)
            .then(onCharLoaded);
    }


    return (
        <div className="char__info">
            {setContent(marvelService.process, View, char)}
        </div>
    );
}


const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data;
    
    const charComics = comics.map((item, i) => {
        // eslint-disable-next-line
        if (i > 9) return;
        const id = item.resourceURI.slice(item.resourceURI.search(/\b\d/img));

        return <Link to={"/comics/" + id} key={i} className="char__comics-item">{item.name}</Link>;
    });

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} style={thumbnail.search(/image_not_available/igm) >= 0 ? {objectFit: 'contain'} : null} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {charComics}
            </ul>
        </>
    )
}

export default CharInfo;
export {View};