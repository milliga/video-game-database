import React, { useEffect, useState, useContext } from 'react';

import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Game.css';
import '../../Global Styles/GlobalStyle.css';

import { getGameDetails, getGameScreenshots, getGameTrailers, getGameStores } from '../../api/index';
import { GameContext } from '../../Contexts/GameContext';

export const Game = () => {
    const [gameDetails, setGameDetails] = useState({});
    const [screenshots, setScreenshots] = useState([]);
    const [mainScreenshot, setMainScreenshot] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [trailers, setTrailers] = useState([]);
    const [isMuted, setIsMuted] = useState(true);
    const [showMoreDescription, setShowMoreDescription] = useState(false);
    const [gameStores, setGameStores] = useState([]);
    const [foundIdMatch, setFoundIdMatch] = useState(false)

    const DESCRIPTION_LENGTH = 200;

    useEffect(() => {
        {/*api call to get data using ID from context then set local state for game details. selectedGame does not provide the same information as the getGameDetails api call*/}
        setIsLoading(true);
        setIsMuted(true);
        setShowMoreDescription(false);
        setGameInformation();
    }, [])

    useEffect(() => {
        setMainScreenshot(screenshots[0]);
    }, [isLoading])

    const setGameInformation = () => {
        const parsedGame = JSON.parse(localStorage.getItem('game'));
        const firstRequest = Promise.resolve(getGameDetails(parseInt(parsedGame.id)).then((game) => setGameDetails(game.data)));
        const secondRequest = Promise.resolve(getGameScreenshots(parsedGame.slug).then((screenshot) => setScreenshots(screenshot.data.results)));
        const thirdRequest = Promise.resolve(getGameTrailers(parsedGame.id).then((trailer) => setTrailers(trailer.data.results)));
        const fourthRequest = Promise.resolve(getGameStores(parsedGame.slug).then((store) => setGameStores(store.data.results)));
        Promise.all([firstRequest, secondRequest, thirdRequest, fourthRequest]).then(() => setIsLoading(false));
    }
    
    const changeMainScreenshot = (e) => {
        setMainScreenshot({ image: e.target.src });
    }

    const showDescription = () => {
        const description = gameDetails.description;
        if(showMoreDescription) {
            return description;
        }
        return description.substring(0, DESCRIPTION_LENGTH) + "...";
    }

    const showMoreOrLessClicked = () => {
        setShowMoreDescription(!showMoreDescription);
    }

    const setFoundMatch = () => {
        setFoundIdMatch(!foundIdMatch);
    }

    return (
        <>
            {!isLoading ? (
                <div className='game-container background'>
                    {trailers[0] == null ? 
                        <div className='no-video background'>
                            <span>No trailer found in API</span>
                        </div> : 
                        <div className='video-container'>
                            <video className='video' muted={isMuted} autoPlay={true} controls>
                                <source src={trailers[0].data.max.toString()} type='video/mp4' />
                            </video>
                        </div>
                    }
                    
                    <div className='screenshot-container'>
                        <img className='main-image' src={mainScreenshot?.image} alt={gameDetails.name}/>
                        {screenshots.map((screenshot, i) => (
                            <img key={i} onClick={changeMainScreenshot} className='small-image zoom' src={screenshot.image} alt={gameDetails.name} />
                        ))}
                        <div className='stores-container drop-shadow'>
                            <h3 className='store-title'>Stores</h3>
                            {gameDetails.stores.map((store, i) => (
                                <React.Fragment key={store.id}>
                                    {gameStores.map((gameStore) => (
                                        <React.Fragment key={gameStore.url}>
                                            {gameStore.id === store.id ? (
                                                <a className='store-anchor' target='_blank' href={gameStore.url}>
                                                    <span key={i} className='store'>{store.store.name}</span>
                                                </a>
                                            ) : <></>}
                                        </React.Fragment>
                                    ))}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                    
                    <div className='game-info drop-shadow'>
                        <h2 className='game-title'>{gameDetails.name}</h2>
                        <div className='break'></div>
                        {/*show information from game clicked*/}
                        <div className='genre-container'>
                            <h3 className='genre-developer-title'>Genres</h3>
                            {gameDetails.genres?.map((genre, i) => (
                                <span key={i} className='genre'>{genre.name}</span>
                            ))}
                        </div>
                        <div className='developer-container'>
                            <h3 className='genre-developer-title'>Developers</h3>
                            {gameDetails.developers?.map((dev, i) => (
                                <span key={i} className='developer'>{dev.name}</span>
                            ))}
                        </div>
                        <div className='break' />
                        <div className='publisher-container'>
                            <h3 className='publisher-rating-title'>Publishers</h3>
                            {gameDetails.publishers?.map((publisher, i) => (
                                <span key={i} className='publisher'>{publisher.name}</span>
                            ))}
                        </div>
                        <div className='game-rating-container'>
                            <h3 className='publisher-rating-title'>Ratings</h3>
                            <span className='game-rating'>User Rating: {gameDetails.rating}/5</span>
                            <span className='game-rating'>Metacritic Rating: {gameDetails.metacritic}/100</span>
                        </div>
                        <div className='break' />
                        <div className='tag-container'>
                            <h3 className='tag-title'>Tags</h3>
                            {gameDetails.tags?.map((tag, i) => (
                                <span key={i} className='tag'>{tag.name}</span>
                            ))}
                        </div>
                        <div className='description-container'>
                            <div className='break' />
                            <div className='description' dangerouslySetInnerHTML={{ __html: showDescription()}} />
                            {showMoreDescription ? (
                                <div className='show-less-container'>
                                    <span className='show-more-less' onClick={showMoreOrLessClicked}>Show Less</span>
                                </div>      
                            ) : (
                                <div className='show-more-container'>
                                    <span className='show-more-less' onClick={showMoreOrLessClicked}>Show More</span>
                                </div>
                            )}
                        </div>
                        <div className='break' />
                        <div className='platform-container'>
                            <h3 className='platform-title'>Platforms</h3>
                            {gameDetails.platforms?.map((game, i) => (
                                <span key={i} className='platform'>{game.platform.name}</span>
                            ))}
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