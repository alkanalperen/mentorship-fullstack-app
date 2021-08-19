import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import axios from "axios";
import GoogleLogin from 'react-google-login'
import { useAppContext } from "../libs/contextLib";
import { useHistory } from "react-router-dom";
import MultiSelect from "react-multi-select-component";
import { DataGrid,GridRowsProp, GridColDef } from '@material-ui/data-grid';

const columns= [
    { field: 'id', headerName: 'Id', width: 200 },
    { field: 'col2', headerName: 'Mentor Name', width: 200 },
    { field: 'col3', headerName: 'Main Topics', width: 200 },
    { field: 'col4', headerName: 'Sub Topics', width: 200 },
    { field: 'col5', headerName: 'Details', width: 600 },
  
  ];
  
export default function SearchPage(){
    const [rows,setRows]=useState([]);

    const initialValue = [
        { id: 0,title:"dsa", subTitle: "---SELECT-OPTION----" }];

    const history = useHistory();
    const [stateOptions, setStateValues] = useState(initialValue);
    const [optionsArr, setOptions] = useState(initialValue);
    const [titleId, setTitle] = useState("");
    const [subT,setSubT]=useState("")
    const [thoughts, setThoughts] = useState("")
    const [selectedId, setSelectedId] = useState(0);

    const startMentorship = () => {
        var username = localStorage.getItem('username');
        var credentials = localStorage.getItem('credentials');

        axios.post("http://localhost:8080/api/mentorship/create/"+ username, selectedId,{
          headers:{
            'Authorization': 'Basic ' + credentials,
            'Content-Type': 'application/json'
          }
        }).then(response => {
            if( response.data !== "succes")
                alert(response.data)
         }
       );  
       
    };

    const findMentorWithSubt = () => {
        console.log(subT);
        var auth = JSON.parse(localStorage.getItem('auth'));
        const url = "http://localhost:8080/api/mentee/elasticsearch/subt/" + subT;
        console.log(subT);
        axios.get(url,auth).then(response => {
            console.log(response.data[0].id);
            setRows(response.data.map(application => {return{id: application.id, col2: application.name, col3:application.mainTopic,col4:application.subTopic,col5:application.thoughts}}));
        } ).catch(()=>alert("user not found")); 
    };
    const handleSubmit = () => {
        var auth = JSON.parse(localStorage.getItem('auth'));
        const url = "http://localhost:8080/api/mentee/elasticsearch/thoughts/" + thoughts;
        axios.get(url,auth).then(response => {
            setRows(response.data.map(application => {return{id: application.id, col2: application.name, col3:application.mainTopic,col4:application.subTopic,col5:application.thoughts}}));
        }
    ).catch(()=>alert("user not found"));  
    };
    
    
 
    useEffect(()  => {
        if(localStorage.getItem('role')!= 'user'){
            alert("you are not user so you cannot go to the admin related pages")
            history.push('/dashboard');
          }
      
        var auth = JSON.parse(localStorage.getItem('auth'));
       axios.get("http://localhost:8080/api/topic/",auth).then(response => {
                setStateValues(response.data);
                console.log(response.data)
          }
        );  
      }, []);
    useEffect(()  => {
        if(stateOptions.find(title => title.title === titleId) === undefined)
        {
            console.log("undefined");
        }else{
         setOptions(stateOptions.find(title => title.title === titleId).subTitle.map( (response) => {
             return {label : response, value: response}}))
             }    
             console.log(optionsArr)
        }, [titleId]);

        
    return(
        <div className="SearchPage">
            <h1> Search Page </h1>
            <Select value = {titleId} onChange={(e) => setTitle(e.target.value)}>
                {stateOptions.map(topic => <MenuItem value = {topic.title}>{topic.title}</MenuItem> )}
            </Select> 
            <Select value = {subT} onChange={(e) => setSubT(e.target.value)}>
                {optionsArr.map(topic => <MenuItem value = {topic.label}>{topic.label}</MenuItem> )}
            </Select> 
            
            <Button onClick = {findMentorWithSubt}>Search</Button>

            <input type="text" onChange = {e => setThoughts(e.target.value)}/>
            <Button color="primary" onClick = {handleSubmit} > Free Text Search</Button>

            <div className="AdminTopicPanel" style={{ height: 300, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                onSelectionModelChange={(e) => setSelectedId(e[0])} // log row data
            />
<Button onClick = {startMentorship}>
Create Mentorship
</Button>
</div>


</div>

        )
    }