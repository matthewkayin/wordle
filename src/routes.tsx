import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Game } from './pages/Game';

export const WordleRoutes: React.FunctionComponent = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Landing /> } />
                <Route path="/play" element={ <Game /> } />
            </Routes>
        </BrowserRouter>
    )
};