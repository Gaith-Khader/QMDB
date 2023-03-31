import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Slider from 'react-slick';

function MoviesH() {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    autoplay: true,
                    autoplaySpeed: 4000
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 4000,
                    arrows: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    autoplay: true,
                    autoplaySpeed: 4000,
                }
            }
        ]
    };

    let [movies, setMovies] = useState([]);

    let getMovies = async () => {
        let { data } = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=c479608cd31492c8dbd2552c8c9960e7&include_adult=false");
        setMovies(data.results);
    }

    useEffect(() => {
        getMovies();
    }, [])


    return (
        <div className='my-5'>
            <h3 className="title">Trending Movies</h3>
            <div className="row">
                <Slider {...settings}>
                    {movies.map((movie) =>
                        <div key={movie.id}>
                            <Link to={`/movie/${movie.id}`}>
                                <div className="cards-carousel">
                                    <img className="cards-img-carousel" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title}
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
                </Slider>
            </div>
        </div>
    )
}


export default MoviesH

