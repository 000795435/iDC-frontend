import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import APIs from '../configs/API_URL';
import axios from 'axios';
import Information from '../component/Information';
import ResultList from '../component/ResultList';

export default function MovieInfo() {
    const { movie_id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [movieData, setMovieData] = useState(null);
    const [recommendationList, setRecommendationList] = useState([]);

    useEffect(() => {
        async function getSubSearchResult(url, overview, current_title) {
            try {

                let results = (await axios({
                    method: 'get',
                    url: url
                })).data.data;

                let new_list = [];
                for (let i = 0; i < Math.min(4, results.length); i++) {
                    if ((results[i].original_title)[0] === '?') {
                        continue;
                    }

                    if (results[i].original_title === current_title) {
                        continue;
                    }

                    new_list.push({
                        movie_id: results[i].id,
                        description: results[i].overview,
                        movie_title: results[i].original_title,
                        release_date: overview,
                        image_link: APIs.movie_poster + results[i].poster_path
                    });
                }

                return (new_list);
            } catch (e) {
                console.log("Fail to get sub search list");
                return [];
            }
        }

        async function getRecommendationList(movie_data) {
            let genres = movie_data.genres;
            let production_companies = movie_data.production_companies;
            let cast = movie_data.cast;
            let keywords = movie_data.keywords;

            /*
            let genres_all_list = [];
            for (let i = 0; i < genres.length; i++) {
                let data = await getSubSearchResult(APIs.get_movie_by_genres + "?genres=" + genres[i], `Genres: ${genres[i]}`, movie_data.original_title);
                genres_all_list = [...genres_all_list, ...data];
            }
            */

            let production_companies_all_list = [];
            for (let i = 0; i < production_companies.length; i++) {
                let data = await getSubSearchResult(APIs.get_movie_by_company + "?company=" + production_companies[i], `Company: ${production_companies[i]}`, movie_data.original_title);
                production_companies_all_list = [...production_companies_all_list, ...data];
            }

            /*
            let cast_all_list = [];
            for (let i = 0; i < cast.length; i++) {
                let data = await getSubSearchResult(APIs.get_movie_by_cast + "?cast=" + cast[i], `Cast: ${cast[i]}`, movie_data.original_title);
                cast_all_list = [...cast_all_list, ...data];
            }
            */

            let keywords_all_list = [];
            for (let i = 0; i < keywords.length; i++) {
                let data = await getSubSearchResult(APIs.get_movie_by_keywords + "?keywords=" + keywords[i], `Keyword: ${keywords[i]}`, movie_data.original_title);
                keywords_all_list = [...keywords_all_list, ...data];
            }


            // setRecommendationList([...genres_all_list, ...production_companies_all_list, ...cast_all_list, ...keywords_all_list]);
            setRecommendationList([...keywords_all_list, ...production_companies_all_list]);
        }


        async function getMovieById() {
            setRecommendationList([]);
            setIsLoading(true);
            try {
                let results = (await axios({
                    method: 'get',
                    url: APIs.get_movie_by_id + "?movie_id=" + movie_id
                })).data.data;

                if (results.length !== 0) {
                    setMovieData(results[0]);
                    await getRecommendationList(results[0]);
                }
            } catch (error) {
                console.log(error);
                alert('Failed to fetch movie information, please try again!');
            }
            setIsLoading(false);
        }

        getMovieById();
    }, [movie_id]);

    return (
        <div>
            {
                isLoading ?
                    <div className='spinner-component'>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    </div> : <Information movieData={movieData} />
            }
            {
                recommendationList.length !== 0 ? <ResultList componentTitle={"Recommendation"} dataList={recommendationList} /> : null
            }
        </div>
    )
}
