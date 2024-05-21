import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom'

import Main from './page/Main';
import MovieInfo from './page/MovieInfo';
import SearchResult from './page/SearchResult';
import SearchBar from './component/SearchBar';

const App = () => {

  return (
    <div className="App">
      <Router>
        <SearchBar />

        <Routes>
          <Route path='/' exact element={<Main />} />
          <Route path='/search_result/:search_text' exact element={<SearchResult />} />
          <Route path='/movie_info/:movie_id' exact element={<MovieInfo />} />
          <Route path='*' element={<Navigate to='/' replace={true} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
