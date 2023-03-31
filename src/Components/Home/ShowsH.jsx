import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

function ShowsH() {
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

    return (
        <div className='my-5'>
            <h3 className="title">Trending TV-Series</h3>
            <div className="row">
                <Slider {...settings}>
                    {shows.map((show) =>
                        <div key={show.id}>
                            <Link to={`/tv/${show.id}`}>
                                <div className="cards-carousel">
                                    <img className="cards-img-carousel" src={`https://image.tmdb.org/t/p/original${show.poster_path}`} alt="movie.title"
                                        onError={event => {
                                            event.target.src = "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg"
                                            event.onerror = null
                                        }} />
                                    <div className="cards__overlay">
                                        <div className="card__title">{show.name}</div>
                                        <div className="card__runtime d-flex justify-content-between">
                                            {show.release_date}
                                            <span className="card__rating"><i className="fas fa-star" /> {show.vote_average}</span>
                                        </div>
                                        <div className="card__description">{show.overview.slice(0, 118)}</div>
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

export default ShowsH