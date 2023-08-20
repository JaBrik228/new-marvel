import CharListItem from '../charListItem/CharListItem';
import { useState, useEffect, useCallback, useRef } from "react";
import useMarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import PropTypes from 'prop-types';
import { TransitionGroup, Transition } from 'react-transition-group';

import './charList.scss';

const setContent = (process, firstLoading) => {
    switch (process) {
        case 'loading':
            return firstLoading ? <Spinner /> : null;
        case 'error':
            return <ErrorMessage />;
        case 'waiting':
            return <Spinner />;
        case 'confirmed':
            return null;
        default:
            throw new Error('Unexpected process state')
    }
}

const CharList = (props) => {

    const [char, setChar] = useState([]);
    const [newCharLoading, setCharLoading] = useState(false);
    const [allCharsLoaded, setCharsLoaded] = useState(false);
    const [offset, setOffset] = useState(210);
    const [firstLoading, setFirstLoading] = useState(true);
    
    const marvelService = useMarvelServices();

    const updateChars = (newChar) => {
        setChar(char => {
            return [...char, ...newChar]
        });
        setCharLoading(false);
        setFirstLoading(false);
        setCharsLoaded(newChar.length === 0 ? true : false);
        charsUpdated();
    }

    const scrollEventAdded = useRef(false); 

    const charsUpdated = () => {
        if (!scrollEventAdded.current) {
            window.addEventListener('scroll', onScroll);
            scrollEventAdded.current = true;
        }
    }

    const loadNextPage = () => {
        setOffset(offset1 => {
            return offset1 + 9;
        });
    }

    const loadChars = async (offset) => {
        firstLoading ? setCharLoading(false) : setCharLoading(true);
        await marvelService
            .getAllCharacters(offset)
            .then(updateChars)
            .then(() => marvelService.setProcess('confirmed'));
    }

    const onScroll = useCallback(() => {
        if (document.documentElement.scrollHeight === document.documentElement.scrollTop + document.documentElement.clientHeight) {
            loadNextPage();
        }
    }, [])

    useEffect(() => {
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, []);

    useEffect(() => {
        loadChars(offset);
    }, [offset]);    
    

    const {onClickChar, selectedCharId} = props;
    
    const charItems = char.map((item) => {
        const duration = 500;

        const defaultStyle = {
            transition: `opacity ${duration}ms ease-in-out`,
            opacity: 0,
        }

        const transitionStyles = {
            entering: { opacity: 1 },
            entered:  { opacity: 1 },
            exiting:  { opacity: 0 },
            exited:  { opacity: 0 },
        };

        return (
            <Transition
                timeout={duration}
                mountOnEnter
                unmountOnExit
                key={item.id} >
                {state => {
                    return <CharListItem 
                                selectedCharId={selectedCharId} 
                                id={item.id} 
                                name={item.name}
                                img={item.thumbnail} 
                                // key={item.id} 
                                styles={{...defaultStyle, ...transitionStyles[state]}}
                                onClickChar={() => onClickChar(item.id)} />
                }}
            </Transition>
        );
    });

    return (
        <div className="char__list">
            {setContent(marvelService.process, firstLoading)}
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {charItems}
                </TransitionGroup>
            </ul>
            <button disabled={newCharLoading} style={allCharsLoaded ? {display: 'none'} : null} onClick={() => loadNextPage()} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    );
}

CharList.propTypes = {
    onClickChar: PropTypes.func,
    selectedCharId: PropTypes.number
}

export default CharList;