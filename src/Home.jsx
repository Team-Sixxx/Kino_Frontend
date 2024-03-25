import React, { useEffect, useState } from "react";
import { Tooltip, Toast, Popover } from "bootstrap";
import useAxios from "axios-hooks";
import MovieCalendar from "./components/calendar";
import { API_URL } from "./settings";
import { Skeleton } from "@mui/material";

export default function Home() {
  const currentDate = new Date();
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
    execute(SCREENINGS_URL);
  }, [SCREENINGS_URL]);

  return (
    <div className="container-fluid">
      <div className="row justify-content-center p-5 mt-5">
        <div className="col-md-12">
          <div className="video-container">
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
          {postLoading ? (
            <Skeleton variant="rectangular" width={610} height={318} />
          ) : (
            <MovieCalendar
              data={screenings}
              startDateProp={startDate}
              setStartDateProp={setStartDate}
            />
          )}
        </div>
      </div>
    </div>
  );
}
