import React, { useState, useEffect } from 'react';
import useAxios from 'axios-hooks';
import './MovieList.css'; 


const sampleMovies = [
    {
      title: "The Shawshank Redemption",
      description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      genre: "Drama",
      ageRating: "R",
      image: "https://m.media-amazon.com/images/M/MV5BMGEzZjdjMGQtZmYzZC00N2I4LThiY2QtNWY5ZmQ3M2ExZmM4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg"
    },
    {
      title: "The Godfather",
      description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
      genre: "Crime",
      ageRating: "R",
      image: "https://m.media-amazon.com/images/M/MV5BMGEzZjdjMGQtZmYzZC00N2I4LThiY2QtNWY5ZmQ3M2ExZmM4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg"
    },
    {
      title: "The Dark Knight",
      description: "When the menace known as The Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      genre: "Action",
      ageRating: "PG-13",
      image: "https://m.media-amazon.com/images/M/MV5BMGEzZjdjMGQtZmYzZC00N2I4LThiY2QtNWY5ZmQ3M2ExZmM4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg"
    },
    {
        title: "The Shawshank Redemption",
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        genre: "Drama",
        ageRating: "R",
        image: "https://m.media-amazon.com/images/M/MV5BMGEzZjdjMGQtZmYzZC00N2I4LThiY2QtNWY5ZmQ3M2ExZmM4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg"
      },
      {
        title: "The Godfather",
        description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        genre: "Crime",
        ageRating: "R",
        image: "https://m.media-amazon.com/images/M/MV5BMGEzZjdjMGQtZmYzZC00N2I4LThiY2QtNWY5ZmQ3M2ExZmM4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg"
      },
      {
        title: "The Dark Knight",
        description: "When the menace known as The Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        genre: "Action",
        ageRating: "PG-13",
        image: "https://m.media-amazon.com/images/M/MV5BMGEzZjdjMGQtZmYzZC00N2I4LThiY2QtNWY5ZmQ3M2ExZmM4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg"
      },
      {
        title: "The Shawshank Redemption",
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        genre: "Drama",
        ageRating: "R",
        image: "https://m.media-amazon.com/images/M/MV5BMGEzZjdjMGQtZmYzZC00N2I4LThiY2QtNWY5ZmQ3M2ExZmM4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg"
      },
      {
        title: "The Godfather",
        description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        genre: "Crime",
        ageRating: "R",
        image: "https://m.media-amazon.com/images/M/MV5BMGEzZjdjMGQtZmYzZC00N2I4LThiY2QtNWY5ZmQ3M2ExZmM4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg"
      },
      {
        title: "The Dark Knight",
        description: "When the menace known as The Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        genre: "Action",
        ageRating: "PG-13",
        image: "https://m.media-amazon.com/images/M/MV5BMGEzZjdjMGQtZmYzZC00N2I4LThiY2QtNWY5ZmQ3M2ExZmM4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg"
      },
      {
          title: "The Shawshank Redemption",
          description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
          genre: "Drama",
          ageRating: "R",
          image: "https://m.media-amazon.com/images/M/MV5BMGEzZjdjMGQtZmYzZC00N2I4LThiY2QtNWY5ZmQ3M2ExZmM4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg"
        },
        {
          title: "The Godfather",
          description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
          genre: "Crime",
          ageRating: "R",
          image: "https://m.media-amazon.com/images/M/MV5BMGEzZjdjMGQtZmYzZC00N2I4LThiY2QtNWY5ZmQ3M2ExZmM4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg"
        },
        {
          title: "The Dark Knight",
          description: "When the menace known as The Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
          genre: "Action",
          ageRating: "PG-13",
          image: "https://m.media-amazon.com/images/M/MV5BMGEzZjdjMGQtZmYzZC00N2I4LThiY2QtNWY5ZmQ3M2ExZmM4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg"
        }
  ];

function MovieList() {
  //const [{ data, loading, error }, refetch] = useAxios(
  //  'https://api.example.com/movies'
  //);
  //if (loading) return <p>Loading...</p>;
  //if (error) return <p>Error fetching movies: {error.message}</p>;

  return (
    <div className='movies-container'>
    <h1>Movies Page</h1>
      <div className="row">
        {sampleMovies.map((movie, index) => (
          <div key={index} className="col-md-2">
            <div className="card mb-3">
              <img src={movie.image} alt={movie.title} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-description">{movie.description}</p>
                <p className="card-text"><small className="text-muted">Genre: {movie.genre}</small></p>
                <p className="card-text"><small className="text-muted">Age Rating: {movie.ageRating}</small></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

}
export default MovieList;
