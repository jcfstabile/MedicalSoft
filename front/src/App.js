import React from "react";
import { BrowserRouter as Router,Switch, Route, Link, Redirect, Routes } from 'react-router-dom';
import Login from './Login.js'
//import Home from './Home.js'
//import AgregarPaciente from './AgregarPaciente.js'

export default class App extends React.Component{
  render(){
    return(

     <Router>
      <Routes>
        <Route exact path ='/Login'           component ={Login}/>
      </Routes>
     </Router>
    );
    //      <Route exact path ='/agregarpaciente' component ={AgregarPaciente}/>
    //      <Route exact path ='/'                component ={Home}/>
          
  }
}