import {Fragment, useState } from "react";
import Api from "./Api";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleList, faEdit, faUserEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import './css/BusquedaComponent.css';
import ModalEdicion from "./ModalEdicion";

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
    const [errorNombre, setErrorNombre] = useState("El nombre es requerido");
    const [errorApellido, setErrorApellido] = useState("El apellido es requerido");
    const [errorTelefono, setErrorTelefono] = useState("El telefono es requerido");

    // BORRAR TURNO
    const [modalTurno, setModalTurno] = useState(false);

    const buscarPaciente = async (e) => {
        try {
            const response = await Api.buscarPaciente(search)
            setDatos(response)
            setTurno(InitialTurno)
            obtenerTurno()
        } catch (error) {
            if (error.status === 7000) setError(error.message)
            else setError("No hay paciente con el DNI ingresado")
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
            Api.modificarPaciente(datos)
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

        let regexNombre   = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;/// Letras y espacios, pueden llevar acentos.

        if (!datos.nombre.trim()){
            setErrorNombre("El nombre es requerido");
        }else if(!regexNombre.test(datos.nombre.trim())) {
            setErrorNombre("El nombre sólo acepta letras y espacios en blanco")
        } else {
            setErrorNombre("")
        }
    }

    const handleBlurNombre = (e) => {
        let regexNombre   = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;/// Letras y espacios, pueden llevar acentos.

        if (!datos.nombre.trim()){
            setErrorNombre("El nombre es requerido");
        } else if(!regexNombre.test(datos.nombre.trim())) {
            setErrorNombre("El nombre sólo acepta letras y espacios en blanco")
        } else {
            setErrorNombre("")
        }
    }

    const cancelarModalNombre = () => {
        setModalNombre(false);
        setErrorNombre("El nombre es requerido");
        buscarPaciente();
    }

    const guardarApellido = (e) => {
        try {
            Api.modificarPaciente(datos)
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

        let regexApellido   = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;/// Letras y espacios, pueden llevar acentos.

        if (!datos.apellido.trim()){
            setErrorApellido("El apellido es requerido");
        }else if(!regexApellido.test(datos.apellido.trim())) {
            setErrorApellido("El apellido sólo acepta letras y espacios en blanco")
        } else {
            setErrorApellido("")
        }
    }

    const handleBlurApellido = (e) => {
        let regexApellido   = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;/// Letras y espacios, pueden llevar acentos.

        if (!datos.apellido.trim()){
            setErrorApellido("El apellido es requerido");
        }else if(!regexApellido.test(datos.apellido.trim())) {
            setErrorApellido("El apellido sólo acepta letras y espacios en blanco")
        } else {
            setErrorApellido("")
        }
    }

    const cancelarModalApellido = () => {
        setModalApellido(false);
        setErrorApellido("El apellido es requerido");
        buscarPaciente();
    }

    const guardarTelefono = (e) => {
        try {
            Api.modificarPaciente(datos)
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

        let regexTelefono = /^\d{7,14}$/; // 7 a 14 numeros.

        if (!datos.telefono.trim()){
            setErrorTelefono("El telefono es requerido");
        } else if(!regexTelefono.test(datos.telefono.trim())) {
            setErrorTelefono("El telefono sólo solo puede contener numeros y el máximo son 14")
        } else {
            setErrorTelefono("")
        }
    }

    const handleBlurTelefono = (e) => {
        let regexTelefono = /^\d{7,14}$/; // 7 a 14 numeros.

        if (!datos.telefono.trim()){
            setErrorTelefono("El telefono es requerido");
        } else if(!regexTelefono.test(datos.telefono.trim())) {
            setErrorTelefono("El telefono sólo solo puede contener numeros y el máximo son 14")
        } else {
            setErrorTelefono("")
        }
    }

    const cancelarModalTelefono = () => {
        setModalTelefono(false);
        setErrorTelefono("El telefono es requerido");
        buscarPaciente();
    }

    const borrarTurno = () => {
        try {
            const turnoBorrado = {
                fecha: turno.turno.fecha,
                hora: turno.turno.hora,
                dni: ""
            }

            Api.asignarTurno(turnoBorrado)
            .then(() => {
                setModalTurno(false);
                buscarPaciente();
            })
        } catch(error) {
            setModalTurno(false);
            setError("No se pudo borrar el turno.")
        }
    }

    const cancelarModalTurno = () => {
        setModalTurno(false);
        buscarPaciente();
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
                <ModalEdicion estado={modalNombre} cambiarEstado={setModalNombre}>
                    <FontAwesomeIcon icon={faUserEdit} className="turnosIcon"/>
                    <p className="tittleModal">Cambiar nombre</p>
                    <hr className="topModalhr"/>
                    <div className="bodyModalEdicion">
                        <input onChange={handleChangeNombre} onBlur={handleBlurNombre} class="inputCampo" placeHolder="Nuevo nombre..." type="text" name="nombre" id="nombreNuevo" />
                        {errorNombre?<span className = "errorMsgEdicion">{errorNombre}</span>:null}
                        <div className="grupoBotonesModalEdicion">
                            <button className="aceptarModal" type="submit" onClick={guardarNombre}>aceptar</button>
                            <button className="cancelarModal" onClick ={cancelarModalNombre}>cancelar</button>
                        </div>
                    </div>
                </ModalEdicion>
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
                <ModalEdicion estado={modalApellido} cambiarEstado={setModalApellido}>
                    <FontAwesomeIcon icon={faUserEdit} className="turnosIcon"/>
                    <p className="tittleModal">Cambiar apellido</p>
                    <hr className="topModalhr"/>
                    <div className="bodyModalEdicion">
                        <input onChange={handleChangeApellido} onBlur={handleBlurApellido} class="inputCampo" placeHolder="Nuevo apellido..." type="text" name="apellido" id="apellidoNuevo" />
                        {errorApellido?<span className = "errorMsgEdicion">{errorApellido}</span>:null}
                        <div className="grupoBotonesModalEdicion">
                            <button className="aceptarModal" type="submit" onClick={guardarApellido}>aceptar</button>
                            <button className="cancelarModal" onClick ={cancelarModalApellido}>cancelar</button>
                        </div>
                    </div>
                </ModalEdicion>
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
                <ModalEdicion estado={modalTelefono} cambiarEstado={setModalTelefono}>
                    <FontAwesomeIcon icon={faUserEdit} className="turnosIcon"/>
                    <p className="tittleModal">Cambiar telefono</p>
                    <hr className="topModalhr"/>
                    <div className="bodyModalEdicion">
                        <input onChange={handleChangeTelefono} class="inputCampo" placeHolder="Nuevo telefono..." type="number" name="telefono" id="telefonoNuevo" />
                        {errorTelefono?<span className = "errorMsgEdicion">{errorTelefono}</span>:null}
                        <div className="grupoBotonesModalEdicion">
                            <button className="aceptarModal" type="submit" onClick={guardarTelefono}>aceptar</button>
                            <button className="cancelarModal" onClick ={cancelarModalTelefono}>cancelar</button>
                        </div>
                    </div>
                </ModalEdicion>
                <hr className="datosHr"/>

                <p>TURNO:
                {(turno.turno != null && turno.turno.fecha != ""
                    ? <p>fecha: {turno.turno.fecha}, hora: {turno.turno.hora}</p> 
                    : <p>Sin turno</p>)
                }
                {(turno.turno != null && turno.turno.fecha != ""
                    ? <button className="edit-btn" type="submit" onClick={() => setModalTurno(true)}>
                        <FontAwesomeIcon icon={faTrash} className=""/>
                      </button> 
                    : "")
                }
                </p>
                <ModalEdicion estado={modalTurno} cambiarEstado={setModalTurno}>
                    <FontAwesomeIcon icon={faTrash} className="turnosIcon"/>
                    <p className="tittleModal">¿Desea borrar el turno?</p>
                    <hr className="topModalhr"/>
                    <div className="bodyModalEdicion">
                    <p className="turnoEnModalEdicion">TURNO:
                    {(turno.turno != null && turno.turno.fecha != ""
                        ? <p>fecha: {turno.turno.fecha}, hora: {turno.turno.hora}</p> 
                        : <p>Sin turno</p>)
                    }
                    </p>
                        <div className="grupoBotonesModalEdicion">
                            <button className="aceptarModal" type="submit" onClick={borrarTurno}>borrar</button>
                            <button className="cancelarModal" onClick ={cancelarModalTurno}>salir</button>
                        </div>
                    </div>
                </ModalEdicion>
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

