import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

function Trending() {

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
        <div className='my-5'>
            <h3 className="title">What to Watch</h3>
            <div className="row">
                <Slider {...settings}>
                    {shows.map((show) =>
                        <div key={show.id} className='col-md-3 p-1'>
                            <div className="card" id="fullHeight">
                                <img
                                    src={`https://image.tmdb.org/t/p/original${show.poster_path}`} className="poster" alt={show.title}
                                    onError={event => {
                                        event.target.src = "https://www.zwatch.org/no-poster.png"
                                        event.onerror = null
                                    }}
                                />
                                <div className="details">
                                    <div className={`d-flex justify-content-between`}>
                                        <h4>{show.title || show.name}</h4>
                                        <span className="rate"><i className="fa-solid fa-star"></i>{show.vote_average}</span>
                                    </div>
                                    <Link onClick={backToTop} to={`/tv/${show.id}` || `/tv/${show.id}`} className="button">Details</Link>
                                </div>
                            </div>
                        </div>
                    )}
                </Slider>
            </div>
        </div>
    )
}

export default Trending