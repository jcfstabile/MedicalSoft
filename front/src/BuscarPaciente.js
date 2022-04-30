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
            <div className = "bodyAggPac2">
                    <div className="titulo">BUSCAR PACIENTE</div>
                    <div className="search">
                        <label for="dni">D.N.I</label>
                        <input class="inputD" type="number" name="dni" id="dni" onChange={onChange}/>
                        <button className = "boton-buscar" type="submit" id="btn-submit" onClick={buscarPaciente}>BUSCAR</button>
                    </div>
                    <div className="datosTraidos">

                    </div>
                </div>
        </div>  
        </Fragment>
    )
}

export default BuscarPaciente;
