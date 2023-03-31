import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player';
import { Link, useParams } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

function MovieDetails() {
    // ---------------------- react-slick settings -------------------------------------------------------------
    var vSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2,
                    infinite: true,
                    arrows: false
                }
            }
        ]
    };
    var actSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: false,
                    dots: false,
                    autoplay: true,
                    autoplaySpeed: 4000
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    arrows: false,
                    autoplay: true,
                    autoplaySpeed: 4000
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: false,
                    arrows: false,
                    autoplay: true,
                    autoplaySpeed: 4000
                }
            }
        ]
    };
    var settings = {
        dots: false,
        infinite: false,
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
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false,
                    autoplay: true,
                    autoplaySpeed: 4000,
                }
            }
        ]
    };

    // ---------------------- axios.create -------------------------------------------------------------
    const api = axios.create({
        baseURL: "https://api.themoviedb.org/3",
        params: {
            api_key: "4035ab85af00395edaf5c3635bc4d0ba",
            language: "en-US",
        },
    });


    function time_convert(num) {
        var hours = Math.floor(num / 60);
        var minutes = num % 60;
        return hours + "h " + minutes + "m ";
    }
    // ---------------------- Variables -------------------------------------------------------------
    let [movie, setMovie] = useState([]);
    let [videos, setVideos] = useState([]);
    let [casts, setCasts] = useState([]);
    let [recommendations, setRecommendations] = useState([]);
    let { id } = useParams();

    // ---------------------- Functions -------------------------------------------------------------
    let getMovieDetail = async () => {
        let { data } = await api.get(`/movie/${id}`);
        setMovie(data);
    }
    let getVideos = async () => {
        let { data } = await api.get(`/movie/${id}/videos`);
        setVideos(data.results);
    }
    let getCasts = async () => {
        let { data } = await api.get(`/movie/${id}/credits`);
        setCasts(data.cast);
    }
    let getRecommended = async () => {
        let { data } = await api.get(`/movie/${id}/recommendations`);
        setRecommendations(data.results);
    }
    let backToTop = function () {
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        getMovieDetail();
        getVideos();
        getCasts();
        getRecommended();
    }, [id])


    return (
        <div>
            <div className='full-back py-5' style={{ background: `linear-gradient(110deg, rgba(0,0,0,1),rgba(0,0,0,.9), rgba(0,0,0,.7), rgba(0,0,0,.4)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }} >
                <div className="container">
                    <div className='row' key={movie.id}>
                        <div className="col-md-3 left-side">
                            <img
                                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} className="poster" alt={movie.title}
                                onError={event => {
                                    event.target.src = "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg"
                                    event.onerror = null
                                }}
                            />
                        </div>
                        <div className="col-md-9 right-side">
                            <h2 className='movie-title'>{movie.title}</h2>
                            <p className='movie-tagline my-2'>{movie.tagline}</p>
                            <span className='movie-lang'>{movie.original_language}</span>
                            <span className='mx-2 space'> | </span>
                            <span className='movie-date'>{movie.release_date}</span>
                            <span className='mx-2 space'> | </span>
                            <span className='movie-runtime mt-2'>{time_convert(movie.runtime)}</span>
                            <p className='movie-vote-average mt-2'><i className="fa-solid fa-star"></i><span className='vote-max'>{movie.vote_average}</span> /10</p>
                            <h3 className='movie-overview-title'>Overview</h3>
                            <p className='movie-overview'>{movie.overview}</p>
                            <ul className='genres-list'>
                                {movie.genres?.map((gen) =>
                                    <li key={gen.id}><Link to={`/list/movie/${gen.id}`}>{gen.name}</Link></li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container py-5' >
                {/* media */}
                <h3>Media & Trailers</h3>
                <div>
                    <Slider {...vSettings}>
                        {videos.slice(0, 4).map((video) =>
                            <div key={video.id} className='trailerV'>
                                <ReactPlayer
                                    className='react-player'
                                    url={`https://www.youtube.com/watch?v=${video.key}`}
                                    width='99%'
                                    controls={true}
                                />
                            </div>
                        )}
                    </Slider>
                </div>
                {/* casts */}
                <h3 className="cast-title mt-5 mb-3">Actors</h3>
                <div className="row">
                    <Slider {...actSettings}>
                        {casts.map((actor) =>
                            <div key={actor.id} className='col-md-3 p-1'>
                                <Link to={`/person/${actor.id}`} >
                                    <div className="cast-card">
                                        <img
                                            src={`https://image.tmdb.org/t/p/original${actor.profile_path}`} className="poster" alt={movie.title}
                                            onError={event => {
                                                event.target.src = "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/wpd4itwGwbHwdqTLUlSx4MSpcAc.jpg"
                                                event.onerror = null
                                            }}
                                        />
                                        <h6>{actor.name}</h6>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </Slider>
                </div>
                {/* Recommended Movies */}
                <h3 className='rec-title mt-5 mb-3'>Recommended Movies</h3>
                <div>
                    <Slider {...settings}>
                        {recommendations.map((movie) =>
                            <div key={movie.id} >
                                <Link onClick={backToTop} to={`/movie/${movie.id}`}>
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
            </div >
        </div >
    )
}

export default MovieDetails