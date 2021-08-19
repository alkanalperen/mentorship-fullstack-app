import axios from "axios";
import React, { useState, useEffect } from "react";
import { DataGrid,GridRowsProp, GridColDef } from '@material-ui/data-grid';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';


const columns= [
  { field: 'id', headerName: 'Id', width: 200 },
  { field: 'col2', headerName: 'Mentor Canditate Name', width: 200 },
  { field: 'col3', headerName: 'Main Topics', width: 200 },
  { field: 'col4', headerName: 'Sub Topics', width: 200 },
  { field: 'col5', headerName: 'Details', width: 600 },

];



export default function AdminDashboard(){
  const [rows,setRows]=useState([{ id: 5, col1: "dsa", col2: "dsa" }]);
  const [selectedId,setSelectedId]  = useState(0);
  let history = useHistory();

  useEffect(()  => {
    setRows([...rows,{ id: 4, col1: "dsa", col2: "dsa" }]);
    var auth = JSON.parse(localStorage.getItem('auth'));
    axios.get("http://localhost:8080/api/mentorapplication",auth).then(response => {
        setRows(response.data.map(application => {return{id: application.id, col2: application.menteeName, col3:application.mainTopic,col4:application.subTopic,col5:application.thoughts}}));
    });
  }, []);

  useEffect(()  => {
   console.log(selectedId);
  }, [selectedId]);
  console.log(selectedId);

  
  const approve = () => {
    console.log(selectedId[0]);
    var n = Number(selectedId[0]);
    var auth = JSON.parse(localStorage.getItem('auth'));
    axios.post("http://localhost:8080/api/mentorapplication/approve/" + n,{},auth).then(response => {
    });

  };

  const reject = () => {
    var auth = JSON.parse(localStorage.getItem('auth'));
    var n = Number(selectedId[0]);
    axios.delete("http://localhost:8080/api/mentorapplication/delete/"+ n,auth).then(response => {
    });
  };


  function Logout(){
        localStorage.setItem("isAuthenticated","false");
        history.push("/Login");
        alert("logout");
    }

  function goPage(){
    history.push("/AdminTopicPanel");
  }

    return(
    <div className="AdminDashboard" >
                <div style={{ display: "flex" }}>
                    <Button style={{ marginLeft: "auto" }} variant="contained" color="primary" onClick={goPage}>
                      AdminTopicPanel
                    </Button >
        <Button variant="contained" color="primary" onClick = {Logout}>
Logout
</Button>
 
</div>
        <h1> Admin Dashboard </h1>
        <h3>Mentor Applications: </h3>
  <div style={{ height: 300, width: '100%' }}>
        <DataGrid
  rows={rows}
  columns={columns}
  pageSize={10}
  onSelectionModelChange = {id => setSelectedId(id)}//setRowSelected(e.target.value)}
/>
<ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
<Button onClick = {approve}>
Approve Application
</Button>
<Button onClick = {reject} >
Reject Application
</Button>
</ButtonGroup>
</div>
    </div>
    ) ;
}
