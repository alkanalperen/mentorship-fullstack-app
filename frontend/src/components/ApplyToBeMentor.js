import axios from 'axios';
import React, { useState, useEffect } from "react";
import MultiSelect from "react-multi-select-component";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router';



export default function ApplyToBeMentor(){
  const history = useHistory();
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(4),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const classes = useStyles();  

    const options = [
        { label: "Grapes 🍇", value: "grapes" },

      ];
      const [selected, setSelected] = useState([]);

    const initialValue = [
        { id: 0,title:"dsa", subTitle: "---SELECT-OPTION----" }];
        const [stateOptions, setStateValues] = useState(initialValue);
    const [optionsArr, setOptions] = useState(options);
    const [titleId, setTitle] = useState("");
    const [subTitleId, setSubTitle] = useState([]);

    const [thoughts, setThoughts] = useState("")
    const [subTArray,setSubT] = useState(initialValue);

   function handleSubmit(){
     var subtopics = subTitleId.map(response => response.label);
    var data = {
           "menteeName":localStorage.getItem('username'),
           "mainTopic":titleId,
           "subTopic":subtopics,
           "thoughts":thoughts
    }
    console.log("das");
    console.log(data.menteeName + " " + data.mainTopic + " " + data.subTopic + " " + data.thoughts);
    var auth = JSON.parse(localStorage.getItem('auth'));
    axios.post("http://localhost:8080/api/mentorapplication/apply",data,auth).then(response => {
    console.log("das");
       }
     );   

}

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
             }    // console.log(optionsArr)
                }, [titleId]);
    
    return(
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Apply To Be Mentor
        </Typography>
        <form className={classes.form} noValidate>
        <Select 
         native 
         variant = {'outlined'}
        fullWidth
        onChange={(e) => setTitle(e.target.value)}>
                {stateOptions.map(topic => <option key = {topic.id}>{topic.title}</option> )}
            </Select> 
            <div style = {{height:20}}></div>
    <MultiSelect
             fullWidth
        options={optionsArr}
        value={subTitleId}
        onChange={setSubTitle}
        labelledBy="Select"
      />
 <TextField
            variant="outlined"
            margin="normal"
          
            fullWidth
            name="thoughts"
            label="thoughts"
            type="thoughts"
            id="thoughts"
            onChange={e => setThoughts(e.target.value)}
          />            <Button                fullWidth
         fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
onClick = {handleSubmit} >
          Apply
        </Button>
                 </form>
      </div>
    </Container>       
        );



}