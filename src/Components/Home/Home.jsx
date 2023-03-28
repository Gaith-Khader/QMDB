import React from 'react'
import Actors from './Actors'
import BreakPoint from '../Home/BreakPoint'
import Header from '../Header/Header'
import MoviesH from './MoviesH'
import ShowsH from './ShowsH'
import Trending from './Trending'

function Home() {
    return (
    <>
    <Header/>
    <div className='container'>
        <Trending/>
    </div>
    <BreakPoint/>
    <div className="container">
        <MoviesH/>
        <Actors/>
        <ShowsH/>
    </div>
    </>
    )
}

export default Home