import ExploreMovies from './ExploreMovies'
import MoviesCategories from './MoviesCategories'
import Popular from './Popular'
import TopRated from './TopRated'



function MoviesPage() {
    return (
        <>
            <div className="container">
                <MoviesCategories />
                <ExploreMovies />
                <TopRated />
                <Popular />
            </div>
        </>
    )
}

export default MoviesPage