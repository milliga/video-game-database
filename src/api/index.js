import axios from "axios";

export const getGames = async (pageNumber, pageSize, searchText) => {
    try {
        const data = await axios.get(`https://rawg-video-games-database.p.rapidapi.com/games?key=${process.env.REACT_APP_RAWG_KEY}`, {
            params: {
                page: pageNumber,
                page_size: pageSize,
                search: searchText,
            },
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com',
            },
        });
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const getGenres = async (pageNumber, pageSize) => {
    try {
        const data = await axios.get(`https://rawg-video-games-database.p.rapidapi.com/genres?key=${process.env.REACT_APP_RAWG_KEY}`, {
            params: {
                page: pageNumber,
                page_size: pageSize,
            },
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com',
            },
        });
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const getGenreDetails = async (id) => {
    try {
        const data = await axios.get(`https://rawg-video-games-database.p.rapidapi.com/genres/${id}?key=${process.env.REACT_APP_RAWG_KEY}`, {
            params: {
                id: id
            },
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com',
            },
        });
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const getGameDetails = async (id) => {
    try {
        const data = await axios.get(`https://rawg-video-games-database.p.rapidapi.com/games/${id}?key=${process.env.REACT_APP_RAWG_KEY}`, {
            params: {
                id: id
            },
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com',
            },
        });
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const getGameScreenshots = async (gamePk) => {
    try {
        const data = await axios.get(`https://rawg-video-games-database.p.rapidapi.com/games/${gamePk}/screenshots?key=${process.env.REACT_APP_RAWG_KEY}`, {
            params: {
                game_pk: gamePk
            },
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com',
            },
        });
        return data;
    } catch (error) {
        console.log(error);
    }
};