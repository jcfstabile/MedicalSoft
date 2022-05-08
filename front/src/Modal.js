//componente modal reutilizable
import { Fragment } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import './css/Modal.css'

const Modal = ({children,estado,cambiarEstado}) => {

    return(
        <Fragment>
            {estado &&
            <div className="overlayModal">
                <div className="contenedorModal">
                    <FontAwesomeIcon className ="xCerrarModal"icon ={faXmark}  onClick ={()=>cambiarEstado(!estado)} border/>
                    {children}
                </div>
            </div>
            }
        </Fragment>
    )
}

export default Modal;
