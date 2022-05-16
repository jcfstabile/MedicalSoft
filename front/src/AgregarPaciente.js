import React,{Fragment} from "react"
import'./css/AgregarPaciente.css'
import { Link } from "react-router-dom"

import PacientForm from './PacientForm'

const AgregarPaciente = ( ) =>{
    
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
                <PacientForm></PacientForm>
                <div className="pacienteImagen">
                    <img src='/images/paciente.png' alt='' width="100%" />
                </div>
            </div>
        </div>    
        </Fragment>
    )
}

export default AgregarPaciente
