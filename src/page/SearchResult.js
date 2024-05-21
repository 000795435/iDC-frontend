import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import APIs from '../configs/API_URL';
import axios from 'axios';
import ResultList from '../component/ResultList';

export default function SearchResult() {
    const { search_text } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [searchList, setSearchList] = useState([]);


    useEffect(() => {

        async function getSearchResult() {
            setIsLoading(true);
            try {
                let results = (await axios({
                    method: 'get',
                    url: APIs.get_movie_by_title + "?movie_title=" + search_text
                })).data.data;

                let new_list = [];
                for (let i = 0; i < Math.min(20, results.length); i++) {
                    let released = results[i].release_date.split(' ');

                    new_list.push({
                        movie_id: results[i].id,
                        description: results[i].overview,
                        movie_title: results[i].original_title,
                        release_date: released[0] + ' ' + released[1] + ' ' + released[2],
                        image_link: APIs.movie_poster + results[i].poster_path
                    });
                }
                setSearchList(new_list);

            } catch (error) {
                alert('Failed to fetch movie information, please try again!');
            }
            setIsLoading(false);
        }

        getSearchResult();
    }, [search_text]);


    return (
        <div>
            {
                isLoading ?
                    <div className='spinner-component'>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    </div> :
                    <ResultList componentTitle={"Search Result"} dataList={searchList} />
            }
        </div>
    )
}
