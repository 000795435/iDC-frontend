import React from 'react';
import APIs from '../configs/API_URL';

export default function Information({ movieData }) {

    const handleBrokeImage = (e) => {
        e.target.src = APIs.default_poster
    }

    return (
        <div>
            {
                movieData === null ? <h5>Sorry, no movie found</h5> :
                    <div className='information-component'>
                        <div className="row">
                            <div className="col-sm">
                                <img className='information-image' src={APIs.movie_poster + movieData.poster_path} onError={handleBrokeImage} alt="Movie Image" />
                            </div>
                            <div className="col-sm">

                                <h5>Title: {movieData.original_title}</h5>
                                <h5>Overview: {movieData.overview}</h5>
                                <h5>Release Date: {movieData.release_date}</h5>
                                <h5>Run Time: {Math.floor(parseInt(movieData.runtime) / 60)}h{parseInt(movieData.runtime) % 60}m</h5>
                                <h5>Genres: {movieData.genres.map(function (item) {
                                    return item;
                                }).join(", ")}</h5>
                                <h5>Production Companies: {movieData.production_companies.map(function (item) {
                                    return item;
                                }).join(", ")}</h5>
                                <h5>Cast: {movieData.cast.map(function (item) {
                                    return item;
                                }).join(", ")}</h5>
                                <h5>Keywords: {movieData.keywords.map(function (item) {
                                    return item;
                                }).join(", ")}</h5>


                            </div>
                        </div>



                    </div>
            }
            <hr />
        </div>
    )
}
