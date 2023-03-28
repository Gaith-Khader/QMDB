import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function TopRated() {
    const api = axios.create({
        baseURL: "https://api.themoviedb.org/3",
        params: {
            api_key: "4035ab85af00395edaf5c3635bc4d0ba",
            language: "en-US",
        },
    });

    let [movies, setMovies] = useState([]);

    let getMovies = async () => {
        let { data } = await api.get("https://api.themoviedb.org/3/movie/top_rated?api_key=c479608cd31492c8dbd2552c8c9960e7&include_adult=false");
        setMovies(data.results);
    }

    useEffect(() => {

        getMovies();
    }, [])

    return (
        <>
            <div className='my-5'>
                <h3 className="title mb-4">Top Rated Movies</h3>
                <div className="row">
                    {movies.map((movie) =>
                        <div className='col-6 col-md-3' key={movie.id}>
                            <Link to={`/movie/${movie.id}`}>
                                <div className="cards">
                                    <img className="cards__img" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="movie.title"
                                        onError={event => {
                                            event.target.src = "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg"
                                            event.onerror = null
                                        }} />
                                    <div className="cards__overlay">
                                        <div className="card__title">{movie.title}</div>
                                        <div className="card__runtime d-flex justify-content-between">
                                            {movie.release_date}
                                            <span className="card__rating"><i className="fas fa-star" /> {movie.vote_average}</span>
                                        </div>
                                        <div className="card__description">{movie.overview.slice(0, 118)}</div>
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