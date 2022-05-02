import React,{Fragment,useState} from "react";
import Api from "./Api";
import'./css/BuscarPaciente.css';
import { Link } from "react-router-dom";

const BuscarPaciente = ( ) =>{
    const[dni,setDni] = useState ("");
    const[datos, setDatos] = useState("");

    const onChange = (e) => {
        setDni(e.target.value);
    }

    const buscarPaciente = async () => {
        const data = await Api.buscarPaciente(dni)
        setDatos(data)
        console.log(datos);
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
                        <p>DNI: <p>{datos.dni}</p></p>
                        <p>NOMBRE: <p>{datos.nombre}</p></p>
                        <p>APELLIDO: <p>{datos.apellido}</p></p>
                        <p>TELEFONO: <p>{datos.telefono}</p></p>
                    </div>
                </div>
        </div>  
        </Fragment>
    )
}

export default BuscarPaciente;
