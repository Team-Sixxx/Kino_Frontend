import React, { useState } from 'react';
import { Select, AppBar, Toolbar, Typography, Container, Paper, Box, MenuItem, InputLabel, Button } from '@mui/material';


const AdminPage = () => {
  const [selectedValueSeat, setSelectedValueSeat] = useState('');
  const [selectedValueMovie, setSelectedValueMovie] = useState('');
  const [selectedValueEmployee, setSelectedValueEmployee] = useState('');

  const handleChangeSeat = (event) => {
    setSelectedValueSeat(event.target.value);
  };

  const handleChangeMovie = (event) => {
    setSelectedValueMovie(event.target.value);
  };

  const handleChangeEmployee = (event) => {
    setSelectedValueEmployee(event.target.value);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Admin Side</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" style={{ marginTop: '20px' }}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Box mt={4} textAlign="center">
            <Typography variant="h5">Velkommen til admin-siden!</Typography>
          </Box>

          <Box mt={4}>
            <Typography variant="body1">Reddiger status på sæder i de forskellige sale</Typography>
            <InputLabel id="select-label-seat">Vælg sal</InputLabel>
            <Select labelId="select-label-seat" value={selectedValueSeat} onChange={handleChangeSeat}>
              <MenuItem value={1}>Option 1</MenuItem>
              <MenuItem value={2}>Option 2</MenuItem>
              <MenuItem value={3}>Option 3</MenuItem>
            </Select>
            <Button variant="contained" color="primary" style={{ marginLeft: '10px' }}>Reddiger</Button>
          </Box>
          <Box mt={4}>
            <Typography variant="body1">Reddiger status på film</Typography>
            <InputLabel id="select-label-movie">Vælg film</InputLabel>
            <Select labelId="select-label-movie" value={selectedValueMovie} onChange={handleChangeMovie}>
              <MenuItem value={1}>Option 1</MenuItem>
              <MenuItem value={2}>Option 2</MenuItem>
              <MenuItem value={3}>Option 3</MenuItem>
            </Select>
            <Button variant="contained" color="primary" style={{ marginLeft: '10px' }}>Reddiger</Button>
          </Box>
          <Box mt={4}>
            <Typography variant="body1">Reddiger status på medarbejdere</Typography>
            <InputLabel id="select-label-employee">Vælg medarbejder</InputLabel>
            <Select labelId="select-label-employee" value={selectedValueEmployee} onChange={handleChangeEmployee}>
              <MenuItem value={1}>Option 1</MenuItem>
              <MenuItem value={2}>Option 2</MenuItem>
              <MenuItem value={3}>Option 3</MenuItem>
            </Select>
            <Button variant="contained" color="primary" style={{ marginLeft: '10px' }}>Reddiger</Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}

export default AdminPage;
