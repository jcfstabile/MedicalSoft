import {Fragment, useState } from "react";
import Api from "./Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleList, faEdit } from "@fortawesome/free-solid-svg-icons";

const initialForm = {
    dni : ""
};

const initalData = {
    dni : "",
    nombre : "",
    apellido : "",
    telefono : ""
}

const InitialTurno ={
    turno:{
        fecha : "",
        hora : ""
    }
}

const BusquedaComponent = ({estadoBusqueda, cambiarEstadoBusqueda,
                            activarModal, devolverDni}) =>{
    const [search,setSearch] = useState (initialForm)
    const [datos,setDatos] = useState (initalData)
    const [error,setError] = useState ("")
    const [turno,setTurno] = useState (InitialTurno)

    const buscarPaciente = async (e) => {
        try {
            const response = await Api.buscarPaciente(search)
            setDatos(response)
            setTurno(InitialTurno)
            obtenerTurno()
        } catch (error) {
            setError("No hay paciente con el DNI ingresado")
            setTimeout(() => setError(""), 4000);
            setDatos(initalData);
            setTurno(InitialTurno)
        };
    }

    const obtenerTurno = async (e) => {
        try {
            const response = await Api.buscarTurno(search)
            setTurno (response)
        } catch (error) {
        }
    }

    const handleChange = (e) => {
        let regexDNI = /^[\d]{1,3}\.?[\d]{3,3}\.?[\d]{3,3}$/; // 4 a 10 digitos.
        setSearch(e.target.value);
        
        if(!search.trim() || !regexDNI.test(search.trim())){
            setError("EL CAMPO D.N.I NO TIENE UN FORMATO CORRECTO (EJEMPLO:000000000")
        }else{
            setError("")
        }
    };

    const handleBlur = (e) => {
        let regexDNI = /^[\d]{1,3}\.?[\d]{3,3}\.?[\d]{3,3}$/; // 4 a 10 digitos.

        if(!search.trim() || !regexDNI.test(search.trim())){
            setError("EL CAMPO D.N.I NO TIENE UN FORMATO CORRECTO (EJEMPLO:000000000")
        }else{
            setError("")
        }
    }

    const clickBuscarTurno = (e) => {
        activarModal(true);
        devolverDni(datos.dni);
    }

    const esPacienteEncontrado = datos.dni != "";

    const recargarPaciente = () => {
        buscarPaciente();
        cambiarEstadoBusqueda(false);
    }

    return(
        datos,
        <Fragment>
            <div className="search">
                <div> 
                    <label for="dni">D.N.I</label>
                    <input value={search} onChange={handleChange} onBlur = {handleBlur} class="inputD" type="number" name="dni" id="dni" />
                    <button className = "boton-buscar" type="submit" id="btn-submit" onClick={buscarPaciente}>BUSCAR</button>
                </div>
                {error?<p className = "errorMsgBuscarPac">{error}</p>:null}
            </div>
            {
                estadoBusqueda
                ? recargarPaciente()
                : ""
            }
            <div className="datosTraidos">
                <p class="datosTitle">Informacion</p>
                <p>DNI: 
                    <p>{datos.dni}</p>
                </p>
                <hr className="datosHr"/>
                <p>NOMBRE: 
                    <p>{datos.nombre}</p>
                    <p>
                        {esPacienteEncontrado
                        ? <button className="edit-btn" type="submit"><FontAwesomeIcon icon={faEdit} className=""/></button>
                        : ""}
                    </p>
                </p>
                <hr className="datosHr"/>
                <p>APELLIDO: 
                    <p>{datos.apellido}</p>
                    <p>
                        {esPacienteEncontrado
                        ? <button className="edit-btn" type="submit"><FontAwesomeIcon icon={faEdit} className=""/></button>
                        : ""}
                    </p>
                </p>
                <hr className="datosHr"/>
                <p>TELEFONO: 
                    <p>{datos.telefono}</p>
                    <p>
                        {esPacienteEncontrado
                        ? <button className="edit-btn" type="submit"><FontAwesomeIcon icon={faEdit} className=""/></button>
                        : ""}
                    </p>
                </p>
                <hr className="datosHr"/>

                <p>TURNO:
                {(turno.turno != null && turno.turno.fecha != ""
                    ? <p>fecha: {turno.turno.fecha}, hora: {turno.turno.hora}</p> 
                    : <p>Sin turno</p>)
                }
                </p>
                
            </div>
            <div className="botones-buscarPaciente">
                {datos.dni == "" 
                ? ""
                : (turno.turno != null && turno.turno.fecha != "")
                  ? <button className = "buscarTurnoApagado" type="submit"><FontAwesomeIcon icon={faRectangleList} className="turnosBtnIcon"/>BUSCAR TURNO</button>
                  : <button className = "buscarTurnobtn" type="submit" onClick={clickBuscarTurno}><FontAwesomeIcon icon={faRectangleList} className="turnosBtnIcon"/>BUSCAR TURNO</button>
                }
            </div>
        </Fragment> 
    )
};

export default BusquedaComponent;

