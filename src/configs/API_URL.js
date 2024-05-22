// const base_url = 'http://localhost:7000/';
const base_url = "http://144.34.175.242/api/";

const APIs = {
    default_poster: "https://storage.ubertor.com/cl403/content/image/64507.jpg",
    movie_poster: 'https://www.dvdplanetstore.pk/wp-content/uploads/2024/01',
    get_all_movies: base_url + 'get_all_movies',
    get_movie_by_title: base_url + 'get_movie_by_title', // movie_title
    get_movie_by_genres: base_url + 'get_movie_by_genres', // genres
    get_movie_by_company: base_url + 'get_movie_by_company', // company
    get_movie_by_cast: base_url + 'get_movie_by_cast', // cast
    get_movie_by_keywords: base_url + 'get_movie_by_keywords', // keywords
    get_movie_by_id: base_url + 'get_movie_by_id', // movie_id
    get_newest_movie: base_url + 'get_newest_movie',
    get_most_popular_movie: base_url + 'get_most_popular_movie'
};

export default APIs;