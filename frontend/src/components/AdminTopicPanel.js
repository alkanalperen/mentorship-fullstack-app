  import axios from 'axios';
import React, { useState, useEffect } from "react";
import { DataGrid,GridRowsProp, GridColDef } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import FormDialog from './FormDialog';
import DelFormDialog from './DelFormDialog';

import { useHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const columns= [
  { field: 'col1', headerName: 'Main Topic', width: 200 },
  { field: 'col2', headerName: 'Sub Topics', width: 500 },
];
const rows = [
  { id: 1, col1: "Hello", col2: 'World' },
  { id: 2, col1: 'XGrid', col2: 'is Awesome' },
  { id: 3, col1: 'Material-UI', col2: 'is Amazing' },
];



export default function AdminTopicPanel(){
  const history = useHistory();
  const [rows,setRows]=useState([{ id: 5, col1: "dsa", col2: "dsa" }]);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("dsa");
  const [isFormSended,setForm] = useState(false);
  const[state, setState]=useState(true);
  const [selectedId,setSelectedId] = useState("")
  const [topic,setTopic] = useState("");
  const [subTopic,setSubTopic] = useState("")

  const handleClickOpen = () => {
    setOpen(true);
  };


const handleClose = (value) => {
  setOpen(false);
  setSelectedValue(value);
};

  useEffect(()  => {
    if(localStorage.getItem('role')!= 'admin'){
      alert("you are not admin so you cannot go to the admin related pages")
      history.push('/dashboard');
    }

    var auth = JSON.parse(localStorage.getItem('auth'));
    axios.get("http://localhost:8080/api/topic",auth).then(response => {
        setRows(response.data.map(topics => {return{id: topics.id, col1: topics.title, col2:topics.subTitle }}));
    });
    console.log(state);
  }, [state]);
  

  return(
      <div className="AdminTopicPanel" style={{ height: 600, width: '100%' }}>
        <DataGrid
  rows={rows}
  columns={columns}
  pageSize={10}
  onSelectionModelChange = {id => setSelectedId(id)}//setRowSelected(e.target.value)}
/>

<FormDialog  stateChanger = {setState} />
<DelFormDialog stateChanger = {setState} />

            </div>

      );



}