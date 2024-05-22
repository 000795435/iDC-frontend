import React, { useEffect, useState } from 'react';
import axios from 'axios';
import APIs from '../configs/API_URL';
import ResultList from '../component/ResultList';

export default function Main() {
    const [isLoading, setIsLoading] = useState(false);
    const [newMovies, setNewMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);

    useEffect(() => {
        async function getSubResult(url) {
            try {

                let results = (await axios({
                    method: 'get',
                    url: url
                })).data.data;

                let new_list = [];
                for (let i = 0; i < results.length; i++) {
                    let released = results[i].release_date.split(' ');

                    new_list.push({
                        movie_id: results[i].id,
                        description: results[i].overview,
                        movie_title: results[i].original_title,
                        release_date: released[0] + ' ' + released[1] + ' ' + released[2],
                        image_link: APIs.movie_poster + results[i].poster_path
                    });
                }

                return (new_list);
            } catch (e) {
                console.log("Fail to get sub search list");
                return [];
            }
        }

        async function popUp() {
            setIsLoading(true);
            try {
                let new_movies = await getSubResult(APIs.get_newest_movie);
                setNewMovies(new_movies);

                let popular_movies = await getSubResult(APIs.get_most_popular_movie);
                setPopularMovies(popular_movies);
            } catch (e) {
                console.log(e);
                alert('Failed to fetch movie information, please try again!');
            }
            setIsLoading(false);
        }

        popUp();
    }, []);

    return (
        <div>
            {
                isLoading ?
                    <div className='spinner-component'>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    </div> :
                    <div>
                        <div className='container-fluid main-page'>
                            <h1>Welcome to Movie Recommendation </h1>
                            <h1>Please Search any movie you want  &#128516;</h1>
                        </div>
                        <ResultList componentTitle={"Newest Movies &#128640;"} dataList={newMovies} />
                        <ResultList componentTitle={"Most Popular Movies &#128293;"} dataList={popularMovies} />
                    </div>
            }
        </div>
    )
}
