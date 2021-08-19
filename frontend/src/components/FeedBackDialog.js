import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Rating from '@material-ui/lab/Rating';
import { PhonePausedOutlined } from '@material-ui/icons';



export default function FeedBackDiolag({stateChanger,name,id, ...rest}) {
  const [open, setOpen] = useState(false);
  const [assesment, setAssesment] = useState("");
  const [subTopic, setSubTopic] = useState("");
  const [value,setValue] = useState(2);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 

  const sendEvaluation = () => {
    var phaseAssesment = {
        "assessment":assesment,
        "rating" : value.toString()
    }
    var auth = JSON.parse(localStorage.getItem('auth'))
    axios.post("http://localhost:8080/api/mentorship/finish/phase/" + id,phaseAssesment,auth).then(response =>console.log( response) );
    }


  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
          {name}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"> Evaluation </DialogTitle>
        <DialogContent>
          <DialogContentText>
              Please write your assesment and rate the process
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="Topic"
            label="Assesment"
            fullWidth
            value = {assesment}
            onChange = {e => setAssesment(e.target.value)}
          />
        <Rating
          name="simple-controlled"
          value={value}
          size="large" 
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={sendEvaluation} color="primary">
            Complete phase
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
