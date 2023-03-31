import React, { useState } from "react";
import css from "components/Searchbar/Searchbar.module.css";
import PropTypes from "prop-types";

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState("");

  const queryHandle = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    if (query.trim() === "") {
      alert("Enter search query");
      return;
    }

    onSubmit(query);

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={onFormSubmit}>
        <button type="submit" className={css["search-button"]}>
          <span className={css["button-label"]}>Search</span>
        </button>

        <input
          className={css.input}
          type="text"
          onChange={queryHandle}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
