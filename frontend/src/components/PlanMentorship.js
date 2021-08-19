import axios from "axios";
import React, { useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useLocation , useHistory } from "react-router-dom";
import { ListItem } from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';

export default function PlanMentorship(){
    const [phaseName,setPhaseName] = useState("");
    const [endDate,setEndDate] = useState(0);
    const [endTime,setEndTime] = useState(0);

    const location = useLocation();
    const [mentorAppId,setMentorAppId] = useState(0);
    const [phases,setPhases] = useState([1,2]);

  
  

    const planMentorship = () => {
    };



    useEffect(() => {
       setMentorAppId(location.state)
    }, [])
    const addPhase = () => {
        var data = {
            "name":phaseName,
            "endDate":endDate,
            "endTime":endTime
        };
        var auth = JSON.parse(localStorage.getItem('auth'))
        axios.post("http://localhost:8080/api/mentorship/add/phase/" + mentorAppId,data,auth).then(response =>console.log( response) );
        setPhases([...phases,data]);
    };
    console.log(phases);

    return(
         <div>
        <form >
    <TextField id="standard-basic" label="Phase Name" onChange={e => setPhaseName(e.target.value)} />
    <TextField full width id="standard-basic" label="End date (DD/MM/YYYY)" onChange={e => setEndDate(e.target.value)}/>
    <TextField id="standard-basic" label="End Time (HH:MM)" onChange={e => setEndTime(e.target.value)}/>

    <Button onClick = {addPhase} > Add Phase </Button>
  </form>
    <List component="nav" aria-label="secondary mailbox folders">
      {phases.map(e=> <ListItem >  <ListItemText primary={e.name} />
 </ListItem>) } 
      </List> 
      <div>
      <Button onClick = { planMentorship}> Plan the mentorship </Button>
    </div>

    </div>
);
}