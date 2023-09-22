import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErorBoundary from "../errorBoundary/ErrorBoundary";
import CharSearchForm from "../charSearchFrom/CharSearchForm";
import { Helmet } from "react-helmet";

import decoration from '../../resources/img/vision.png';

import { useSelector, useDispatch } from "react-redux";
import { setSelectedChar } from "./mainPageSlice/mainPageSlice";

const MainPage = () => {
    const {selectedChar} = useSelector(state => state.selectedChar);
    const dispatch = useDispatch();


    function onClickChar(id) {
        dispatch(setSelectedChar(id));
        document.querySelector(".char__info").scrollIntoView({behavior: 'smooth'});
    }

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                    />
                <title>Marvel information portal</title>
            </Helmet>
            <ErorBoundary>
                <RandomChar/>
            </ErorBoundary>
            
            <div className="char__content">
                <ErorBoundary>
                    <CharList 
                        onClickChar={onClickChar}
                        selectedCharId={selectedChar} />
                </ErorBoundary>
                <div>
                    <ErorBoundary>
                        <CharInfo clickedCharId={selectedChar} />
                    </ErorBoundary>
                    <ErorBoundary>
                        <CharSearchForm/>
                    </ErorBoundary>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    );
}

export default MainPage;