import { Link } from 'react-router-dom';
import { useEffect } from 'react';

import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

import './Header.css';

export const Header = () => {

    return (
        <div className='header'>
            <SportsEsportsIcon className='game-icon' sx={{ color: 'white', fontSize: 70 }}/>
            <Link className='anchor' to={`/`}><h1 className='title'>Video Game Database</h1></Link>
            <Link className='anchor' to={`/`}><h2 className='home'>Home</h2></Link>
        </div>
    );
};