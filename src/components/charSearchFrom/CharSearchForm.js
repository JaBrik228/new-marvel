import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { Link } from 'react-router-dom';
// import setContent from '../../utils/setContent';

import useMarvelServices from '../../services/MarvelServices';

import './charSearchForm.scss';

const setContent = (process, Component, ErrorComponent) => {
    switch (process) {
        case 'loading':
            return null;
        case 'error':
            return <ErrorComponent />;
        case 'waiting':
            return null;
        case 'confirmed':
            return <Component/>;
        default:
            throw new Error('Unexpected process state')
    }
}

const CharSearchForm = () => {

    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);

    const {getCharacterByName, clearError, process, setProcess} = useMarvelServices();

    const getChar = (name) => {
        clearError();
        setLoading(true);
        getCharacterByName(name)
            .then(onGettingChar)
            .then(() => setProcess('confirmed'));
    } 

    const onGettingChar = (char) => {
        setLoading(false);
        setChar({...char});
    }


    const errorMessage = <div className='char__search-critical-error'><ErrorMessage /></div>; 
    const success = !char ? null : Object.keys(char).length > 0 ?
                                                        <div className="char__search-wrapper">
                                                            <div className="char__search-success">There is! Visit {char.name} page?</div>
                                                            <Link to={`/character/${char.id}`} className="button button__secondary">
                                                                <div className="inner">To page</div>
                                                            </Link>
                                                        </div> : 
                                                        <div className="char__search-error">
                                                            The character was not found. Check the name and try again
                                                        </div>;


    return (
        <div className="char__search-form">
            <Formik
                initialValues = {{
                    charName: ''
                }}
                validationSchema = {Yup.object({
                    charName: Yup.string().required('This field is required')
                })}
                onSubmit={({charName}) => getChar(charName)}
            >
                <Form>
                    <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <Field 
                            id="charName" 
                            name='charName' 
                            type='text' 
                            placeholder="Enter name"/>
                        <button 
                            type='submit' 
                            className="button button__main"
                            disabled={loading}
                            >
                            <div className="inner">find</div>
                        </button>
                    </div>
                    <FormikErrorMessage component="div" className="char__search-error" name="charName" />
                </Form>
            </Formik>
            {setContent(process, () => success, () => errorMessage)}
        </div>
    )
}

export default CharSearchForm;