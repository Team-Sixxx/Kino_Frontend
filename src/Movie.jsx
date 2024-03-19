import React, { useState, useEffect } from 'react';
import { useParams,NavLink } from 'react-router-dom';

function Movie() {
    const { id } = useParams();

    const [movie, setMovie] = useState({
        title: "Mock Movie Title",
        image: "https://via.placeholder.com/150",
        description: "This is a mock movie description.",
        genre: "Action",
        ageRating: "PG-13",
        movieRating: "7.5",
        director: "Mock Director"
    });

  useEffect(() => {
    //fetch(`https://api.example.com/movies/${movieId}`)
    //setMovie(data)

  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <h1>{movie.title}</h1>
        <img src={movie.image} alt={movie.title}/>
        <p >{movie.description}</p>
        <p>Genre: {movie.genre}</p>
        <p >Age Rating: {movie.ageRating}</p>
        <p >Movie Rating: {movie.movieRating}</p>
        <p >Director: {movie.director}</p>
        <NavLink to={`/select/${id}`}>
            <button>Buy Tickets</button>
        </NavLink>
    </div>
  );
}

export default Movie;
