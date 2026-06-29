import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FiSearch } from "react-icons/fi";
import PropTypes from "prop-types";

const Search = ({ placeholder = "Cari produk di DinoMarket..." }) => {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { current } = inputRef;
    if (!current) {
      return;
    }

    const value = current.value.trim().toLowerCase();
    navigate(value ? `/search/${value}` : "/search/notFound");
  };

  return (
    <Form className="w-100" role="search" onSubmit={handleSubmit}>
      <InputGroup className="search-box">
        <InputGroup.Text className="bg-white border-end-0 search-icon">
          <FiSearch />
        </InputGroup.Text>
        <Form.Control
          ref={inputRef}
          type="search"
          placeholder={placeholder}
          aria-label="Kolom pencarian produk"
          className="border-start-0"
        />
        <Button type="submit" variant="primary">
          Cari
        </Button>
      </InputGroup>
    </Form>
  );
};

Search.propTypes = {
  placeholder: PropTypes.string,
};

export default Search;
