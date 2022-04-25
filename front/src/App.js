import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from './Login.js'
import Home from './Home.js'
import AgregarPaciente from './AgregarPaciente.js'

function App (){

  return(
     <Routes>
        <Route path="/login"            element={<Login/>}/>
        <Route path="/agregarpaciente" element={<AgregarPaciente/>}/>
        <Route path='/home'            element={<Home/>}/>
        <Route path="*" element={<Login/>}/>
     </Routes>
  );

}

export default App