import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

function SingleCat() {

    const api = axios.create({
        baseURL: "https://api.themoviedb.org/3",
        params: {
            api_key: "4035ab85af00395edaf5c3635bc4d0ba",
            language: "en-US",
        },
    });
    let [movies, setMovies] = useState([]);

    let params=useParams();

    let getMovies = async () => {
        let { data } = await api.get(`https://api.themoviedb.org/3/discover/movie?api_key=c479608cd31492c8dbd2552c8c9960e7&include_adult=false&with_genres=${params.id}`);
        setMovies(data.results);
    }

    useEffect(() => {
        getMovies();
    }, [])

    return (
        <div className='container'>
            <div className='my-5'>
                <h3 className="title">{params.name}</h3>
                <div className="row">
                    {movies.map((movie) =>
                        <div key={movie.id} className="col-md-2 col-lg-2 p-1">
                            <div className="card" id="fullHeight">
                                <img
                                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} className="poster" alt={movie.title}
                                    onError={event => {
                                        event.target.src = "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg"
                                        event.onerror = null
                                    }}
                                />
                                <div className="details">
                                    <div className={`d-flex justify-content-center align-items-center flex-column`}>
                                        <h4>{movie.title}</h4>
                                        <span className="rate"><i className="fa-solid fa-star"></i>{movie.vote_average}</span>
                                    </div>
                                    <Link to={`/movie/${movie.id}`} className="button">Details</Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SingleCat