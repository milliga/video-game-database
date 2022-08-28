import { useEffect, useState, useContext } from 'react';

import { GameContext } from '../../Contexts/GameContext';

import './Game.css';

import '../../Global Styles/GlobalStyle.css';

import { getGameDetails } from './../../api/index';

export const Game = () => {
    const [gameDetails, setGameDetails] = useState({});

    const { selectedGame } = useContext(GameContext);

    useEffect(() => {
        {/*api call to get data using ID from context then set local state for game details. selectedGame does not provide the same information as the getGameDetails api call*/}
        getGameDetails(parseInt(selectedGame.id)).then(game => setGameDetails(game.data));
    }, [])

    return (
        <div className='container background'>
            <img className='background-image' src={gameDetails.background_image} alt={gameDetails.name}/>
            <div className='game-info drop-shadow'>
                {console.log(gameDetails)}
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
    )
}