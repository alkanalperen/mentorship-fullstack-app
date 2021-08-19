import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import axios from "axios";
import GoogleLogin from 'react-google-login'
import { useAppContext } from "../libs/contextLib";
import { useHistory } from "react-router-dom";
import { DataGrid,GridRowsProp, GridColDef } from '@material-ui/data-grid';

const mentorColumns= [
    { field: 'col2', headerName: 'Mentee Name', width: 200 },
    { field: 'col3', headerName: 'Status', width: 200 },
    { field: 'col4', headerName: 'Main Topic', width: 200 },

  ];

  const menteeColumns= [
    { field: 'col2', headerName: 'Mentor Name', width: 200 },
    { field: 'col3', headerName: 'Status', width: 200 },
    { field: 'col4', headerName: 'Main Topic', width: 200 },

  ];

  
export default function UserDashboard(){
    const [menteeRows,setMenteeRows]=useState([]);
    const [mentorRows,setMentorRows]=useState([]);
    const [allMentorships,setAllMentorships] = useState(""); 
    const [selectedId,setSelectedId] = useState([]);

    const history = useHistory();

    function Logout(){
    localStorage.setItem("isAuthenticated","false");
       history.push("/login");
       alert("logout");
    }

    function goApplyPage() {
        history.push("/ApplyToBeMentor")
    }

    function goSearchPage() {
        history.push("/SearchPage")
    }

    const goDetailPageForMentorList = ()  => {
      console.log(selectedId[0])
      var mentorshipDetail = allMentorships.mentors.find( e => e.id == selectedId[0])
        history.push("/DetailPage",mentorshipDetail)
    } ;
    const goDetailPageForMenteeList = ()  => {
      console.log(allMentorships.mentees[selectedId[0]-1])
      var mentorshipDetail = (allMentorships.mentees.find( e => e.id == selectedId[0]))
        history.push("/DetailPage",mentorshipDetail)
    } ;


    useEffect(() => {
        
        var username = localStorage.getItem('username')
        var auth = JSON.parse(localStorage.getItem('auth'));

       axios.get("http://localhost:8080/api/mentorship/get/" + username,auth).then(response => {
        setAllMentorships(response.data);
        setMentorRows(response.data.mentors.map(application => {return{id: application.id, col2: application.menteeName, col3:application.status,col4:application.mainTopic}}));
        setMenteeRows(response.data.mentees.map(application => {return{id: application.id, col2: application.mentorName, col3:application.status,col4:application.mainTopic}}));

      });

    }, [])
    
    return(
        <div className="UserDashboard">
          <div style={{ display: "flex" }}>
          <Button   style={{ marginLeft: "auto" }}
 variant="contained"
   color="primary"
onClick = {goSearchPage}>
    Search Page
</Button>
<Button   variant="contained"
   color="primary"
 onClick = {goApplyPage}>
    apply to be mentor
</Button>
<Button   variant="contained"
   color="primary"
 onClick = {Logout}>
Logout
</Button>
</div>
<h1> Mentor List </h1>
<div  style={{ height: 300, width: '100%' }}>

<DataGrid
  rows={mentorRows}
  columns={mentorColumns}
  pageSize={10}
  checkboxSelection
  onSelectionModelChange = {e => setSelectedId(e)}
  />
  <Button        
   variant="contained"
   color="secondary"
 onClick = {goDetailPageForMentorList}>
    go detail page
</Button>

</div>
<div style = {{height:50}}></div>

<h1> Mentee List </h1>

<div  style={{ height: 300, width: '100%' }}>

<DataGrid
  rows={menteeRows}
  columns={menteeColumns}
  pageSize={10}
  checkboxSelection
  onSelectionModelChange = {e => setSelectedId(e)}
  />
  <Button 
     variant="contained"
     color="secondary"
  onClick = {goDetailPageForMenteeList}>
    go detail page
</Button>
</div>
<div style = {{height:50}}></div>
<div>
</div>
</div>
        )
    }