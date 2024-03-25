import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Row, Col } from "react-bootstrap";
import { Box, Button, Divider, Card, Fab } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import moment from "moment";

import "./calendar.css";

const MovieCalendar = ({ data, startDateProp, setStartDateProp }) => {
  const [startDate, setStartDate] = useState(new Date());

  const renderColumns = () => {
    const columns = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + i);

      const itemsForColumn = data.filter((item) => {
        const itemDate = new Date(item.startTime);
        console.log(item);
        return (
          itemDate.getDate() === currentDate.getDate() &&
          itemDate.getMonth() === currentDate.getMonth() &&
          itemDate.getFullYear() === currentDate.getFullYear()
        );
      });

      columns.push(
        <Col className="d-inline p-2" key={currentDate.toDateString()}>
          <Divider orientation="vertical" variant="middle" flexItem />
          <h4>{currentDate.toDateString()}</h4>

          <ul>
            {itemsForColumn.map((item, index) => (
              <div key={index} className="p-0 m-0">
                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  color="red"
                />
                <Box
                  className="shadow p-3 rounded mb-0 mt-0"
                  my={4}
                  display="flex"
                  alignItems="center"
                  gap={0}
                  p={0}
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: 1,
                    bgcolor: "#00D100",
                    "&:hover": {
                      bgcolor: "green.dark",
                    },
                  }}
                >
                  <Row>
                    <h6>Bio{item.theater.theaterId}</h6>
                    <h6>{moment(item.startTime).format("LT")}</h6>
                    <h7> 3D</h7>
                  </Row>
                </Box>
              </div>
            ))}
          </ul>
        </Col>
      );
    }

    return columns;
  };

  return (
    <Container className="">
      <Row>
        <h1>{data[0].film.title}</h1>
        <Col>
          <DatePicker
            className="react-datepicker__day.react-datepicker__day--today"
            selected={startDate}
            onChange={(date) => {
              const formattedDate = date.toISOString().slice(0, 10); // Format date as yyyy-mm-dd
              setStartDate(formattedDate); // Update local state
              setStartDateProp(formattedDate); // Update parent state
            }}
          />
        </Col>
        <Col className="col-lg-10">
          <Fab
            className="m-2"
            color="primary"
            aria-label="add"
            onClick={() => {
              const newDate = new Date(startDate);
              newDate.setDate(newDate.getDate() - 1);
              setStartDate(newDate);
            }}
          >
            <ArrowBackIosNewIcon />
          </Fab>
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => {
              const newDate = new Date(startDate);
              newDate.setDate(newDate.getDate() + 1);
              setStartDate(newDate);
            }}
          >
            <ArrowForwardIosIcon />
          </Fab>
        </Col>
      </Row>
      <Row>{renderColumns()}</Row>
    </Container>
  );
};

export default MovieCalendar;
