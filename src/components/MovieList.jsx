import React, { useState, useEffect } from "react";
import "./MovieList.css";
import { NavLink } from "react-router-dom";
import useAxios from "axios-hooks";
import { API_URL } from "../settings";

function MovieList() {
  const [{ data, loading, error }, execute] = useAxios();

  useEffect(() => {
    execute(`${API_URL}/api/films`);
  }, []);
  console.log(data);

  return (
    <div className="movies-container">
      <h1 style={{ color: "white", margin: "auto" }}>Movies Page</h1>
      <div className="row">
        {loading ? (
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <>
            {data.map((movie, index) => (
              <div key={index} className="col-md-2">
                <NavLink style={{ textDecoration: "none" }} to={"/movie/" + movie.filmId}>
                  <p>{movie.id}</p>
                  <div className="card mb-3">
                    <div className="movie-image-container">
                      <img src={movie.image} alt={movie.title} className="movie-image" />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{movie.title}</h5>
                      <p className="card-description">{movie.description}</p>
                      <p className="card-text">
                        <small className="text-muted">Genre: {movie.genre}</small>
                      </p>
                      <p className="card-text">
                        <small className="text-muted">Age Rating: {movie.ageRating}</small>
                      </p>
                    </div>
                  </div>
                </NavLink>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
export default MovieList;
