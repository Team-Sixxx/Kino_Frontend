import React, { useState, useEffect } from "react";
import "./MovieList.css";
import { Slide, Fab } from "@mui/material";
import { NavLink } from "react-router-dom";
import useAxios from "axios-hooks";
import { API_URL } from "../settings";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function MovieList() {
  const [{ data, loading, error }, execute] = useAxios();

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    execute(`${API_URL}/api/films`);
  }, []);

  return (
    <div className="movies-carousel movies-container mt-5 text-center">
      <h1 style={{ color: "white" }}>All running movies</h1>

      <div
        className="carousel-container"
        style={{ display: "flex", flexWrap: "nowrap" }}
      >
        {!loading &&
          data.slice(currentIndex, currentIndex + 5).map((movie, index) => (
            // Only the first 5 slides are shown initially
            <Slide key={index} direction="right" in={index < 5}>
              <div
                className="movie-card bg-light"
                style={{ marginRight: "20px" }}
              >
                <NavLink
                  style={{ textDecoration: "none", color: "black" }}
                  to={"/movie/" + movie.filmId}
                >
                  <div className="movie-image-container">
                    <img
                      src={movie.thumbnail}
                      alt={movie.title}
                      className="movie-image"
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <p className="card-description">{movie.description}</p>
                    <p className="card-text">
                      <small className="text-muted">Genre: {movie.genre}</small>
                    </p>
                    <p className="card-text">
                      <small className="text-muted">
                        Age Rating: {movie.ageRating}
                      </small>
                    </p>
                  </div>
                </NavLink>
              </div>
            </Slide>
          ))}
      </div>
      {!loading &&
        // Show previous button only if currentIndex > 0
        currentIndex > 0 && (
          <Fab
            className="carousel-control prev"
            color="primary"
            aria-label="add"
            onClick={prevSlide}
          >
            <ArrowBackIosNewIcon />
          </Fab>
        )}
      {!loading &&
        // Show next button only if there are more movies to display
        currentIndex + 5 < data.length && (
          <Fab
            className="carousel-control next"
            color="primary"
            aria-label="add"
            onClick={nextSlide}
          >
            <ArrowForwardIosIcon />
          </Fab>
        )}
    </div>
  );
}
export default MovieList;
