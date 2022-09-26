import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { getGames, getGenres, getGenreDetails, getGameGenres, getGameTags} from '../../api/index';
import { GameContext } from '../../Contexts/GameContext';
import { SearchContext } from '../../Contexts/SearchContext'

import StarRateIcon from '@mui/icons-material/StarRate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import missingBackgroundIcon from '../../images/gaming-gamepad-icon.png'
import arrowDownIcon from '../../images/arrow-down-icon.png'
import checkmarkIcon from '../../images/tick-icon.svg'
import { Checkbox } from '../Checkbox/Checkbox';
import CheckIcon from '@mui/icons-material/Check';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

import './GameList.css';
import '../../Global Styles/GlobalStyle.css';
import { TextField } from '@mui/material';

import { tagsAndGenres } from './FilterParams';
import { FilterContext } from '../../Contexts/FilterContext';
import { Dropdown } from 'react-bootstrap';


export const GameList = () => {

    const [games, setGames] = useState([{}]);
    // const [genres, setGenres] = useState([]);
    // const [tags, setTags] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [aboveThreePages, setAboveThreePages] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [clickedFilter, setClickedFilter] = useState(false)
    const [ordering, setOrdering] = useState("");
    const { setSelectedGame } = useContext(GameContext);
    const { searchText, setSearchText, page, setPage } = useContext(SearchContext);
    const { tags, setTags, genres, setGenres } = useContext(FilterContext);

    useEffect(() => {
        //Initiate all the proper state when the page has changed (or initially loaded when app if first started)
        setIsLoading(true);
        setSearchText("");
        if(page >= 3) { 
            setAboveThreePages(true);
        } else if (page < 3) {
            setAboveThreePages(false);
        }
        const request = Promise.resolve(getGames(page, 40, searchText, getGenresAsString(), getTagsAsString(), String(ordering)).then((item) => setGames(item.data.results))).catch(() => {return;});
        Promise.all([request]).then(() => setIsLoading(false));
    }, [page])

    useEffect(() => {
        //Timeout so API is not called every time a character is typed
        const timer = setTimeout(() => {
            const request = Promise.resolve(getGames(page, 40, searchText, getGenresAsString(), getTagsAsString(), String(ordering)).then((item) => setGames(item.data.results))).catch(() => {return;});
            Promise.all([request]).then(() => setIsLoading(false));
        }, 1500)

        return () => { 
            clearTimeout(timer); 
        }
    }, [searchText])

    useEffect(() => {
        //Take user back to beginning of list of games when filter is updated so they don't stay on page X when they select a new filter
        setPage(1);
        const request = Promise.resolve(getGames(page, 40, searchText, getGenresAsString(), getTagsAsString(), String(ordering)).then((item) => setGames(item.data.results)).catch(() => {return;}));
        Promise.all([request]).then(() => setIsLoading(false))
    }, [clickedFilter])

    useEffect(() => {
        //Take user back to beginning of list of games when sort by has been changed so they don't stay on page X when they select a new way to sort
        setPage(1);
        const request = Promise.resolve(getGames(page, 40, searchText, getGenresAsString(), getTagsAsString(), String(ordering)).then((item) => setGames(item.data.results))).catch(() => {return;});
        Promise.all([request]).then(() => setIsLoading(false));
    }, [ordering])

    const handlePageChange = (e) => {
        setIsLoading(true);
        setPage(parseInt(e.target.id));
    }

    const handleSearchChange = (e) => {
        setIsLoading(true);
        setSearchText(e.target.value);
    }

    const handleFilterClick = () => {
        setIsFilterOpen(!isFilterOpen);
    }

    const handleFilterSubmit = () => {
        setIsLoading(true);
        setClickedFilter(!clickedFilter);
    }

    const getGenresAsString = () => {
        const genresAsString = genres.map((game) => game.name);
        return String(genresAsString.toString());
    }

    const getTagsAsString = () => {
        const tagsAsString = tags.map((tag) => tag.name);
        return String(tagsAsString.toString());
    }

    const handleSort = (e) => {
        //Add ordering string to state for API call according to what the user selects
        const sort = e.target.id;
        if (sort === 'rating-up') {
            setOrdering("-rating");
        }
        else if (sort === 'rating-down') {
            setOrdering("rating");
        }
        else if (sort === 'released-up') {
            setOrdering("-released");
        }
        else if (sort === 'released-down') {
            setOrdering("released");
        }
        else if (sort === 'name-up') {
            setOrdering("-name");
        }
        else if (sort === 'name-down') {
            setOrdering("name");
        }
        else if (sort === 'metacritic-up') {
            setOrdering("-metacritic");
        }
        else if (sort === 'metacritic-down') {
            setOrdering("metacritic");
        }
        setIsLoading(true);
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
            <div className='filter-container background'>
                <div className='filter-button'>
                    <Button variant='primary' onClick={handleFilterClick}>Filter<img className={isFilterOpen ? 'filter-arrow-up' : 'filter-arrow'} src={arrowDownIcon} /></Button>
                </div>
                {isFilterOpen ? (
                    <div className='filter-box'>
                        <form action='' autoComplete='off'>
                            <fieldset className='filter-field'>
                                {/*Fix checkbox not staying checked on page change and refresh*/}
                                {tagsAndGenres.allTags.map((t) => (
                                    <div key={t.slug} className='filter'>
                                        {/* <input type='checkbox' id={t.id} name={t.name} value={t.slug} onChange={handleAddTag} /> */}
                                        <Checkbox id={t.id} name={t.name} slug={t.slug} isTag={true} />
                                    </div>
                                ))}
                                {tagsAndGenres.allGenres.map((g) => (
                                    <div key={g.slug} className='filter'>
                                        {/* <input type='checkbox' id={g.id} name={g.name} value={g.slug} onChange={handleAddGenre} /> */}
                                        <Checkbox id={g.id} name={g.name} slug={g.slug} isTag={false} />
                                    </div>
                                ))}
                            </fieldset>
                        </form>
                        <div className='submit-button'>
                            <Button variant='success' onClick={handleFilterSubmit}>Submit Filter</Button>
                        </div>
                    </div>
                ) : <></>}
            </div>
            <div className='sort-container background'>
                <Dropdown>
                    <Dropdown.Toggle variant='secondary' id='dropdown'>
                        Sort By
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleSort} id='metacritic-up'>{ordering === '-metacritic' ? <CheckIcon /> : <></>}Metacritic (Descending)</Dropdown.Item>
                        <Dropdown.Item onClick={handleSort} id='metacritic-down'>{ordering === 'metacritic' ? <CheckIcon /> : <></>}Metacritic (Ascending)</Dropdown.Item>
                        <Dropdown.Item onClick={handleSort} id='name-up'>{ordering === '-name' ? <CheckIcon /> : <></>}Name (Descending)</Dropdown.Item>
                        <Dropdown.Item onClick={handleSort} id='name-down'>{ordering === 'name' ? <CheckIcon /> : <></>}Name (Ascending)</Dropdown.Item>
                        <Dropdown.Item onClick={handleSort} id='rating-up'>{ordering === '-rating' ? <CheckIcon /> : <></>} Rating (Descending)</Dropdown.Item>
                        <Dropdown.Item onClick={handleSort} id='rating-down'>{ordering === 'rating' ? <CheckIcon /> : <></>}Rating (Ascending)</Dropdown.Item>
                        <Dropdown.Item onClick={handleSort} id='released-up'>{ordering === '-released' ? <CheckIcon /> : <></>}Released (Descending)</Dropdown.Item>
                        <Dropdown.Item onClick={handleSort} id='released-down'>{ordering === 'released' ? <CheckIcon /> : <></>}Released (Ascending)</Dropdown.Item>
                    </Dropdown.Menu>  
                </Dropdown>
            </div>
            {!isLoading ? (
                <>
                    {/*Add sort by for ratings, released, metacritic, etc*/}
                    <div className='grid-container background'>
                        {games.map((game) => (
                            <div key={game.id} className="game">
                                <Link onClick={() => {
                                    localStorage.setItem('game', JSON.stringify(game));
                                    setSelectedGame(game);
                                }} to={`/game/`}>
                                <img 
                                    className='zoom' 
                                    src={game.background_image || missingBackgroundIcon}
                                    alt={game.name}
                                />
                                </Link>
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
                        {games.length >= 40 ? <>
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
                                    <Button id={1} onClick={handlePageChange} variant="dark" size='sm'><KeyboardDoubleArrowLeftIcon className='first-page-button' /></Button>
                                    <Button id={parseInt(page)} onClick={handlePageChange} variant="dark">{parseInt(page) - 2}</Button>
                                    <Button id={parseInt(page) + 1} onClick={handlePageChange} variant="dark">{parseInt(page) - 1}</Button>
                                    <Button id={parseInt(page) + 2} onClick={handlePageChange} variant="dark">{parseInt(page)}</Button>
                                    <Button id={parseInt(page) + 3} onClick={handlePageChange} variant="dark">{parseInt(page) + 1}</Button>
                                    <Button id={parseInt(page) + 4} onClick={handlePageChange} variant="dark">{parseInt(page) + 2}</Button>
                                </>
                            )}
                        </> : <></>}
                        
                        
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