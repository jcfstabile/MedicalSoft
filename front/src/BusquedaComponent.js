import {Fragment, useState } from "react";
import Api from "./Api";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleList, faEdit } from "@fortawesome/free-solid-svg-icons";
import './css/BusquedaComponent.css';

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

    // MODIFICAR DATOS
    const [modalNombre, setModalNombre] = useState(false);
    const [modalApellido, setModalApellido] = useState(false);
    const [modalTelefono, setModalTelefono] = useState(false);

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

    const guardarNombre = (e) => {
        try {
            Api.asignarTurno(datos)
            .then(() => {
                setModalNombre(false);
                buscarPaciente();
            })
        } catch(error) {
            setModalNombre(false);
            setError("No se pudo guardar el nombre nuevo.")
        }
    }

    const handleChangeNombre = (e) => {
        const paciente = datos;
        paciente.nombre = e.target.value;
        setDatos(paciente);
    }

    const guardarApellido = (e) => {
        try {
            Api.asignarTurno(datos)
            .then(() => {
                setModalApellido(false);
                buscarPaciente();
            })
        } catch(error) {
            setModalApellido(false);
            setError("No se pudo guardar el apellido nuevo.")
        }
    }

    const handleChangeApellido = (e) => {
        const paciente = datos;
        paciente.apellido = e.target.value;
        setDatos(paciente);
    }

    const guardarTelefono = (e) => {
        try {
            Api.asignarTurno(datos)
            .then(() => {
                setModalTelefono(false);
                buscarPaciente();
            })
        } catch(error) {
            setModalTelefono(false);
            setError("No se pudo guardar el telefono nuevo.")
        }
    }

    const handleChangeTelefono = (e) => {
        const paciente = datos;
        paciente.telefono = e.target.value;
        setDatos(paciente);
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
                        ? <button className="edit-btn" type="submit" onClick={() => setModalNombre(true)}>
                            <FontAwesomeIcon icon={faEdit} className=""/>
                          </button>
                        : ""}
                    </p>
                </p>
                <Modal estado={modalNombre} cambiarEstado={setModalNombre}>
                    <FontAwesomeIcon icon={faRectangleList} className="turnosIcon"/>
                    <p className="tittleModal">Cambiar nombre</p>
                    <hr className="topModalhr"/>
                    <input onChange={handleChangeNombre} class="inputCampo" placeHolder="Nuevo nombre..." type="text" name="nombre" id="nombreNuevo" />
                    <div className="grupoBotonesModal">
                        <button className="aceptarModal" type="submit" onClick={guardarNombre}>aceptar</button>
                        <button className="cancelarModal" onClick ={() => setModalNombre(false)}>cancelar</button>
                    </div>
                </Modal>
                <hr className="datosHr"/>
                <p>APELLIDO: 
                    <p>{datos.apellido}</p>
                    <p>
                        {esPacienteEncontrado
                        ? <button className="edit-btn" type="submit" onClick={() => setModalApellido(true)}>
                            <FontAwesomeIcon icon={faEdit} className=""/>
                          </button>
                        : ""}
                    </p>
                </p>
                <Modal estado={modalApellido} cambiarEstado={setModalApellido}>
                    <FontAwesomeIcon icon={faRectangleList} className="turnosIcon"/>
                    <p className="tittleModal">Cambiar apellido</p>
                    <hr className="topModalhr"/>
                    <input onChange={handleChangeApellido} class="inputCampo" placeHolder="Nuevo apellido..." type="text" name="apellido" id="apellidoNuevo" />
                    <div className="grupoBotonesModal">
                        <button className="aceptarModal" type="submit" onClick={guardarApellido}>aceptar</button>
                        <button className="cancelarModal" onClick ={() => setModalApellido(false)}>cancelar</button>
                    </div>
                </Modal>
                <hr className="datosHr"/>
                <p>TELEFONO: 
                    <p>{datos.telefono}</p>
                    <p>
                        {esPacienteEncontrado
                        ? <button className="edit-btn" type="submit" onClick={() => setModalTelefono(true)}>
                            <FontAwesomeIcon icon={faEdit} className=""/>
                          </button>
                        : ""}
                    </p>
                </p>
                <Modal estado={modalTelefono} cambiarEstado={setModalTelefono}>
                    <FontAwesomeIcon icon={faRectangleList} className="turnosIcon"/>
                    <p className="tittleModal">Cambiar telefono</p>
                    <hr className="topModalhr"/>
                    <input onChange={handleChangeTelefono} class="inputCampo" placeHolder="Nuevo telefono..." type="number" name="telefono" id="telefonoNuevo" />
                    <div className="grupoBotonesModal">
                        <button className="aceptarModal" type="submit" onClick={guardarTelefono}>aceptar</button>
                        <button className="cancelarModal" onClick ={() => setModalTelefono(false)}>cancelar</button>
                    </div>
                </Modal>
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

