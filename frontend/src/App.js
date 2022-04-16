import React from "react";
import './App.css';
import {BrowserRouter as Router,Switch, Route, Redirect} from "react-router-dom"
import Home from "./Components/Home";
import NavBar from "./Components/Navbar";
import Login from "./auth/Login";
import {isAutheticated} from './auth/helper/authapicalls'
import Signup from "./auth/Signup";
function App() {
  return (
   <Router>
     <Switch>
      <Route>
        <Route exact path="/">
        {isAutheticated() ? <Home /> : <Redirect to={{
              pathname: "/login"
            }}
          />}
        </Route> 
        <Route exact 
        path="/login">
          <Login />
        </Route>
        <Route exact 
        path="/signup">
          <Signup />
        </Route>
        <Route exact 
        path="/navbar">
          <NavBar />
        </Route>
      </Route>
     </Switch>
   </Router>
  );
}

export default App;
