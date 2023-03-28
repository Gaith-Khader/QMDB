import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function ExploreShows() {
    let [shows, setShows] = useState([]);


    let getShows = async () => {
        let { data } = await axios.get("https://api.themoviedb.org/3/trending/tv/week?api_key=c479608cd31492c8dbd2552c8c9960e7&include_adult=false");
        setShows(data.results);
    }

    let backToTop = function () {
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        getShows();
    }, [])

    const [query, setQuery] = useState('');

    const search = async (e) => {
        e.preventDefault();
        console.log("searching");
        try {
            const url = `https://api.themoviedb.org/3/search/tv?api_key=c479608cd31492c8dbd2552c8c9960e7&query=${query}&include_adult=false`;
            const res = await fetch(url);
            const data = await res.json();
            setShows(data.results);
        }
        catch (e) {
            console.log(e);
        }
    }
    const changeHandler = (e) => {
        setQuery(e.target.value);
    }
    return (
        <>
            <div className='my-5'>
                <div className='row'>
                    <h3 className=" col-md-6 title">Explore & Search</h3>
                    <form onSubmit={search} className='text-center mb-3 col-md-6'>
                        <input className='search-field' type='search' placeholder='Search TV-Series' name='query' value={query} onChange={changeHandler} />
                        <button className='search-btn'>Search</button>
                    </form>
                </div>
                {shows.length > 0 ? (
                    <div className="row">
                        {shows.map((show) =>
                            <div className='col-6 col-md-3' key={show.id}>
                                <Link to={`/tv/${show.id}`}>
                                    <div className="cards">
                                        <img className="cards__img" src={`https://image.tmdb.org/t/p/original${show.poster_path}`} alt="show.name"
                                            onError={event => {
                                                event.target.src = "https://www.zwatch.org/no-poster.png"
                                                event.onerror = null
                                            }} />
                                        <div className="cards__overlay">
                                            <div className="card__title">{show.name}</div>
                                            <span className="card__rating"><i className="fas fa-star" /> {show.vote_average}</span>
                                            <div className="card__description">{show.overview.slice(0, 118)}</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>) : (
                    <h5 className='err-search'>Sorry no TV-Series Found</h5>
                )}
            </div>
        </>
    )
}

export default ExploreShows