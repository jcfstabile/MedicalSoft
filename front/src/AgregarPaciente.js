import React,{Fragment,useState} from "react"
import Api from "./Api"
import'./css/AgregarPaciente.css'
import { Link } from "react-router-dom"

const AgregarPaciente = ( ) =>{
    const[datos,setDatos] = useState ({dni:'',nombre:'',apellido:'',telefono:''})

    const handleChange = (event) =>{
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }

    const registrarPaciente = () =>{
        Api.agregarPaciente (datos)
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
                <div className="datosPaciente" method="post">
                    <h3> AGREGAR  PACIENTE</h3>
                    <br></br>
                    <br></br>
                    <br></br>
                    
                    <br/>
                    <label for="dni">D.N.I</label>
                    <input type="number" name="dni" id="dni" onChange={handleChange}/>
                    <div className="groupNombre">
                        <div className="nombreg">
                            <label for="nombre">NOMBRE</label>
                            <input type="text" name="nombre" id="nombre"  onChange={handleChange}/>
                        </div>   
                        <div className="apellidog">
                            <label for="apellido">APELLIDO </label>
                            <input type="text" name="apellido" id="apellido" onChange ={handleChange}/>
                        </div>
                    </div>
                    <label for="telefono">NUMERO DE CONTACTO </label>
                    <input type="number" name="telefono" id="telefono" onChange={handleChange}/>
                    <br></br>
                    <div className="botonesAggPac">
                        <button className = "agregarAggPac" type="submit" id="btn-submit" onClick={registrarPaciente}>AGREGAR</button>
                        <button className ="cancelarAggPac" type="submit" id="btn-submit" onClick={registrarPaciente}>CANCELAR</button>
                    </div>
                </div>
                <div className="pacienteImagen">
                <img src='/images/paciente.png' alt='' width="100%" />
                </div>
            </div>
        </div>    
        </Fragment>
    )
}

export default AgregarPaciente
