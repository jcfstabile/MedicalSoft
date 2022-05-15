import {Fragment, useState } from "react";
import Api from "./Api";


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
        fecha :"",
        hora : ""
    }
}

const BusquedaComponent = ({activarModal, devolverDni}) =>{
    const [search,setSearch] = useState (initialForm)
    const [datos,setDatos] = useState (initalData)
    const [error,setError] = useState ("")
    const [errorNoTurno,setErrorNoTurno] = useState (false)
    const [turno,setTurno] = useState (InitialTurno)

    const buscarPaciente = async (e) => {
        try {
            const response = await Api.buscarPaciente(search)
            setDatos(response)
            obtenerTurno()
        } catch (error) {
            setError("No hay paciente con el DNI ingresado")
            setTimeout(() => setError(""), 4000);
            setDatos(initalData);
        };
    }

    const obtenerTurno = async (e) => {
        try {
            const response = await Api.buscarTurno(search)
            setTurno (response)
            setErrorNoTurno(false)        
        } catch (error) {
            setErrorNoTurno(true)
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
            <div className="datosTraidos">
                <p class="datosTitle">Informacion</p>
                <p>DNI: <p>{datos.dni}</p></p>
                <hr className="datosHr"/>
                <p>NOMBRE: <p>{datos.nombre}</p></p>
                <hr className="datosHr"/>
                <p>APELLIDO: <p>{datos.apellido}</p></p>
                <hr className="datosHr"/>
                <p>TELEFONO: <p>{datos.telefono}</p></p>
                <hr className="datosHr"/>

                <p>TURNO:</p>
                {errorNoTurno? <p>Sin turno</p>: null}
                {!turno.turno.fecha === ""? <p>{turno.turno.fecha},{turno.turno.hora}</p> : null}
            </div>
            <div className="botones-buscarPaciente">
                {datos.dni == "" 
                ? ""
                : <button className = "buscarTurnobtn" type="submit" onClick={clickBuscarTurno}>BUSCAR TURNO</button>
                }
            </div>
        </Fragment> 
    )
};

export default BusquedaComponent;

