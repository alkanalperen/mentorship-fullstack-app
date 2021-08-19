import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  }from "react-router-dom";
  import Login from './Login.js'
  import AdminTopicPanel from './AdminTopicPanel.js'
  import AdminDashboard from './AdminDashboard.js';
  import UserDashboard from './UserDashboard.js';
  import ProtectedRoute from './ProtectedRoute.js';
  import ApplyToBeMentor from './ApplyToBeMentor.js';
  import SearchPage from './SearchPage.js'
  import DetailPage from './DetailPage.js'
import PlanMentorship from "./PlanMentorship.js";

export default function Routes(){
    return(
    <Router >
        <ProtectedRoute path="/dashboard" component= {Dashboard} />
        <ProtectedRoute path="/AdminTopicPanel" component= {AdminTopicPanel} />
        <ProtectedRoute path="/ApplyToBeMentor" component= {ApplyToBeMentor} />
        <ProtectedRoute path="/SearchPage" component= {SearchPage} />
        <ProtectedRoute path="/DetailPage" component= {DetailPage} />
        <ProtectedRoute path="/PlanMentorship" component= {PlanMentorship} />
        <Route exact path="/login" component= {Login} />
   </Router>
    );

function Dashboard() {
    var role = localStorage.getItem('role');
    
    if(role=="admin"){
    return (
      <AdminDashboard />
    );
    }
    else{
     return (   
        <UserDashboard />
     );
    }
  }
  
  }
  