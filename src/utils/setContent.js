import Skeleton from '../components/skeleton/Skeleton';
import Spinner from '../components/spinner/Spinner';
import ErrorMessage from '../components/errorMessage/ErrorMessage';

const setContent = (process, Component, data) => {
    switch (process) {
        case 'loading':
            return <Spinner />;
        case 'error':
            return <ErrorMessage />;
        case 'waiting':
            return <Skeleton />;
        case 'confirmed':
            return <Component data={data} />;
        default:
            throw new Error('Unexpected process state');
    }
}

export default setContent;