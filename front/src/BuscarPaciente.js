import React,{Fragment,useEffect,useState} from "react";
import'./css/BuscarPaciente.css';
import BusquedaComponent from "./BusquedaComponent"
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faRectangleList} from "@fortawesome/free-solid-svg-icons"
import Api from "./Api";

const BuscarPaciente = () =>{
    const initialTurno = {
        turnos: [{
            fecha: "",
            hora: ""
        }]
    }

    const initialTurnoElegido = {
        fecha: "",
        hora: "",
        dni: ""
    }
    
    const[estadoModal,setEstadoModal] = useState(false)
    const[turnos,setTurnos] = useState(initialTurno)
    const[turnoElegido,setTurnoElegido] = useState(initialTurnoElegido)
    const[asignacionExitosa,setAsignacionExitosa] = useState(false)
    const [dniBuscado, setDniBuscado] = useState("")
    const[estadoBusqueda,setEstadoBusqueda] = useState(false)

    useEffect(() => {
        const obtenerTurnos = async () => {
            const response = await Api.buscarTurnos();
            setTurnos(response)
        }
        
        obtenerTurnos()
        setTurnoElegido(initialTurnoElegido)
    }, [estadoModal])
    
    const seleccionarTurno = (fecha, hora) => {
        const turno = {
            fecha: fecha,
            hora: hora,
            dni: dniBuscado
        }
        setTurnoElegido(turno)
    }

    const cancelarModal = () => {
        setEstadoModal(false);
        setAsignacionExitosa(false);
    }

    const reservarTurno = (e) => {
        Api.asignarTurno(turnoElegido)
        .then(() => {
            setAsignacionExitosa(true);
        })

        setTimeout(() => {
            cancelarModal();
            setEstadoBusqueda(true);
        }
        , 3000);
    }


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
            <div className="titulo">BUSCAR PACIENTE</div>
            <div className = "bodyAggPac2">
                <BusquedaComponent
                    estadoBusqueda={estadoBusqueda}
                    cambiarEstadoBusqueda={setEstadoBusqueda} 
                    activarModal={setEstadoModal} 
                    devolverDni={setDniBuscado} />
            </div>
            <Modal estado={estadoModal} cambiarEstado={setEstadoModal}>
                <FontAwesomeIcon icon={faRectangleList} className="turnosIcon"/>
                <p className="tittleModal">Turnos disponibles</p>
                <hr className="topModalhr"/>
                <table className="tablaTurnosContainer">
                    <tr>
                        <th>fecha</th>
                        <th>hora</th>
                    </tr>
                    {
                    <div className="turnosList">
                        {   
                        turnos.turnos.map(t =>
                            {if(turnoElegido.fecha == t.fecha
                                && turnoElegido.hora == t.hora) {
                                return (
                                    <div className="turnoLine active" onClick={(e) => seleccionarTurno(t.fecha, t.hora)} >
                                        <p>{t.fecha}</p>
                                        <p>{t.hora}</p>
                                    </div>
                                );
                            }
                            else {
                                return (
                                <div className="turnoLine" onClick={(e) => seleccionarTurno(t.fecha, t.hora)} >
                                    <p>{t.fecha}</p>
                                    <p>{t.hora}</p>
                                </div>
                                );
                            }
                            }
                        )
                        }
                    </div>
                    }
                </table>
                {asignacionExitosa? <p className="msgAsignarTurno">El turno fue asignado</p>:null}
                <div className="grupoBotonesModal">
                    <button className="aceptarModal" type="submit" onClick={reservarTurno}>aceptar</button>
                    <button className="cancelarModal" onClick ={cancelarModal}>cancelar</button>
                </div>
            </Modal>
        </div>
        </Fragment>
    )
}

export default BuscarPaciente;
