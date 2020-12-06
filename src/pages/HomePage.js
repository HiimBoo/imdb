import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import SearchForm from "../components/SearchForm";
import PaginationBar from "../components/PaginationBar";
import { useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import api from "../apiService";
import { faStar } from "@fortawesome/free-solid-svg-icons";

// import { toast } from "react-toastify";

const API_KEY = process.env.REACT_APP_BACKEND_APIKEY;
// const language = `en-US`;

const HomePage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [enter, setEnter] = useState(false);

  const history = useHistory();

  const [loading, setLoading] = useState(false);
  // const [errorMesg, setErrorMesg] = useState("");
  const [movies, setMovies] = useState([]);

  const baseUrlImage = `https://image.tmdb.org/t/p/w500`;

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnter(searchInput);
  };

  const handleClickOnMovie = (id) => {
    history.push(`/movies/${id}`);
  };

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        let url = `movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNum}`;
        if (enter) {
          let temp = `search/movie` + url.slice(13) + `&query=${enter}`;
          url = temp;
        } else {
          url = `movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNum}`;
        }
        const res = await api.get(url);
        console.log("He He data về", res.data.results);
        setMovies(res.data.results);
        setTotalPage(res.data.total_pages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovie();
    setLoading(false);
  }, [pageNum, enter]);

  // const cutDate = (date) => {
  //   let result = date.split("-");
  //   // console.log(result);
  //   let temp = result[2];
  //   result[2] = result[0];
  //   result[0] = temp;
  //   const final = result.join("-");
  //   // console.log(final);
  //   return final;
  // };

  const listMovies = (movies) => {
    return (
      <ul className="list-unstyled d-flex flex-wrap ">
        {movies &&
          movies.map((movie) => {
            return (
              <li
                key={movie.id}
                className="mr-5"
                onClick={() => handleClickOnMovie(movie.id)}
              >
                <Card border="primary" className="card_container">
                  <Card.Img
                    variant="top"
                    src={`${baseUrlImage}${movie.poster_path}`}
                    style={{ width: "18em", height: "25.2em" }}
                    className="card_image"
                  />

                  <Card.Text className="text-danger rate_container">
                    <FontAwesomeIcon icon={faStar} className="rate_icon" />
                    {movie.vote_average}
                  </Card.Text>
                </Card>
                <br />
              </li>
            );
          })}
      </ul>
    );
  };

  return (
    // <Container>
    //   <Row className="justify-content-center">
    //     <Col md={6}>
    //       <SearchForm
    //         loading={loading}
    //         searchInput={searchInput}
    //         handleSearchChange={handleSearchInputChange}
    //         handleSubmit={handleSubmit}
    //       />
    //       <hr />
    //       <PaginationBar
    //         setPageNum={setPageNum}
    //         pageNum={pageNum}
    //         totalPageNum={totalPage}
    //       />
    //       {errorMesg && <Alert variant="danger">{errorMesg}</Alert>}
    //     </Col>
    //   </Row>
    //   <Row>{loading ? <div>Loading...</div> : listMovies(movies)}</Row>
    // </Container>
    <div className="wrapper">
      <div className="page-text">Currently trending movies.</div>
      {/* {isError && <div>An error occured, please try again.</div>} */}
      {/* {isLoading ? (
        <Loader />
      ) : ( */}
      <>
        <Row className="justify-content-center">
          <Col md={6}>
            <SearchForm
              loading={loading}
              searchInput={searchInput}
              handleSearchChange={handleSearchInputChange}
              handleSubmit={handleSubmit}
            />
          </Col>
        </Row>
        {listMovies(movies)}

        <Row className="justify-content-center">
          <Col md={3}>
            <PaginationBar
              setPageNum={setPageNum}
              pageNum={pageNum}
              totalPageNum={totalPage}
            />
          </Col>
        </Row>
      </>
      {/* )} */}
    </div>
  );
};

export default HomePage;
