import { useEffect, useState, useContext } from 'react';

import { GameContext } from '../../Contexts/GameContext';

import './Game.css';

import '../../Global Styles/GlobalStyle.css';

import { getGameDetails } from './../../api/index';

export const Game = () => {
    const [gameDetails, setGameDetails] = useState({});

    const { selectedGame } = useContext(GameContext);

    useEffect(() => {
        getGameDetails(selectedGame.id).then(game => setGameDetails(game.data))
    }, [])

    return (
        <div className='container background'>
            <img className='background-image' src={gameDetails.background_image} />
            <div className='game-info'>
                <h2 className='game-title'>{gameDetails.name}</h2>
                <h4>{gameDetails.description_raw}</h4>
            </div>
        </div>
    )
}