import useHttp from "../hooks/http.hook";

const useMarvelServices = () => {
    const {request, clearError, process, setProcess} = useHttp();

    const _baseOffset = 210;
    const _url = 'https://gateway.marvel.com:443/v1/public/';
    const _apikey = 'apikey=35166a87a8ad51d165e5d3a5c385e997';

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_url}characters?orderBy=-name&limit=9&offset=${offset}&${_apikey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_url}characters/${id}?${_apikey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_url}characters?name=${name}&limit=1&${_apikey}`);
        if (res.data.results.length === 0) {
            return null;
        }
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        const {name, description, thumbnail, urls, id, comics} = char;

        return {
            name,
            description: description.length === 0 ? 'Description not found' : description,
            thumbnail: thumbnail.path + '.' + thumbnail.extension,
            homepage: urls[0].url,
            wiki: urls[1].url,
            id,
            comics: comics.items.length === 0 ? [{name: 'Comics not found', resourceURI: ''}] : comics.items
        }
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_url}comics?limit=8&offset=${offset}&${_apikey}`)
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_url}comics/${id}?${_apikey}`);
        return _transformComics(res.data.results[0]);
    }

    const _transformComics = (comics) => {
        const {id, title, thumbnail, prices, description, pageCount, textObjects} = comics;

        return {
            id,
            title,
            image: thumbnail.path + '.' + thumbnail.extension,
            price: prices[0].price,
            description: description ? description : 'Description not found',
            pages: pageCount,
            lang: textObjects[0] ? textObjects[0].language : 'en-us'
        }
    }

    return {
        getComic, 
        getAllComics, 
        getAllCharacters, 
        getCharacter, 
        getCharacterByName, 
        clearError, 
        process,
        setProcess
    };
}

export default useMarvelServices;