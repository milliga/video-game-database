import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { getGames, getGenres, getGenreDetails, } from '../../api/index';
import { GameContext } from '../../Contexts/GameContext';
import { SearchContext } from '../../Contexts/SearchContext'

import StarRateIcon from '@mui/icons-material/StarRate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';

import './GameList.css';
import '../../Global Styles/GlobalStyle.css';
import { TextField } from '@mui/material';


export const GameList = () => {

    const [games, setGames] = useState([{}]);
    const [genresAndTags, setGenresAndTags] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [aboveThreePages, setAboveThreePages] = useState(false);

    const { setSelectedGame } = useContext(GameContext);
    const { searchText, setSearchText, page, setPage } = useContext(SearchContext);

    useEffect(() => {
        {/*ensure api call is finished when page is loaded/changed so loading icon can show if api call is not finished, set search text to empty string and show loading section
            while api is called*/}
        setIsLoading(true);
        setSearchText("");
        if(page >= 3) { 
            setAboveThreePages(true);
        } else if (page < 3) {
            setAboveThreePages(false);
        }
        const requests = Promise.resolve(getGames(page, 50).then((item) => setGames(item.data.results)));
        Promise.all([requests]).then(() => setIsLoading(false));
    }, [page])

    useEffect(() => {
        const timer = setTimeout(() => {
            const requests = Promise.resolve(getGames(page, 50, searchText).then((item) => setGames(item.data.results)));
            Promise.all([requests]).then(() => setIsLoading(false));
        }, 500)

        return () => { 
            clearTimeout(timer); 
        }
    }, [searchText])

  /*   useEffect(() => {
        console.log(games);
    }, [isLoading]) */

    const handleShowMoreClick = (e) => {
        setPage(parseInt(e.target.id) + parseInt(1));
    }

    const handlePageChange = (e) => {
        setIsLoading(true);
        setPage(parseInt(e.target.id));
    }

    const handleGenreTagChange = (e) => {
        setGenresAndTags(console.log(e));
    }

    const handleSearchChange = (e) => {
        setIsLoading(true);
        setSearchText(e.target.value);
    }
    
    return (
        <>
            <div className='search-container background'>
                <div className='search'>
                    <TextField
                        value={searchText}
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
                        {games.map((game) => (
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
                        ))}
                       
                    </div>
                    {/*update page state to call next page in api call by calling handleShowMoreClick which increases page state by 1*/}
                    <div className='pages background'>
                        {!aboveThreePages ? (
                            <>
                                <Button id={parseInt(page)} onClick={handlePageChange} variant="dark">1</Button>
                                <Button id={parseInt(page) + 1} onClick={handlePageChange} variant="dark">2</Button>
                                <Button id={parseInt(page) + 2} onClick={handlePageChange} variant="dark">3</Button>
                                <Button id={parseInt(page) + 3} onClick={handlePageChange} variant="dark">4</Button>
                                <Button id={parseInt(page) + 4} onClick={handlePageChange} variant="dark">5</Button>
                            </>
                        ) : (
                            <>
                                <Button id={parseInt(page)} onClick={handlePageChange} variant="dark">{parseInt(page) - 2}</Button>
                                <Button id={parseInt(page) + 1} onClick={handlePageChange} variant="dark">{parseInt(page) - 1}</Button>
                                <Button id={parseInt(page) + 2} onClick={handlePageChange} variant="dark">{parseInt(page)}</Button>
                                <Button id={parseInt(page) + 3} onClick={handlePageChange} variant="dark">{parseInt(page) + 1}</Button>
                                <Button id={parseInt(page) + 4} onClick={handlePageChange} variant="dark">{parseInt(page) + 2}</Button>
                            </>
                        )}
                        
                    </div>
                </>
            ) : (
                <div className='loading background'>
                    <FontAwesomeIcon className='loading-icon' icon={faCircleNotch} />
                </div>
            )}
        </>  
    );
};