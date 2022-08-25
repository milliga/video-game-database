import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { getGames, getGenres, getGenreDetails, } from '../../api/index';
import { GameContext } from '../../Contexts/GameContext';

import StarRateIcon from '@mui/icons-material/StarRate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import './GameList.css';
import '../../Global Styles/GlobalStyle.css';


export const GameList = () => {

    const [games, setGames] = useState([]);
    const [page, setPage] = useState(1);
    const [genres, setGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { setSelectedGame } = useContext(GameContext);
    
    useEffect(() => {
        setIsLoading(true);
    }, [])

    useEffect(() => {
        const requests = getGames(page, 50).then(items => setGames([...games, items.data.results]));
        Promise.all([requests]).then(() => setIsLoading(false));
    }, [page])

    const handleShowMoreClick = (e) => {
        setPage(parseInt(e.target.id) + parseInt(1));
        console.log(page);
    }

    const addGenre = (e) => {
        setGenres(genre => [...genres, e.target.id]);
    }
    
    return (
        <div>
            {!isLoading ? (
                <>
                    {/* <div className='filter background'>
                        <input type='checkbox' onClick={addGenre} id='Action'></input><p>Action</p>
                    </div> */}
                    
                    <div className='grid-container background'>
                        {games.map((key) => (
                            key.map((game) => (
                                <div key={game.id} className="game">
                                    <Link onClick={() => setSelectedGame(game)} to={`/game?id=${game.id}`}><img className='zoom' src={game.background_image} alt={game.name}/></Link>
                                    <div className='info'>
                                        <p className='name'>{game.name.length < 45 ? game.name.trim() : game.name.substring(0, 45).trim() + '...'}</p>
                                        <div className='rating-container'>
                                            {/*console.log(game)*/}
                                            <StarRateIcon className='star-icon' fontSize='small'/>
                                            <p className='rating'>{game.rating}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ))}
                    </div>
                    <div className='pages background'>
                        <button onClick={handleShowMoreClick} type='button' className='btn btn-dark' id={parseInt(page)}>Show More</button>
                    </div>
                </>
            ) : (
                <div className='loading'>
                    <FontAwesomeIcon className='loading-icon' icon={faCircleNotch} />
                </div>
            )}
        </div>
        
    );
};