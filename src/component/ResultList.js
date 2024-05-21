import React from 'react';
import APIs from '../configs/API_URL';
import { useNavigate } from 'react-router-dom';

export default function ResultList({ componentTitle, dataList }) {
    const navigate = useNavigate();

    const redirectToInto = (movie_id) => {
        navigate('/movie_info/' + movie_id);
    }

    const handleBrokeImage = (e) => {
        e.target.src = APIs.default_poster
    }

    return (
        <div className='result-list'>
            <h5>{componentTitle}</h5>
            <br />
            {
                dataList.length === 0 ? <h6>Sorry, No data found</h6> :
                    <div className='list-component'>
                        {
                            dataList.map((item, index) => (
                                <div className="card card-component" key={index}>
                                    <div className='card-img-component'>
                                        <img className="card-img-top image" src={item.image_link} onError={handleBrokeImage} alt="Movie Image" />
                                        <div className="middle">
                                            <p>{item.description}</p>
                                        </div>
                                    </div>

                                    <div className="card-body">
                                        <h5 className="card-title">{item.movie_title}</h5>
                                        <h6 className="card-title">{item.release_date}</h6>
                                        <div className='card-button'>
                                            <button onClick={() => { redirectToInto(item.movie_id) }} className="btn btn-primary">More Info</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
            }
            <hr />
        </div>
    )
}

/*
movie_id
description
movie_title
image_link
release_date

<div className='card-text-component'>
                                    <p className="card-text">{item.description}</p>
                                </div>
*/
