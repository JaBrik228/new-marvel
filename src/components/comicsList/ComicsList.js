import './comicsList.scss';

import { useState, useEffect, useCallback } from 'react';
import ComicsListItem from '../comicsListItem/ComicsListItem';
import useMarvelServices from '../../services/MarvelServices';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { Transition, TransitionGroup } from 'react-transition-group';

import { useSelector, useDispatch, useStore } from 'react-redux';
import {setScroll, setComics, setComicOffset} from '../../utils/actions';

const setContent = (process, newComicsLoadingByBtn) => {
    switch (process) {
        case 'loading':
            return !newComicsLoadingByBtn ? <Spinner /> : null;
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

const ComicsList = () => {
    const [newComicsLoadingByBtn, setNewComicsLoadingByBtn] = useState(false);

    const comics = useSelector(state => state.comics),
          offset = useSelector(state => state.offset);
    
    const store = useStore();
    const dispatch = useDispatch();

    const marvelService = useMarvelServices();

    const handleScroll = useCallback(() => {
        const position = window.pageYOffset;
        if (position === 0) {
            return;
        }
        dispatch(setScroll(position));
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (comics.length === 0) {
            updateComics(offset, true);
        } else {
            marvelService.setProcess('confirmed');
        }

        window.scrollTo({
            top: store.getState().scrollPos,
            behavior: "smooth",
        });

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll)
        };
        // eslint-disable-next-line
    }, []);

    const placeComics = (comics) => {
        dispatch(setComics(comics));
        setNewComicsLoadingByBtn(false);
        setNewOffset();
    }

    const setNewOffset = () => {
        dispatch(setComicOffset(8));
    }

    const updateComics = (offset, initial) => {
        marvelService.clearError();
        initial ? setNewComicsLoadingByBtn(false) : setNewComicsLoadingByBtn(true);
        marvelService
            .getAllComics(offset)
            .then(placeComics)
            .then(() => marvelService.setProcess('confirmed'));
    }

    const items = comics.map(({id, ...values}, i) => {
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
                key={i} >
                    {state => <ComicsListItem 
                                        id={id} 
                                        {...values} 
                                        styles={{...defaultStyle, ...transitionStyles[state]}} />}
            </Transition>
        )
    });



    return (
        <div className="comics__list">
            {setContent(marvelService.process, newComicsLoadingByBtn)}
            <ul className="comics__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
            <button disabled={newComicsLoadingByBtn} onClick={() => updateComics(offset, false)} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;