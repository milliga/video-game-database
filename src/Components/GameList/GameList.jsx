import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { getGames, getGenres, getGenreDetails, } from '../../api/index';
import { GameContext } from '../../Contexts/GameContext';

import StarRateIcon from '@mui/icons-material/StarRate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import './GameList.css';
import '../../Global Styles/GlobalStyle.css';
import { TextField } from '@mui/material';


export const GameList = () => {

    const [games, setGames] = useState([]);
    const [page, setPage] = useState(1);
    const [genres, setGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [actionGenreChecked, setActionGenreChecked] = useState(false);

    const { setSelectedGame } = useContext(GameContext);
    
    useEffect(() => {
        {/*set loading to true so page only shows loading icon until api finishes it's async call*/}
        setIsLoading(true);
        setSearchText("");
    }, [])

    useEffect(() => {
        {/*ensure api call is finished when page is loaded/changed so loading icon can show if api call is not finished*/}
        const requests = getGames(page, 50).then((item) => setGames([...games, item.data.results]));
        Promise.all([requests]).then(() => setIsLoading(false));
    }, [page])

    useEffect(() => {
        const timer = setTimeout(() => {
            const requests = getGames(page, 50, searchText).then((item) => setGames([...games, item.data.results]));
            Promise.all([requests]).then(() => setIsLoading(false));
        }, 500)

        return () => clearTimeout(timer);
    }, [searchText])

    const handleShowMoreClick = (e) => {
        setPage(parseInt(e.target.id) + parseInt(1));
    }

    const addGenre = (e) => {
        setGenres(() => [...genres, e.target.id]);
    }

    const handleGenreChange = (e) => {
        setActionGenreChecked(!actionGenreChecked);
    }

    const handleSearchChange = (e) => {
        setIsLoading(true);
        let lowerCaseSearch = e.target.value.toLowerCase();
        setSearchText(lowerCaseSearch);
    }

    const searchedGame = games.map((results) => (results.filter((searchableGame) => {
        if(searchText === '') {
            return searchableGame;
        }
        else if(searchableGame.name.toLowerCase().includes(searchText)) {
            return searchableGame;
        }
    })))
    
    return (
        <div>
            <div className='search-container background'>
                <div className='search'>
                    <TextField
                        id='outlined-basic'
                        onChange={handleSearchChange}
                        label='Search'
                        variant='outlined'
                        fullWidth
                    />
                </div>
            </div>
            
            {!isLoading ? (
                <>
                    {/*
                    TODO: add genre/tag filtering
                    <div>
                        <label>
                            <input 
                                type='checkbox'
                                checked={actionGenreChecked}
                                onChange={handleGenreChange} 
                            />
                            Action
                        </label>
                    </div>
                    */}
                    <div className='grid-container background'>
                        {searchedGame.map((item) => (
                            item.map((game) => (
                                <div key={game.id} className="game">
                                <Link onClick={() => setSelectedGame(game)} to={`/game?id=${game.id}`}><img className='zoom' src={game.background_image} alt={game.name}/></Link>
                                <div className='info'>
                                    {/*force string to not show past 45 characters to consistently keep style of each game card showing in game list component*/}
                                    <p className='name'>{game.name.length < 45 ? game.name.trim() : game.name.substring(0, 45).trim() + '...'}</p>
                                    <div className='rating-container'>
                                        <StarRateIcon className='star-icon' fontSize='small'/>
                                        <p className='rating'>{game.rating}</p>
                                    </div>
                                </div>
                            </div>
                        ))))}
                       
                    </div>
                    {/*update page state to call next page in api call by calling handleShowMoreClick which increases page state by 1*/}
                    <div className='pages background'>
                        <button onClick={handleShowMoreClick} type='button' className='btn btn-dark' id={parseInt(page)}>Show More</button>
                    </div>
                </>
            ) : (
                <div className='loading background'>
                    <FontAwesomeIcon className='loading-icon' icon={faCircleNotch} />
                </div>
            )}
        </div>
        
    );
};