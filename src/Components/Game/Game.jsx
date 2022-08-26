import { useEffect, useState, useContext } from 'react';

import { GameContext } from '../../Contexts/GameContext';

import './Game.css';

import '../../Global Styles/GlobalStyle.css';

import { getGameDetails } from './../../api/index';

export const Game = () => {
    const [gameDetails, setGameDetails] = useState({});

    const { selectedGame } = useContext(GameContext);

    useEffect(() => {
        getGameDetails(parseInt(selectedGame.id)).then(game => setGameDetails(game.data));
    }, [])

    return (
        <div className='container background'>
            <img className='background-image' src={gameDetails.background_image} />
            <div className='game-info drop-shadow'>
                <h2 className='game-title'>{gameDetails.name}</h2>
                <div className='break'></div>
                <div className='genre-container'>
                    {gameDetails.genres?.map((genre, i) => (
                        <p key={i} className='genre'>{genre.name}</p>
                    ))}
                </div>
                <div className='developer-container'>
                    {gameDetails.developers?.map((dev, i) => (
                        <p key={i} className='developer'>{dev.name}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}