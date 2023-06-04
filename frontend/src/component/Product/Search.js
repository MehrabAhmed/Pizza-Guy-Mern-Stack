import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Search.css";
import MetaData from "../layout/MetaData"

const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    navigate(keyword.trim() ? `/products/${keyword}` : "/products");
  };

  return (
    <Fragment>
      <MetaData title="The Pizza Guy" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Find the best flavour ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search