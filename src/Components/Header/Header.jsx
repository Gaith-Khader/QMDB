import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Header() {

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1

    };

    let [movies, setMovies] = useState([]);

    let getMovies = async () => {
        let { data } = await axios.get("https://api.themoviedb.org/3/trending/movie/week?api_key=c479608cd31492c8dbd2552c8c9960e7");
        setMovies(data.results);
    }

    useEffect(() => {
        getMovies();
    }, [])

    return (
        <div className='header'>
            <Slider {...settings}>
                {movies.map((movie) =>
                    <div key={movie.id} className='w-100'>
                        <div className="backHead vh-100" style={{ background: `linear-gradient(110deg, rgba(0,0,0,1),rgba(0,0,0,.9), rgba(0,0,0,.7), rgba(0,0,0,.4)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
                            <div className='headerInfo'>
                                <Link to={`/movie/${movie.id}`} className="button"><h2 className='headerTitle'>{movie.title}</h2></Link>
                                <span className='headerDate'>{movie.release_date}</span>
                                <span className='headerRate'><i className="fa-solid fa-star"></i>{movie.vote_average}</span>
                            </div>
                            <p className='vh-100' style={{
                                background: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,.7), rgba(0,0,0,1)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat'
                            }}></p>
                        </div>
                    </div>
                )}
            </Slider>
        </div>
    )
}

export default Header