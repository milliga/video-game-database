import { Component, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { getGames, } from './api/index';

import { Header } from './Components/Header/Header';
import { GameList } from './Components/GameList/GameList';
import { Game } from './Components/Game/Game';
import { GameContext } from './Contexts/GameContext'
import { SearchContext } from './Contexts/SearchContext'

const App = () => {
    const [selectedGame, setSelectedGame] = useState({});
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);

    return (
        <>
        <GameContext.Provider value={{ selectedGame, setSelectedGame }}>
            <SearchContext.Provider value={{ searchText, setSearchText, page, setPage }}>
                <Router>
                    <Header />
                    <Routes>
                        <Route path='/' element={<GameList />} />
                        <Route path='/game/' element={<Game />}/>
                    </Routes>
                </Router>
            </SearchContext.Provider>
        </GameContext.Provider>
        </>
    );
};

export default App;
