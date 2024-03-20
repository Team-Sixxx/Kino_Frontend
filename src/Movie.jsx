import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { Typography, Button, Card, CardContent, Grid } from "@mui/material";
import YouTube from "react-youtube";

function Movie() {
  const { id } = useParams();

  const [movie, setMovie] = useState({
    title: "Mock Movie Title",
    trailer: "U2Qp5pL3ovA",
    description: "This is a mock movie description.",
    genre: "Action",
    ageRating: "PG-13",
    movieRating: "7.5",
    director: "Mock Director",
  });

  useEffect(() => {
    //fetch(`https://api.example.com/movies/${movieId}`)
    //setMovie(data)
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <Card sx={{ maxWidth: 1100, margin: "auto", marginTop: 10 }}>
      <YouTube
        videoId={movie.trailer}
        opts={{
          width: "100%",
          height: 619,
          playerVars: {
            autoplay: 1,
          },
        }}
      />
      <CardContent>
        <Typography variant="h3" gutterBottom textAlign={"center"}>
          {movie.title}
        </Typography>
        <Typography variant="body1" paragraph textAlign={"center"}>
          {movie.description}
        </Typography>
        <Typography variant="body2" gutterBottom textAlign={"center"}>
          Genre: {movie.genre}
        </Typography>
        <Typography variant="body2" gutterBottom textAlign={"center"}>
          Age Rating: {movie.ageRating}
        </Typography>
        <Typography variant="body2" gutterBottom textAlign={"center"}>
          Movie Rating: {movie.movieRating}
        </Typography>
        <Typography variant="body2" gutterBottom textAlign={"center"}>
          Director: {movie.director}
        </Typography>
        <Grid container justifyContent="center">
          <Grid item>
            <NavLink to={`/select/${id}`} style={{ textDecoration: "none" }}>
              <Button variant="contained" sx={{ backgroundColor: "darkred", color: "white" }}>
                Select Seats
              </Button>
            </NavLink>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default Movie;
