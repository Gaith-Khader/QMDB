import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactPlayer from 'react-player';

function ShowDetails() {

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
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false,
                    autoplay: true,
                    autoplaySpeed: 4000,
                }
            }
        ]
    };
    var seasonSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false,
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

// ---------------------- Variables -------------------------------------------------------------
    let [show, setShow] = useState([]);
    let [videos, setVideos] = useState([]);
    let [casts, setCasts] = useState([]);
    let [recommendations, setRecommendations] = useState([]);
    let { id } = useParams();

// ---------------------- Functions -------------------------------------------------------------
    let getMovieDetail = async () => {
        let { data } = await api.get(`/tv/${id}`);
        setShow(data);
    }
    let getVideos = async () => {
        let { data } = await api.get(`/tv/${id}/videos`);
        setVideos(data.results);
    }
    let getCasts = async () => {
        let { data } = await api.get(`/tv/${id}/credits`);
        setCasts(data.cast);
    }
    let getRecommended = async () => {
        let { data } = await api.get(`/tv/${id}/recommendations`);
        setRecommendations(data.results);
    }
    let backToTop = function () {
        window.scrollTo(0, 0);
    }
    function time_convert(num) {
        var hours = Math.floor(num / 60);
        var minutes = num % 60;
        return hours + "h " + minutes + "m ";
    }

    useEffect(() => {
        getMovieDetail();
        getVideos();
        getCasts();
        getRecommended();
    }, [id])

    return (
        <div>
            <div className='full-back py-5' style={{ background: `linear-gradient(110deg, rgba(0,0,0,1),rgba(0,0,0,.9), rgba(0,0,0,.7), rgba(0,0,0,.4)), url(https://image.tmdb.org/t/p/original${show.backdrop_path})`, }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 left-side" >
                            <img
                                src={`https://image.tmdb.org/t/p/original${show.poster_path}`} className="poster" alt={show.title}
                                onError={event => {
                                    event.target.src = "https://www.zwatch.org/no-poster.png"
                                    event.onerror = null
                                }}
                            />
                        </div>
                        <div className="col-md-9 right-side" >
                            <h2 className='movie-title'>{show.name}</h2>
                            <p className='movie-tagline'>{show.tagline}</p>
                            <div className='d-flex my-2'>
                                <p className='movie-epn'>{show.number_of_episodes} Episodes</p>
                                <span className='mx-2 space'> | </span>
                                <p className='movie-epn'>{show.number_of_seasons} Seasons</p>
                                <span className='movie-status'>{show.status}</span>
                            </div>
                            <span className='movie-lang'>{show.original_language}</span>
                            <span className='mx-2 space'> | </span>
                            <span className='movie-date'>{show.first_air_date}</span>
                            <span className='mx-2 space'> | </span>
                            <span className='movie-runtime mt-2'>{time_convert(show.episode_run_time)}</span>
                            <p className='movie-vote-average mt-2'><i className="fa-solid fa-star"></i><span className='vote-max'>{show.vote_average}</span> /10</p>
                            <h3 className='movie-overview-title'>Overview</h3>
                            <p className='movie-overview'>{show.overview}</p>
                            <ul className='genres-list'>
                                {show.genres?.map((gen) =>
                                    <li key={gen.id}><Link to={`/list/tv/${gen.id}`}>{gen.name}</Link></li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div key={show.id} className='container py-5'>

                <div className="seasons my-5">
                    <h3 className='mb-3'>Seasons</h3>
                    <Slider {...seasonSettings}>
                        {show.seasons?.map((se) =>
                            <div key={se.id}>
                                <div className="row season">
                                    <div className='col-md-4'>
                                        <img
                                            src={`https://image.tmdb.org/t/p/original${se.poster_path}`} className="season-poster w-100" alt={se.name}
                                            onError={event => {
                                                event.target.src = "https://www.zwatch.org/no-poster.png"
                                                event.onerror = null
                                            }}
                                        />
                                    </div>
                                    <div className='col-md-8'>
                                        <h4 className='season-title'>{se.name}</h4>
                                        {/* <p>{se.overview}</p> */}
                                        <h4 className='season-ep'>{se.episode_count} Episodes</h4>
                                        <h4 className='season-fn'>{se.air_date}</h4>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Slider>
                </div>

                {/* media */}
                <h3>Media & trailers</h3>
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
                                            src={`https://image.tmdb.org/t/p/original${actor.profile_path}`} className="poster" alt={actor.title}
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
                <h3 className='rec-title mt-5 mb-3'>Recommended TV-Series</h3>
                <div>
                    <Slider {...settings}>
                        {recommendations.map((tv) =>
                            <div key={tv.id} className="col-md-3 p-1">
                                <div className="card" id="fullHeight">
                                    <img
                                        src={`https://image.tmdb.org/t/p/original${tv.poster_path}`} className="poster" alt={tv.title}
                                        onError={event => {
                                            event.target.src = "https://www.zwatch.org/no-poster.png"
                                            event.onerror = null
                                        }}
                                    />
                                    <div className="details">
                                        <div className={`d-flex justify-content-between`}>
                                            <h4>{tv.name}</h4>
                                            <span className="rate"><i className="fa-solid fa-star"></i>{tv.vote_average}</span>
                                        </div>
                                        <Link onClick={backToTop} to={`/tv/${tv.id}`} className="button">Details</Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Slider>
                </div>

            </div>
        </div>
    )
}

export default ShowDetails