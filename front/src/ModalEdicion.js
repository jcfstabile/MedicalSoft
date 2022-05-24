//componente modal reutilizable
import { Fragment } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import './css/ModalEdicion.css'

const ModalEdicion = ({children,estado,cambiarEstado}) => {

    return(
        <Fragment>
            {estado &&
            <div className="overlayModalEdicion">
                <div className="contenedorModalEdicion">
                    <FontAwesomeIcon className ="xCerrarModal"icon ={faXmark}  onClick ={()=>cambiarEstado(!estado)} border/>
                    {children}
                </div>
            </div>
            }
        </Fragment>
    )
}

export default ModalEdicion;