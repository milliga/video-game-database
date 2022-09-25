import { useContext, useEffect, useState } from "react";
import { FilterContext } from "../../Contexts/FilterContext";


export const Checkbox = ({ id, name, slug, isTag }) => {
    const [isChecked, setIsChecked] = useState(false);

    const { tags, setTags, genres, setGenres } = useContext(FilterContext);

    useEffect(() => {
        if (isTag) {
            if (localStorage.getItem('tags')) {
                const allTags = JSON.parse(localStorage.getItem('tags')).map((t) => t.name).toString();
                if (allTags.includes(slug)) {
                    setIsChecked(true);
                }
            }
        }
        else {
            if (localStorage.getItem('genres')) {
                const allGenres = JSON.parse(localStorage.getItem('genres')).map((g) => g.name).toString();
                if (allGenres.includes(slug)) {
                    setIsChecked(true);
                }
            }
        }
    }, [])

    useEffect(() => {
        if(isTag) {
            localStorage.setItem('tags', JSON.stringify(tags))
        }
        else {
            localStorage.setItem('genres', JSON.stringify(genres))
        }
    }, [tags, genres])

    const handleChange = (e) => {
        setIsChecked(!isChecked);
        if(isTag) {
            let tagsCopy = [...tags];
            const tagStrings = tags.map((tag) => tag.name).toString();
            if(!tagStrings.includes(e.target.value)) {
                const newTag = {id: id, name: e.target.value};
                tagsCopy = [...tags, newTag];
                setTags([...tags, newTag]);
            }
            else if (tagStrings.includes(e.target.value)) {
                setTags(tags.filter((t) => t.name !== e.target.value));
                tagsCopy = tags.filter((t) => t.name !== e.target.value)
            }
        
        }
        else {
            let genresCopy = [...genres];
            const genreStrings = genres.map((genre) => genre.name).toString();
            if(!genreStrings.includes(e.target.value)) {
                const newGenre = {id: id, name: e.target.value};
                genresCopy = [...genres, newGenre];
                setGenres([...genres, newGenre]);
            }
            else if (genreStrings.includes(e.target.value)) {
                setGenres(genres.filter((g) => g.name !== e.target.value));
                genresCopy = genres.filter((g) => g.name !== e.target.value);
            }
        }
    }

    return (
        <>
            <input type='checkbox' id={id} name={name} value={slug} onChange={handleChange} checked={isChecked}/>
            <label style={{ paddingLeft: '5px' }}>{name}</label>
        </>
    )
};