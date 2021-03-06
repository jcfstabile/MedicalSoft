import { Fragment,useState,useEffect} from "react";
import { Link } from "react-router-dom";
import './css/Turnos.css'
import Api from "./Api";


const initialTurno = {
    turnos: []
}

const TurnosAsignados =() => {
    const[turnos,setTurnos] = useState(initialTurno)

    useEffect(() => {
        const obtenerTurnosAsignados = async () => {
            const response = await Api.buscarTurnosAsignados();
            setTurnos(response)
            console.log(response)
        }
        obtenerTurnosAsignados()
    }, [])


    return(
    <Fragment>
        <div className="containerTurnosAsign">
            <div className="logoheaderImagen">
                <div className="flecha">
                    <Link to='/home'>&lt;</Link>
                </div>
                <img src='/images/logoNombre.png' alt='' width="100%" />
            </div>
            <hr/>
            <p className="tituloTurnosAsign">Turnos asignados</p>
            <body className="bodyTurnosAsign">
            <table className="tablaTurnosContainer2">
                    <tr>
                        <th>fecha</th>
                        <th>hora</th>
                        <th>dni</th> 
                    </tr>
                    {
                    <div className="turnosList2">
                        {
                        (turnos.turnos.length == 0)
                        ? <p className="mensajeTurnosAsign">No se han asignado turnos</p>
                        : turnos.turnos.map(t => {
                            return (
                            <tr>
                                <td>{t.fecha}</td>
                                <td>{t.hora}</td>
                                <td>{t.dni}</td>
                            </tr>     
                            )
                            })
                        }
                    </div>
                    }
                    </table>
            </body>
        </div>
    </Fragment>

)
}

export default TurnosAsignados;
