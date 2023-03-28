import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function TopRated() {
    let [shows, setShows] = useState([]);


    let getShows = async () => {
        let { data } = await axios.get("https://api.themoviedb.org/3/tv/top_rated?api_key=c479608cd31492c8dbd2552c8c9960e7&include_adult=false");
        setShows(data.results);
    }
    let backToTop = function () {
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        getShows();
    }, [])

    return (
        <>
            <div className='my-5'>
                <h3 className="title mb-4">Top Rated TV-Series</h3>
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
                </div>
            </div>
        </>
    )
}

export default TopRated