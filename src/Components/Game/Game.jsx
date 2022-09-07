import { useEffect, useState, useContext } from 'react';

import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Game.css';
import '../../Global Styles/GlobalStyle.css';

import { getGameDetails, getGameScreenshots } from '../../api/index';
import { GameContext } from '../../Contexts/GameContext';

export const Game = () => {
    const [gameDetails, setGameDetails] = useState({});
    const [screenshots, setScreenshots] = useState([]);
    const [mainScreenshot, setMainScreenshot] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const { selectedGame } = useContext(GameContext);

    useEffect(() => {
        {/*api call to get data using ID from context then set local state for game details. selectedGame does not provide the same information as the getGameDetails api call*/}
        setIsLoading(true);
        const firstRequest = Promise.resolve(getGameDetails(parseInt(selectedGame.id)).then((game) => setGameDetails(game.data)));
        const secondRequest = Promise.resolve(getGameScreenshots(selectedGame.slug).then((screenshot) => setScreenshots(screenshot.data.results)));
        Promise.all([firstRequest, secondRequest]).then(() => setIsLoading(false));
    }, [])

    useEffect(() => {
        setMainScreenshot(screenshots[0]);
    }, [isLoading])
    
    const changeMainScreenshot = (e) => {
        console.log(e)
        setMainScreenshot({ image: e.target.src });
    }

    return (
        <>
            {!isLoading ? (
                <div className='container background'>
                    <div className='media-container'>
                        <img className='main-image' src={mainScreenshot?.image} alt={gameDetails.name}/>
                        {screenshots.map((screenshot, i) => (
                            <img key={i} onClick={changeMainScreenshot} className='small-image zoom' src={screenshot.image} alt={gameDetails.name} />
                        ))}
                    </div>
                    <div className='game-info drop-shadow'>
                        <h2 className='game-title'>{gameDetails.name}</h2>
                        <div className='break'></div>
                        {/*show information from game clicked*/}
                        <div className='genre-container'>
                            <h3 className='genre-developer-title'>Genres</h3>
                            {gameDetails.genres?.map((genre, i) => (
                                <p key={i} className='genre'>{genre.name}</p>
                            ))}
                        </div>
                        <div className='developer-container'>
                            <h3 className='genre-developer-title'>Developers</h3>
                            {gameDetails.developers?.map((dev, i) => (
                                <p key={i} className='developer'>{dev.name}</p>
                            ))}
                        </div>
                        {/* 
                            TO DO
                            show screenshots and trailer
                            show and link to store(s)
                        */}
                        <div className='break' />
                        <div className='publisher-container'>
                            <h3 className='publisher-rating-title'>Publishers</h3>
                            {gameDetails.publishers?.map((publisher, i) => (
                                <p key={i} className='publisher'>{publisher.name}</p>
                            ))}
                        </div>
                        <div className='game-rating-container'>
                            <h3 className='publisher-rating-title'>Ratings</h3>
                            <p className='game-rating'>User Rating: {gameDetails.rating}/5</p>
                            <p className='game-rating'>Metacritic Rating: {gameDetails.metacritic}/100</p>
                        </div>
                        <div className='break' />
                        <div className='tag-container'>
                            <h3 className='tag-title'>Tags</h3>
                            {gameDetails.tags?.map((tag, i) => (
                                <p key={i} className='tag'>{tag.name}</p>
                            ))}
                        </div>
                        <div className='description-container'>
                            <div className='break' />
                            <div className='description' dangerouslySetInnerHTML={{ __html: gameDetails.description}} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className='loading background'>
                    <FontAwesomeIcon className='loading-icon' icon={faCircleNotch} />
                </div>
            )}
        </>
    )
    
}