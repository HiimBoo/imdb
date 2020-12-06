import { faStar, faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import LeftLayout from "../layout/LeftLayout";
import moment from "moment";
import Skeleton from "@yisheng90/react-loading";

import api from "../apiService";

const API_KEY = process.env.REACT_APP_BACKEND_APIKEY;
const language = `en-US`;

const MovieDetailPage = () => {
  const params = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const baseUrlImage = `https://image.tmdb.org/t/p/w500`;
  //base video key

  //show video
  const baseUrlTrailer = `https://www.youtube.com/embed/`;

  const handleTrailer = () => {
    setShowTrailer(true);
  };
  const convertRuntime = (num) => {
    let hours = num / 60;
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    return rhours + "h " + rminutes + "m";
  };
  // fetch movie data
  useEffect(() => {
    setIsLoading(true);
    const fetchMovie = async () => {
      try {
        const res = await api.get(
          `movie/${params.id}?api_key=${API_KEY}&language=${language}`
        );
        setMovie(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovie();
    setIsLoading(false);
  }, [params]);

  // fetch trailer data
  useEffect(() => {
    const fetchTrailer = async () => {
      setIsLoading(true);
      try {
        const res = await api.get(
          `movie/${params.id}/videos?api_key=${API_KEY}&language=${language}`
        );
        setTrailer(res.data.results[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTrailer();
    setIsLoading(false);
  }, [params]);

  // const movieDetail = (movie, trailer) => {
  //   return (
  //     <Container>
  //       <Row>
  //         <Col>
  //           {/* <img src={`${baseUrlImage}${movie?.backdrop_path}`} alt="img" /> */}
  //         </Col>
  //         <Col>
  //           <div>
  //             <a href={`${baseUrlTrailer}${trailer?.key}`}>Trailer</a>
  //           </div>

  //           {/* {condition}
  //           <iframe src=""></iframe> */}
  //           {trailer ? (
  //             <iframe
  //               title="trailer"
  //               width="420"
  //               height="345"
  //               src={`${baseUrlTrailer}${trailer?.key}`}
  //             ></iframe>
  //           ) : (
  //             `This movie doesn't have any trailer`
  //           )}
  //         </Col>
  //       </Row>
  //     </Container>
  //   );
  // };
  return (
    // <Container>
    //   <Row style={{ background_image: `url(${movie?.backdrop_path})` }}>
    //     <h1>{movie?.title}</h1>
    //   </Row>
    //   <Row>{movie && movieDetail(movie, trailer)}</Row>
    // </Container>
    <>
      {isLoading ? (
        <Skeleton />
      ) : (
        <LeftLayout backdropImage={`${baseUrlImage}${movie?.backdrop_path}`}>
          {movie ? (
            <div className="center-container">
              <div className="header">
                <h1>{movie.title}</h1>
                {movie.tagline && (
                  <div className="tagline">{movie.tagline}</div>
                )}
                <h2>
                  {(movie ? movie.genres.map((item) => item.name) : null).join(
                    ", "
                  )}
                </h2>
                <div style={{ display: "flex", marginTop: ".35em" }}>
                  {movie.runtime !== 0 && (
                    <>
                      <h2>
                        <FontAwesomeIcon
                          icon={faStopwatch}
                          className="run_time"
                        />
                        {movie ? convertRuntime(movie.runtime) : null}
                      </h2>
                    </>
                  )}
                  {movie.vote_average !== 0 && (
                    <>
                      <h2 style={{ color: "gold", marginLeft: ".5em" }}>
                        <FontAwesomeIcon icon={faStar} className="rate_icon" />
                        {movie.vote_average}
                      </h2>
                    </>
                  )}
                </div>
              </div>
              <div className="movie-plot">
                <h1>Overview</h1>
                <p>{movie.overview}</p>
              </div>

              <div className="bottom-container">
                <div className="detail-container">
                  <div className="detail-title">Revenue:</div>
                  {movie.revenue === 0 ? (
                    <div className="text">Not Available</div>
                  ) : (
                    <div className="text">
                      {" "}
                      {"$ " + movie.revenue.toLocaleString()}
                    </div>
                  )}
                </div>
                <div className="detail-container">
                  <div className="detail-title">Budget:</div>
                  {movie.budget === 0 ? (
                    <div className="text">Not Available</div>
                  ) : (
                    <div className="text">
                      {" "}
                      {"$ " + movie.budget.toLocaleString()}
                    </div>
                  )}
                </div>
                <div className="detail-container">
                  <div className="detail-title">Release Date:</div>
                  <div className="text">
                    {(movie
                      ? moment(movie.release_date, "YYYY-MM-DD")
                      : null
                    ).format("LL")}
                  </div>
                </div>
              </div>
              <div className="button-container mt-2">
                <Button onClick={() => handleTrailer()}>Trailer</Button>
              </div>
              {showTrailer ? (
                trailer ? (
                  <iframe
                    title="trailer"
                    width="600"
                    height="400"
                    src={`${baseUrlTrailer}${trailer?.key}`}
                    className="iframe"
                  ></iframe>
                ) : (
                  `This movie doesn't have any trailer`
                )
              ) : null}
            </div>
          ) : null}
        </LeftLayout>
      )}
    </>
  );
};

export default MovieDetailPage;
