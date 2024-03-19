import React, { useState } from "react";
import PropTypes from "prop-types"; // Importer PropTypes
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const FormDialog = ({ initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <React.Fragment>
      <DialogTitle>Edit User Information</DialogTitle>
      <DialogContent>
        <DialogContentText>You can edit your information here.</DialogContentText>
        <form onSubmit={handleSubmit}>
          <TextField autoFocus margin="dense" id="email" name="email" label="Email Address" type="email" fullWidth variant="standard" value={formData.email} onChange={handleChange} />
          <TextField margin="dense" id="name" name="name" label="Name" type="text" fullWidth variant="standard" value={formData.name} onChange={handleChange} />
          <TextField margin="dense" id="age" name="age" label="Age" type="age" fullWidth variant="standard" value={formData.age} onChange={handleChange} />
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </React.Fragment>
  );
};

// Tilføj props validering
FormDialog.propTypes = {
  initialData: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FormDialog;
