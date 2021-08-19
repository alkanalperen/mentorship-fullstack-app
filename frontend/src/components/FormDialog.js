import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useState, useEffect } from "react";
import axios from "axios"

export default function FormDialog({stateChanger, ...rest}) {
  const [open, setOpen] = useState(false);
  const [mainTopic, setTopic] = useState("");
  const [subTopic, setSubTopic] = useState("");

  stateChanger(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createTopic = () => {
    if(subTopic === ""){
    var data = {
        "title":mainTopic
 }
    var auth = JSON.parse(localStorage.getItem('auth'));
    axios.post("http://localhost:8080/api/topic/add/main",data,auth).then(response => {
        console.log("succesful");
         }
       );   
    }else{
        var credentials = localStorage.getItem('credentials');
        console.log(credentials);
        axios.post("http://localhost:8080/api/topic/add/"+ mainTopic, subTopic,{
          headers:{
            'Authorization': 'Basic ' + credentials,
            'Content-Type': 'application/json'
          }
        }).then(response => {
        console.log(subTopic);
        
         }
       );  
    }
    stateChanger(true);
    setOpen(false);
}

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add  Topic
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
              Please write the topic that you want to add
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="Topic"
            label="Topic"
            fullWidth
            value = {mainTopic}
            onChange = {e => setTopic(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="SubTopic"
            label="Subtopic"
            fullWidth
            value = {subTopic}
            onChange = {e => setSubTopic(e.target.value)}

          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={createTopic} color="primary">
            Create topic
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
