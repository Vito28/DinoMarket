import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from 'react-icons/fa';

const Search = () => {
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const search = searchRef.current;
    if (search) {
      const value = search.value.toLowerCase();
      if (value) {
        navigate(`search/${value}`);
      } else {
        navigate(`search/notFound`);
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="search-input">
      <form id="search" action="#" onSubmit={handleSubmit} role="search">
        <button aria-label="Search" type="submit">
          <FaSearch aria-hidden="true" />
        </button>
        <input
          aria-label="Search input"
          ref={searchRef}
          type="text"
          placeholder="Type Something"
          id="searchText"
          name="searchKeyword"
          onKeyUp={handleSearch}
        />
      </form>
    </div>
  );
};

export default Search;
