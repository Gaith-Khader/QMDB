import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

function SingleCatTV() {
    // api create

    
    let [tvs, setTvs] = useState([]);

    let {id} = useParams();

    let getTVs = async () => {
        let { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=c479608cd31492c8dbd2552c8c9960e7&include_adult=false&with_genres=${id}&page=1&page=2`);
        setTvs(data.results);
    }

    useEffect(() => {
        getTVs();
    }, [])


    return (
        <div className='container'>
            <div className='my-5'>
                <div className="row">
                    {tvs.map((tv) =>
                        <div key={tv.id} className="col-md-2 col-lg-2 p-1">
                            <div className="card" id="fullHeight">
                                <img
                                    src={`https://image.tmdb.org/t/p/original${tv.poster_path}`} className="poster" alt={tv.title}
                                    onError={event => {
                                        event.target.src = "https://www.zwatch.org/no-poster.png"
                                        event.onerror = null
                                    }}
                                />
                                <div className="details">
                                    <div className={`d-flex justify-content-center align-items-center flex-column`}>
                                        <h4>{tv.name}</h4>
                                        <span className="rate"><i className="fa-solid fa-star"></i>{tv.vote_average}</span>
                                    </div>
                                    <Link to={`/tv/${tv.id}`} className="button">Details</Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SingleCatTV