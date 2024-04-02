import React, { useEffect, useState, watch } from "react";

import useAxios from "axios-hooks";
import MovieCalendar from "./components/calendar";
import DatePicker from "react-datepicker";
import { API_URL } from "./settings";
import { Skeleton, Button, Divider } from "@mui/material";

import "./home.css";

export default function Home() {
  const currentDate = new Date();
  const [films, setFilms] = useState({});
  const formattedDate = `${currentDate.getFullYear()}-${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

  const [startDate, setStartDate] = useState(formattedDate);

  const SCREENINGS_URL = `${API_URL}/api/film/screenings?startDate=${encodeURIComponent(
    startDate
  )}`;

  const [
    { data: screenings, loading: postLoading, error: postError },
    execute,
  ] = useAxios();

  useEffect(() => {
    if (screenings) {
      // Group screenings by filmId
      const groupedScreenings = screenings.reduce((acc, screening) => {
        const { filmId } = screening.film;
        if (!acc[filmId]) {
          acc[filmId] = [];
        }
        acc[filmId].push(screening);
        return acc;
      }, {});
      setFilms(groupedScreenings);
    }
  }, [screenings]);

  useEffect(() => {
    execute(SCREENINGS_URL);
  }, [SCREENINGS_URL]);

  function getFormattedDate() {
    const currentDate = new Date();
    return `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;
  }

  const handleReload = () => {
    const currentDate = getFormattedDate();
    setStartDate(currentDate);
  };
  return (
    <div className="container-fluid">
      <div className="row justify-content-center p-5 mt-5">
        <div className="col-md-12" key={3}>
          <div className="video-container">
            {" "}
            <video
              className="full-screen-video"
              width="100%"
              playsInline
              autoPlay
              muted
              loop
            >
              <source
                src="https://res.cloudinary.com/dlf5gecrf/video/upload/v1658606508/benjaminkratzin-website/BenjaminKratzin_DirectorReel_220722_Desktop_858p_4Mbs_v01_g2ufkx.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          {(postLoading && !postError) || postError ? (
            <></>
          ) : (
            <>
              {" "}
              <h1 className="text-center">Todays program</h1>
            </>
          )}
          <Divider component="li" style={{ listStyle: "none" }} />
          {(postLoading && !postError) || postError ? (
            <>
              <h1 className="text-center">No movies running on {startDate}</h1>

              <div className="text-center">
                <Button onClick={handleReload} variant="contained">
                  Click to reload program
                </Button>
                <h2 color="grey">Select a different date here</h2>
                <DatePicker
                  className="react-datepicker__day.react-datepicker__day--today"
                  selected={startDate}
                  onChange={(date) => {
                    const formattedDate = date.toISOString().slice(0, 10);
                    setStartDate(formattedDate);
                  }}
                />
              </div>

              <Skeleton
                variant="rectangular"
                style={{ width: "100%", height: "40vh" }}
              />
            </>
          ) : (
            Object.entries(films).map(([filmId, screenings]) => (
              <>
                <MovieCalendar
                  key={filmId}
                  data={screenings}
                  startDateProp={startDate}
                  setStartDateProp={setStartDate}
                  useTrailer={true}
                />
              </>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
