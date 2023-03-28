import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
function Actors() {
// ---------------------- react-slick settings -------------------------------------------------------------
    var settings = {
        dots: false,
        infinite: true,
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
                    slidesToShow: 3,
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


    let [actors, setActors] = useState([]);
    
    let getActors = async () => {
        let { data } = await axios.get("https://api.themoviedb.org/3/trending/person/week?api_key=c479608cd31492c8dbd2552c8c9960e7");
        setActors(data.results);
    }

    useEffect(() => {
        getActors();
    }, [])

    return (
        <>
            <div className='my-5'>
                <h3 className="title">Actors</h3>
                <div className="row">
                    <Slider {...settings}>
                        {actors.map((actor) =>
                            <div key={actor.id} className='col-md-3 p-1'>
                                <Link to={`/person/${actor.id}`} >
                                    <div className="cast-card">
                                        <img
                                            src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`} className="cast-photo" alt={actor.name}
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
            </div>
        </>
    )
}




export default Actors