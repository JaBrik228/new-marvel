import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErorBoundary from "../errorBoundary/ErrorBoundary";
import CharSearchForm from "../charSearchFrom/CharSearchForm";
import { Helmet } from "react-helmet";

import decoration from '../../resources/img/vision.png';
import { useState } from "react";

const MainPage = () => {
    const [selectedChar, setChar] = useState(null);

    function onClickChar(id) {
        setChar(id);
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