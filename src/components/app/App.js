import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";
import {SingleComicPage, SingleCharPage} from "../pages";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense} from "react";

const Page404 = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SinglePage = lazy(() => import("../pages/SinglePage"));

const App = () => {
    return (
        <Router>
                <div className="app">
                    <AppHeader />
                    <main>
                        <Suspense fallback={<Spinner/>}>
                            <Routes>
                                <Route path="/" element={<MainPage />} />
                                <Route path="/comics" element={<ComicsPage/>} />
                                <Route path="/comics/:dataId" element={<SinglePage comic={true} render={({...values}) => <SingleComicPage {...values} />}/>} />
                                <Route path="/character/:dataId" element={<SinglePage render={({...values}) => <SingleCharPage {...values} />}/>} />
                                <Route path="*" element={<Page404 />} />
                            </Routes>
                        </Suspense>
                    </main>
                </div>
        </Router>
    )
}

export default App;