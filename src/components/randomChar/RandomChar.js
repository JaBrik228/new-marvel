import useMarvelServices from '../../services/MarvelServices';
import { useEffect, useState } from 'react';
import setContent from '../../utils/setContent';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {
    const [char, setChar] = useState(null);


    const marvelService = useMarvelServices();

    useEffect(() => {
        updateChar();
    }, []);

    const getRandomIntInclusive = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
    }
      
    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        marvelService.clearError();
        const id = getRandomIntInclusive(1011000, 1011400);
        marvelService
            .getCharacter(id)
            .then(onCharLoaded)
            .then(() => marvelService.setProcess('confirmed'));
    }

    return (
        <div className="randomchar">
            {setContent(marvelService.process, View, char)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    );
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki} = data;

    return (
        <div className="randomchar__block">
            <img src={thumbnail} style={thumbnail.search(/image_not_available/igm) >= 0 ? {objectFit: 'contain'} : null} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description && description.length >= 208 ? description.slice(0, 203) + '...' : description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;