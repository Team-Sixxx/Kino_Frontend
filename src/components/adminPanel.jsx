import { useAuth } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useAxios from "axios-hooks";
import { API_URL } from "../settings";

import {
  Snackbar,
  SnackbarContent,
  TextField,
  Checkbox,
  Button,
  Grid,
  InputLabel,
} from "@mui/material";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function adminPanel() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const [value, setValue] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    ageRating: 0,
    duration: 0,
    startTime: "",
    endDate: "",
    movieTrailer: "",
    thumbnail: "",
    extraScreenings: false,
    releaseDate: "",
  });

  const [theatherForm, setTheatherForm] = useState({
    numberOfRows: 0,
    seatsPerRow: 0,
    name: "",
  });

  const [screeningForm, setScreeningForm] = useState({
    startTime: 0,
    endTime: 0,
    filmId: "",
    theaterId: "",
  });

  const handleScreeningFormChange = (event) => {
    const { name, value } = event.target;
    // Check if the field is startTime or endTime
    if (name === "startTime" || name === "endTime") {
      // Convert value to the desired format with seconds included
      const formattedValue = new Date(value).toISOString().slice(0, 19);
      setScreeningForm((prevForm) => ({
        ...prevForm,
        [name]: formattedValue,
      }));
    } else {
      setScreeningForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTheaterFormChange = (event) => {
    const { name, value, type, checked } = event.target;
    setTheatherForm((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const { token } = useAuth();

  const [{ data, loading, error }, executePost] = useAxios(
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // Include the Bearer token in the Authorization header
      },
    },
    { manual: true }
  );

  const handleFormSubmit = (event) => {
    event.preventDefault();
    executePost({
      url: `${API_URL}/api/films`,
      data: formData,
    }).then(() => {
      setSnackbarMessage("Film created successfully!");
      setSnackbarOpen(true);
    });
  };

  const handleTheaterFormSubmit = (event) => {
    event.preventDefault();
    executePost({
      url: `${API_URL}/api/theater`,
      data: theatherForm,
    }).then(() => {
      setSnackbarMessage("Film created successfully!");
      setSnackbarOpen(true);
    });
  };

  const handleScreeningFormSubmit = (event) => {
    event.preventDefault();
    const formatDate = (dateTimeString) => {
      return new Date(dateTimeString).toISOString().slice(0, -5) + "Z";
    };

    const requestData = {
      startTime: formatDate(screeningForm.startTime),
      endTime: formatDate(screeningForm.endTime),
      filmId: screeningForm.filmId,
      theaterId: screeningForm.theaterId,
    };
    executePost({
      url: `${API_URL}/api/screeningsUsingId`,
      data: requestData,
    }).then(() => {
      setSnackbarMessage("Film created successfully!");
      setSnackbarOpen(true);
    });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        background: "white",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Shadow effect
      }}
    >
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <SnackbarContent message={snackbarMessage} />
      </Snackbar>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Create Film" />
          <Tab label="Create Cinema Room" />
          <Tab label="Create Screening" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Genre"
                name="genre"
                value={formData.genre}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Age Rating"
                type="number"
                name="ageRating"
                value={formData.ageRating}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Duration"
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel htmlFor="startTime">Start Time</InputLabel>
              <TextField
                fullWidth
                type="datetime-local"
                name="startTime"
                value={formData.startTime}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel htmlFor="startTime">End Date</InputLabel>
              <TextField
                fullWidth
                type="datetime-local"
                name="endDate"
                value={formData.endDate}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Movie Trailer URL"
                type="url"
                name="movieTrailer"
                value={formData.movieTrailer}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Thumbnail URL"
                type="url"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Checkbox
                name="extraScreenings"
                checked={formData.extraScreenings}
                onChange={handleFormChange}
                color="primary"
              />
              <label>Extra Screenings</label>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel htmlFor="releaseDate">Release Date</InputLabel>
              <TextField
                fullWidth
                type="datetime-local"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleFormChange}
                required
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} className="mt-5">
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </form>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <form onSubmit={handleTheaterFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} className="mt-5">
              <TextField
                fullWidth
                label="Number of Rows"
                type="number"
                name="numberOfRows"
                value={theatherForm.duration}
                onChange={handleTheaterFormChange}
                placeholder="Number of Rows"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} className="mt-5">
              <TextField
                fullWidth
                label="Seats Per Row"
                type="number"
                name="seatsPerRow"
                value={theatherForm.duration}
                onChange={handleTheaterFormChange}
                placeholder="Seats Per Row"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} className="mt-5">
              <TextField
                fullWidth
                label="Cinema Room Name"
                name="name"
                value={theatherForm.name}
                onChange={handleTheaterFormChange}
                placeholder="Cinema Room Name"
                required
              />
            </Grid>
          </Grid>
          <Button
            className="mt-5"
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </form>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <form onSubmit={handleScreeningFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} className="mt-5">
              <TextField
                fullWidth
                label="Start Time"
                type="datetime-local"
                name="startTime"
                value={screeningForm.startTime}
                onChange={handleScreeningFormChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} className="mt-5">
              <TextField
                fullWidth
                label="End Time"
                type="datetime-local"
                name="endTime"
                value={screeningForm.endTime}
                onChange={handleScreeningFormChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} className="mt-5">
              <TextField
                fullWidth
                label="Film ID"
                type="number"
                name="filmId"
                value={screeningForm.filmId}
                onChange={handleScreeningFormChange}
                placeholder="Film ID"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6} className="mt-5">
              <TextField
                fullWidth
                label="Theater ID"
                type="number"
                name="theaterId"
                value={screeningForm.theaterId}
                onChange={handleScreeningFormChange}
                placeholder="Theater ID"
                required
              />
            </Grid>
          </Grid>
          <Button
            className="mt-5"
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </form>
      </CustomTabPanel>
    </Box>
  );
}
