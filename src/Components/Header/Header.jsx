import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { SearchContext } from '../../Contexts/SearchContext'

import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

import './Header.css';

export const Header = () => {

    const { searchText, setSearchText, page, setPage } = useContext(SearchContext);

    const handleHomeClick = (e) => {
        setSearchText("");
        setPage(1);
    }

    return (
        <div className='header'>
            <SportsEsportsIcon className='game-icon' sx={{ color: 'white', fontSize: 70 }}/>
            <Link onClick={handleHomeClick} className='anchor' to={`/`}><h1 className='title'>Video Game Database</h1></Link>
            <Link onClick={handleHomeClick} className='anchor' to={`/`}><h2 className='home'>Home</h2></Link>
        </div>
    );
};