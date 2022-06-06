import { Fragment,useState,useEffect} from "react";
import { Link } from "react-router-dom";
import './css/PacientList.css'
import Api from "./Api";


const initialPaciente = {
    pacientes: []
}

const PacientesList =() => {
    const[pacientes,setPacientes] = useState(initialPaciente)

    useEffect(() => {
        const obtenerListaPacientes = async () => {
            const response = await Api.buscarPacientes();
            setPacientes(response)
            console.log(response)
        }
        obtenerListaPacientes()
    }, [])


    return(
    <Fragment>
        <div className="containerPacientList">
            <div className="logoheaderImagen">
                <div className="flecha">
                    <Link to='/home'>&lt;</Link>
                </div>
                <img src='/images/logoNombre.png' alt='' width="100%" />
            </div>
            <hr/>
            <p className="tituloPacientList">Listado de pacientes</p>
            <body className="bodyPacientList">
            <table className="tablaPacientContainer2">
                    <tr>
                        <th>nombre</th>
                        <th>apellido</th>
                        <th>dni</th>
                        <th>telefono</th>
                    </tr>
                    {
                    <div className="pacientList">
                        {
                        (pacientes.pacientes.length == 0)
                        ? <p className="mensajePacientList">No hay pacientes ingresados</p>
                        : pacientes.pacientes.map(p => {
                            return (
                            <tr>
                                <td>{p.nombre}</td>
                                <td>{p.apellido}</td>
                                <td>{p.dni}</td>
                                <td>{p.telefono}</td>
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

export default PacientesList;
