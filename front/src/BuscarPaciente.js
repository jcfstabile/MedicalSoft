import React,{Fragment,useState} from "react";
import Api from "./Api";
import'./css/BuscarPaciente.css';
import { Link } from "react-router-dom";

const BuscarPaciente = ( ) =>{
    const[dni,setDni] = useState ("");

    const onChange = (e) => {
        setDni(e.target.value);
    }

    const buscarPaciente = () =>{
        Api.buscarPaciente(dni)
    }

    return (
        <Fragment>
        <div className="containerAggPac">
            <div className="logoheaderImagen">
                <div className="flecha">
                    <Link to='/home'>&lt;</Link>
                </div>
                <img src='/images/logoNombre.png' alt='' width="100%" />
            </div>
            <hr/>
            <div className = "bodyAggPac">
                    <h3> BUSCAR  PACIENTE</h3>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br/>
                    <label for="dni">D.N.I</label>
                    <input type="number" name="dni" id="dni" onChange={onChange}/>
                    <br></br>
                    <div className="boton">
                        <button className = "boton-buscar" type="submit" id="btn-submit" onClick={buscarPaciente}>BUSCAR</button>
                    </div>
                </div>
        </div>  
        </Fragment>
    )
}

export default BuscarPaciente;
