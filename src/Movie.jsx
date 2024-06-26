import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { Typography, Button, Card, CardContent, Grid } from "@mui/material";
import YouTube from "react-youtube";
import useAxios from "axios-hooks";
import { API_URL } from "./settings";
import createPalette from "@mui/material/styles/createPalette";

function Movie() {
  const { id } = useParams();

  const [{ data, loading, error }, execute] = useAxios();

  useEffect(() => {
    const token = localStorage.getItem("token");
    execute(`${API_URL}/api/screenings/${id}`);
  }, []);

  if (data !== undefined) {
    console.log(data, "data");
    return (
      <div>
        {loading ? (
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <>
            <Card sx={{ maxWidth: 1100, margin: "auto", marginTop: 10 }}>
              <YouTube
                videoId={
                  data[0].film.movieTrailer.split("https://www.youtube.com/watch?v=")[1]
                }
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
                  {data[0].film.title}
                </Typography>
                <Typography variant="body1" paragraph textAlign={"center"}>
                  {data[0].film.description}
                </Typography>
                <Typography variant="body2" gutterBottom textAlign={"center"}>
                  Genre: {data[0].film.genre}
                </Typography>
                <Typography variant="body2" gutterBottom textAlign={"center"}>
                  Age Rating: {data[0].film.ageRating}
                </Typography>
                <Typography variant="body2" gutterBottom textAlign={"center"}>
                  Movie Rating: {data[0].film.movieRating}
                </Typography>
                <Typography variant="body2" gutterBottom textAlign={"center"}>
                  Director: {data[0].film.director}
                </Typography>
                <Grid container justifyContent="center">
                  <Grid item>
                    <NavLink
                      to={`/select/${id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: "darkred", color: "white" }}
                      >
                        Select Seats
                      </Button>
                    </NavLink>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    );
  }
}

export default Movie;
