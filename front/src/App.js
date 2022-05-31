import * as React from "react";
import { BrowserRouter , Routes, Route, Link } from "react-router-dom";
import Login from './Login.js';
import Home from './Home.js';
import AgregarPaciente from './AgregarPaciente.js';
import BuscarPaciente from "./BuscarPaciente";
import Turnos from "./Turnos";

function App (){

  return(
    <BrowserRouter>
     <Routes>
        <Route path='/login'            element={<Login/>}/>
        <Route path='/agregarPaciente' element={<AgregarPaciente/>}/>
        <Route path='/home'            element={<Home/>}/>
        <Route path='/buscarPaciente' element={<BuscarPaciente />} />
        <Route path='/turnosAsignados' element={<Turnos/>} />
        <Route path="*" element={<Login/>}/>
     </Routes>
    </BrowserRouter>
  );

}

export default App
