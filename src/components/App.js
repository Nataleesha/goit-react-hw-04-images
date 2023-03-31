import React, { useState, useEffect } from "react";
import Searchbar from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import Modal from "./Modal/Modal";
const URL = "https://pixabay.com/api/";
const API_KEY = "33519998-d8f719b1763760ac30c0941da";

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("idle");
  const [url, setUrl] = useState(null);
  const [tags, setTags] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }
    fetch(
      `${URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.hits.length > 0) {
          setResults((prevResults) => [...prevResults, ...filterData(data)]);
          setStatus("idle");
        } else {
          setStatus("idle");
          alert("No more results");
          return;
        }
      })
      .catch((error) => console.log(error));
  }, [query, page]);

  const submitHandle = (querySubmit) => {
    if (querySubmit.trim() === query) {
      return;
    }
    setQuery(querySubmit);
    setResults([]);
    setPage(1);
    setStatus("pending");
  };

  const onLoadMoreHandle = () => {
    setPage((page) => page + 1);
    setStatus("pending");
  };

  const filterData = (data) => {
    return data.hits.map((hit) => {
      return {
        id: hit.id,
        webformatURL: hit.webformatURL,
        tags: hit.tags,
        largeImageURL: hit.largeImageURL,
      };
    });
  };

  const openModal = ({ bigImg, alt }) => {
    setUrl(bigImg);
    setTags(alt);
  };

  const closeModal = () => {
    setUrl(null);
    setTags(null);
  };

  return (
    <div className="app">
      <Searchbar onSubmit={submitHandle} />
      {results.length > 0 && (
        <ImageGallery gallery={results} onClick={openModal} />
      )}
      {status === "pending" && <Loader />}
      {results.length > 0 && <Button onLoadMore={onLoadMoreHandle} />}
      {url && <Modal src={{ url, tags }} onClose={closeModal} />}
    </div>
  );
}
