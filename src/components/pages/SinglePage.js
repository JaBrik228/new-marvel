import useMarvelServices from '../../services/MarvelServices';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import setContent from '../../utils/setContent';

const SinglePage = ({comic, render}) => {
    const [data, setData] = useState({});
    const {dataId} = useParams();

    const marvelServices = useMarvelServices();

    useEffect(() => {
        updatePage();
    }, [dataId]);

    const updateData = (data) => {
        setData(data);
    }

    const getData = (method) => {
        marvelServices[method](dataId)
                .then(updateData)
                .then(() => marvelServices.setProcess('confirmed'));
    }

    const updatePage = () => {
        marvelServices.clearError();
        if(comic) {
            getData('getComic');
        } else {
            getData('getCharacter');
        }
    }


    const {...values} = data;

    return (
        <>
            {setContent(marvelServices.process, () => render({...values}))}
        </>
    )
}



export default SinglePage;