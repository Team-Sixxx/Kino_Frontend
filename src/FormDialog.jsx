import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import PropTypes from "prop-types";

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export default function FormDialog({ userData, onUpdateUserData }) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState(userData);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    onUpdateUserData(formData); // Opdaterer brugerdata med formData
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value }); // Opdaterer formData med de ændrede værdier
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit User
      </Button>
      <Dialog open={open} onClose={handleClose} PaperComponent={PaperComponent}>
        <DialogTitle id="draggable-dialog-title">Edit user information</DialogTitle>
        <DialogContent>
          <DialogContentText>To subscribe to this website, please enter your email address here. We will send updates occasionally.</DialogContentText>
          <TextField autoFocus required margin="dense" id="email" name="email" label="Email Address" type="email" fullWidth variant="standard" value={formData.email} onChange={handleChange} />
          <TextField autoFocus required margin="dense" id="name" name="name" label="Name" type="text" fullWidth variant="standard" value={formData.name} onChange={handleChange} />
          <TextField autoFocus required margin="dense" id="password" name="password" label="Password" type="password" fullWidth variant="standard" value={formData.password} onChange={handleChange} />
          <TextField autoFocus required margin="dense" id="username" name="username" label="Username" type="text" fullWidth variant="standard" value={formData.username} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

FormDialog.propTypes = {
  userData: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  onUpdateUserData: PropTypes.func.isRequired,
};
