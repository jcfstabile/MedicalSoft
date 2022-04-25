import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect, Routes } from 'react-router-dom';
import Login from './Login.js'
//import Home from './Home.js'
//import AgregarPaciente from './AgregarPaciente.js'

export default function App() {
  return(
    <Login />
  );
    //      <Route exact path ='/agregarpaciente' component ={AgregarPaciente}/>
    //      <Route exact path ='/'                component ={Home}/>    
}