import { Component, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { getGames, } from './api/index';

import { Header } from './Components/Header/Header';
import { GameList } from './Components/GameList/GameList';
import { Game } from './Components/Game/Game';
import { GameContext } from './Contexts/GameContext'
import { SearchContext } from './Contexts/SearchContext'
import { FilterContext } from './Contexts/FilterContext';
import { ListContext } from './Contexts/ListContext';

const App = () => {
    const [selectedGame, setSelectedGame] = useState({});
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const [genres, setGenres] = useState([]);
    const [tags, setTags] = useState([]);
    const [ordering, setOrdering] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
        <GameContext.Provider value={{ selectedGame, setSelectedGame }}>
            <SearchContext.Provider value={{ searchText, setSearchText, page, setPage }}>
                <FilterContext.Provider value={{ tags, setTags, genres, setGenres, ordering, setOrdering }}>
                    <ListContext.Provider value={{ isLoading, setIsLoading }}>
                        <Router>
                            <Header />
                            <Routes>
                                <Route path='/' element={<GameList />} />
                                <Route path='/game/' element={<Game />}/>
                            </Routes>
                        </Router>
                    </ListContext.Provider>
                </FilterContext.Provider>
            </SearchContext.Provider>
        </GameContext.Provider>
        </>
    );
};

export default App;
