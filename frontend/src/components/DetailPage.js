
import { useEffect, useState } from "react";
import { useLocation , useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FeedBackDiolag from "./FeedBackDialog";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import axios from "axios";



export default function DetailPage(){
    const [mentorshipDetail,setMentorshipDetail] = useState("");
    const [visible, setVisible] = useState(false);
    const [phases,setPhases] = useState([1,2]);
    const [rows,setRows] = useState([]);
    const location = useLocation();
    const history = useHistory();
    const[state, setState]=useState(true);

    var id;

    useEffect(() => {
      if(localStorage.getItem('role')!= 'user'){
        alert("you are not user so you cannot go to the admin related pages")
        history.push('/dashboard');
      }

        setMentorshipDetail(location.state);
        setPhases(mentorshipDetail.phases)
        console.log(mentorshipDetail.phases)
        location.state.phases.map(e=>console.log(e));

    }, [])

    const goPlanMentorship  =  () => {
        history.push("/PlanMentorship",mentorshipDetail.id);
    };

    const startMentorship = () => {
      var auth = JSON.parse(localStorage.getItem('auth'))
      axios.post("http://localhost:8080/api/mentorship/start/process/" + mentorshipDetail.id,{},auth).then(response =>console.log( response) );
    };


   
    


var items = [1,2,3,4]
    return(
     <div>
        <div className='container'>
        <div className='col'>
          <div className='col-md-6'>

            <table className='table table-hover'>
              <thead>
                <tr></tr>
              </thead>
              <tbody>
        <tr>
            <th scope="col">Mentor Name</th>
            <th scope="col">Mentee Name</th>
            <th scope="col">Start Date </th>
            <th scope='col'>Status</th>
            <th scope='col'>Main Topic</th>
            <th scope='col'>Active Phase</th>
        </tr>
  
        <tr>
            <td>{mentorshipDetail.mentorName}</td>
            <td>{mentorshipDetail.menteeName}</td>
            <td>{mentorshipDetail.startDate}</td>
            <td>{mentorshipDetail.status}</td>
            <td>{mentorshipDetail.mainTopic}</td>

            {mentorshipDetail.status !== 'Completed' ? (
                  <tr>
                    <td>{mentorshipDetail.currentPhase} </td>
                  </tr>
                ) : (
                  ''
                )}
        </tr>

               
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <h3>Phases</h3>

      <List divider = {true} component="nav" aria-label="secondary mailbox folders">
        <ListItem > 
        <Grid container spacing={3}>
        <Grid item xs={2}>
        <Paper elevation={3} >Phase Name</Paper>
        </Grid>
        <Grid item xs={2}>
        <Paper elevation={3}> Phase End Date / Phase End Time</Paper>
        </Grid>
        <Grid item xs={2}>
        <Paper elevation={3}>Assesment and Rate Of Mentor </Paper>
        </Grid>
        <Grid item xs={2}>
        <Paper elevation={3}> Asessment and Rate Of Mentee</Paper>
        </Grid>
        <Grid item xs={2}>
        <Paper elevation={3}> Status </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper elevation={3} >Action</Paper>
        </Grid>
      </Grid>        </ListItem>
      {location.state.phases.map(e=> <ListItem > 
        <Grid container spacing={3}>
        <Grid item xs={2}>
        <Paper elevation={1}>{e.name}</Paper>
        </Grid>
        <Grid item xs={2}>
        <Paper >{e.endDate} {'\n'} {e.endTime}</Paper>
        </Grid>
        <Grid item xs={2}>
        <Paper >{e.assessmentOfMentor} {'\n'} {e.ratingOfMentor}</Paper>
        </Grid>
        <Grid item xs={2}>
        <Paper >{e.assessmentOfMentee} {'\n'} {e.ratingOfMentee}</Paper>
        </Grid>
        <Grid item xs={2}>
        <Paper >{e.status}</Paper>
        </Grid>
        <Grid item xs={2}>
          {e.status === "PENDING" && <FeedBackDiolag name = "EVALUATE PHASE" id = {e.id}/>}
          {e.status === "COMPLETED" && <Paper >This phase was completed</Paper>}
          {e.status === "ACTIVE" && <FeedBackDiolag name = "COMPLETE PHASE" id = {e.id}/>}

        </Grid>
      </Grid> </ListItem>) } 
      </List>      <div className='col'>
      {location.state.hasPhase === false && (     
                          <Button onClick = {goPlanMentorship} >
                            PLAN THE MENTORSHIP
                          </Button>
                      )}                     
                       {mentorshipDetail.hasPhase === true &&
                        mentorshipDetail.currentPhase == 0 && (
                          <button
                            href='#0'
                            style={{ width: '20rem' }}
                            className='btn btn-success'
                            onClick={startMentorship}
                          >
                            START THE MENTORSHIP
                          </button>
                        )}
                    </div>
      </div>
      );}