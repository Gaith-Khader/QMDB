import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function MoviesCategories() {

    let [cats, setCats] = useState([]);

    let getMovies = async () => {
        let { data } = await axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=c479608cd31492c8dbd2552c8c9960e7");
        setCats(data.genres);
    }

    useEffect(() => {
        getMovies();
    }, [])

    return (
    <>
    <h3 className="catTitle mt-5 mb-3">All Categories</h3>
    <div className="row">
        {cats.map((cat)=>
        <div key={cat.id} className="cat col-6 col-md-3 col-lg-2">
            <div className="catNames">
                <Link to={`/list/movie/${cat.id}`} className="catName text-dark">{cat.name}</Link>
            </div>
        </div>
        )}
    </div>
    </>
    )
}


export default MoviesCategories