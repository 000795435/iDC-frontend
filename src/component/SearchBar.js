import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {

    const searchRef = useRef();
    const navigate = useNavigate();

    const handleSearch = async () => {
        let searchInput = searchRef.current.value;

        if (searchInput === '') {
            return alert("Search text can't be blank!");
        }

        searchInput = searchInput.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;');
        searchRef.current.value = "";
        navigate('/search_result/' + searchInput);
    }

    return (
        <div>
            <nav className="navbar navbar-light bg-light justify-content-between Nav-Bar">
                <a className="navbar-brand" href='/'>iDC Movie</a>
                <div class="input-group">
                    <input className="form-control mr-sm-2" type="text" placeholder="Search for a Movie..." ref={searchRef} onKeyDown={(e) => { if (e.key === 'Enter') { handleSearch(); } }} />
                    <button type='button' className="btn btn-outline-success my-2 my-sm-0" onClick={handleSearch}>Search</button>
                </div>
            </nav>
        </div>
    )
}
