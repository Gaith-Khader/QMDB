import React from 'react'
import Popular from './Popular'
import TopRated from './TopRated'
import ShowsCategories from './ShowsCategories'
import ExploreShows from './ExploerShows'

function ShowsPage() {
    return (
    <>
        <div className="container">
            <ShowsCategories/>
            <ExploreShows/>
            <TopRated/>
            <Popular/>
        </div>
    </>
    )
}

export default ShowsPage