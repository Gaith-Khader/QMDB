import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Slider from 'react-slick';

function ActorDetails() {
// ---------------------- react-slick settings -------------------------------------------------------------
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: false,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false,
                    autoplay: true,
                    autoplaySpeed: 4000
                }
            },
            {
                breakpoint: 760,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    autoplay: true,
                    infinite: false,
                    autoplaySpeed: 4000,
                    arrows: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    autoplay: true,
                    infinite: false,
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
                    infinite: false,
                    autoplay: true,
                    autoplaySpeed: 4000,
                }
            }
        ]
    };

// ---------------------- axios.create -------------------------------------------------------------
    // api create
    const api = axios.create({
        baseURL: "https://api.themoviedb.org/3",
        params: {
            api_key: "4035ab85af00395edaf5c3635bc4d0ba",
            language: "en-US",
        },
    });

// ---------------------- Variables -------------------------------------------------------------
    let [workM, setWorkM] = useState([]);
    let [workT, setWorkT] = useState([]);
    let [actor, setActor] = useState([]);
    let params = useParams();


// ---------------------- Functions -------------------------------------------------------------
    let getActorDetail = async () => {
        let { data } = await api.get(`/person/${params.id}`);
        setActor(data);
    }
    let getWorkM = async () => {
        let { data } = await api.get(`/person/${params.id}/movie_credits`);
        setWorkM(data.cast);
    }
    let getWorkT = async () => {
        let { data } = await api.get(`/person/${params.id}/tv_credits`);
        setWorkT(data.cast);
    }

    useEffect(() => {
        getActorDetail();
        getWorkM();
        getWorkT();
    }, [])



    return (
        <>
            <div className='actor-bg pb-4'>
                <div className='container'>
                    <div className="row">
                        <div className="col-md-3 act-left-side" >
                            <img
                                src={`https://image.tmdb.org/t/p/original${actor.profile_path}`} className="poster-actor" alt={actor.title}
                                onError={event => {
                                    event.target.src = "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/wpd4itwGwbHwdqTLUlSx4MSpcAc.jpg"
                                    event.onerror = null
                                }}
                            />
                        </div>
                        <div className="col-md-9 act-right-side">
                            <h2 className='actor-title'>{actor.name}</h2>
                            <span className="actor-birth">Birthday: {actor.birthday}</span>
                            <span className='mx-2 space'> | </span>
                            <span className="rate me-2">{actor.place_of_birth}</span>
                            <h3 className='actor-overview-title'>Biography:</h3>
                            <p className='actor-overview'>{actor.biography}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <h3 className='rec-title mt-5 mb-3'>Known for</h3>
                <Slider {...settings}>
                    {workM.map((tv) =>
                        <div key={tv.id} className="col-md-3 p-1">
                            <div className="card" id="fullHeight">
                                <img
                                    src={`https://image.tmdb.org/t/p/original${tv.poster_path}`}
                                    className="poster" alt={tv.title}
                                    onError={event => {
                                        event.target.src = "https://www.zwatch.org/no-poster.png"
                                        event.onerror = null
                                    }}
                                />
                                <div className="details">
                                    <div className={`d-flex justify-content-between`}>
                                        <h4>{tv.title}</h4>
                                        <span className="rate"><i className="fa-solid fa-star"></i>{tv.vote_average}</span>
                                    </div>
                                    <Link to={`/movie/${tv.id}`} className="button">Details</Link>
                                </div>
                            </div>
                        </div>
                    )}
                </Slider>
                <Slider {...settings}>
                    {workT.map((tv) =>
                        <div key={tv.id} className="col-md-3 p-1">
                            <div className="card">
                                <img
                                    src={`https://image.tmdb.org/t/p/original${tv.poster_path}`}
                                    className="poster" alt={tv.title}
                                    onError={event => {
                                        event.target.src = "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg"
                                        event.onerror = null
                                    }}
                                />
                                <div className="details">
                                    <div className={`d-flex justify-content-between`}>
                                        <h4>{tv.name}</h4>
                                        <span className="rate"><i className="fa-solid fa-star"></i>{tv.vote_average}</span>
                                    </div>
                                    <Link to={`/tv/${tv.id}`} className="button">Details</Link>
                                </div>
                            </div>
                        </div>
                    )}
                </Slider>
            </div>
        </>
    )
}

export default ActorDetails
