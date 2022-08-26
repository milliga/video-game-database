import { Component, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { getGames, } from './api/index';

import { Header } from './Components/Header/Header';
import { GameList } from './Components/GameList/GameList';
import { Game } from './Components/Game/Game';
import { GameContext } from './Contexts/GameContext'

const App = () => {
    const [selectedGame, setSelectedGame] = useState({});

    return (
        <>
        <GameContext.Provider value={{ selectedGame, setSelectedGame }}>
            <Router>
                <Header />
                <Routes>
                    <Route path='/' element={<GameList />} />
                    <Route path='/game/' element={<Game />}/>
                </Routes>
            </Router>
        </GameContext.Provider>
        </>
    );
};

export default App;
