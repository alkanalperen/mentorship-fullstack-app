import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from '@material-ui/core/Button';
import "./Login.css";
import axios from "axios";
import GoogleLogin from 'react-google-login'
import { useAppContext } from "../libs/contextLib";
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { ColorLensTwoTone } from "@material-ui/icons";


export default function Login() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://npuh82iut7x3aosxba3ol14m-wpengine.netdna-ssl.com/wp-content/uploads/2021/03/mentor.jpg)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
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

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  
  function handleSubmit(event) {

    var auth ={
        auth : {
            username:username,
            password:password
        }
      };
    localStorage.setItem('auth',JSON.stringify(auth));
    localStorage.setItem('username',username);
    localStorage.setItem('credentials', window.btoa(username + ':' + password));


    axios.get("http://localhost:8080/api/login",auth).then(
      response => {
        alert("işlem başarılı" + response.data );
        localStorage.setItem('role',response.data);
        localStorage.setItem("isAuthenticated",'true')
        history.push("/dashboard");
     }
).catch(error => {
    alert("işlem başarısız" + error.response );
});
  
}

const googleSubmit = ( e) => {
  var auth ={
    auth : {
        username:e.Ts.RT,
        password:"googlespassword"
    }
  };
localStorage.setItem('auth',JSON.stringify(auth));
localStorage.setItem('credentials', window.btoa(username + ':' + password));
  localStorage.setItem('role','user');
  localStorage.setItem("isAuthenticated",'true')
  localStorage.setItem('username',e.Ts.RT) // get username from google response
  history.push("/dashboard");

}

  return (
    <Grid container component="main" className={classes.root}>
    <CssBaseline />
    <Grid item xs={12} sm={4} md={7} className={classes.image} />
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <GoogleLogin  
          clientId = "1055889201859-fnksjqgq24iebbfj253qn169vlun128f.apps.googleusercontent.com"
          buttonText = "Login"
          cookiePolicy= {'single_host_origin'}
          onSuccess={googleSubmit}
          className={classes.submit}
          />       

          <Box mt={5}>
            <Copyright />
          </Box>
      </div>
    </Grid>
  </Grid>

  );
}
/*

    <div className="Login">
    <TextField id="standard-basic" label="username" onChange={e => setUsername(e.target.value)}/>
    <TextField id="standard-basic" label="password" onChange={e => setPassword(e.target.value)}/>
        <Button variant="contained"  size="large" color="primary" onClick={handleSubmit} >
          Login
        </Button>
        <GoogleLogin  
          clientId = "1055889201859-fnksjqgq24iebbfj253qn169vlun128f.apps.googleusercontent.com"
          buttonText = "Login"
          cookiePolicy= {'single_host_origin'}
          onSuccess={googleSubmit}
        />       
    </div>
    */