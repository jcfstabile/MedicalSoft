import React,{Fragment} from "react";
import'./css/BuscarPaciente.css';
import BusquedaComponent from "./BusquedaComponent"
import { Link } from "react-router-dom";

const BuscarPaciente = ( ) =>{
    return (
        <Fragment>
        <div className="containerBuscarPac">
            <div className="logoheaderImagen">
                <div className="flecha">
                    <Link to='/home'>&lt;</Link>
                </div>
                <img src='/images/logoNombre.png' alt='' width="100%" />
            </div>
            <hr/>
            <div className = "bodyAggPac2">
                    <div className="titulo">BUSCAR PACIENTE</div>
                        <BusquedaComponent/>
                    </div>
            </div>
        </Fragment>
    )
}

export default BuscarPaciente;
