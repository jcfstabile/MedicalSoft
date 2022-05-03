import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "./useForm";
import { Fragment } from "react";

const initialForm = {
    dni:"",
    nombre:"",
    apellido:"",
    telefono:""
};

const validationsForm = (form) => {
    let errors = {}
	let regexDNI = /^[\d]{1,3}\.?[\d]{3,3}\.?[\d]{3,3}$/; // 4 a 12 digitos.
    let regexNombre   = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;/// Letras y espacios, pueden llevar acentos.
	let regexApellido = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;/// Letras y espacios, pueden llevar acentos.
	let regexTelefono = /^\d{7,14}$/; // 7 a 14 numeros.

    if (!form.dni.trim()){
        errors.dni = "El campo 'D.N.I' es requerido"
    }else if(!regexDNI.test(form.dni.trim())) {
        errors.dni = "El campo D.N.I no tiene un formato correcto (Ejemplo:000000000)"
    }
    if (!form.nombre.trim()){
        errors.nombre = "El campo 'Nombre' es requerido"
    }else if(!regexNombre.test(form.nombre.trim())) {
        errors.nombre = "El campo 'Nombre' sólo acepta letras y espacios en blanco"
    }
    if (!form.apellido.trim()){
        errors.apellido= "El campo 'Apellido' es requerido"
    }else if(!regexApellido.test(form.apellido.trim())) {
        errors.apellido= "El campo'Apellido' sólo acepta letras y espacios en blanco"
    }   
    if (!form.telefono.trim()){
        errors.telefono= "El campo 'Numero de Contacto' es requerido"
    }else if(!regexTelefono.test(form.telefono.trim())) {
        errors.telefono= "El campo 'Numero de Contacto solo puede contener numeros y el máximo son 14"
    }

    return errors
}

const PacientForm = () => {
    const {
        form,
        errors,
        successRegister,
        errorRegister,
        handleChange,
        handleBlur,
        handleSubmit
    } = useForm(initialForm,validationsForm);

    const navigate = useNavigate();
    const reload = () => {
        navigate(0);
    }

    return(
        <Fragment>
           <form className="datosPaciente" onSubmit={handleSubmit} >
                <h3> AGREGAR  PACIENTE</h3>
                <br></br>
                
                <br/>
                <label for="dni"className="labelAggPaciente">D.N.I</label>
                {errors.dni && <FontAwesomeIcon icon={faCircleXmark} className="errorIcon"/>}
                <input type="text" name="dni" id="dni" onBlur={handleBlur} onChange={handleChange} value={form.dni} />
                {errors.dni &&<p className="mensajeError">{errors.dni}</p>}
                <div className="groupNombre">
                    <div className="nombreg">
                        <label for="nombre" className="labelAggPaciente">NOMBRE</label>
                        {errors.nombre && <FontAwesomeIcon icon={faCircleXmark} className="errorIcon"/>}
                        <input type="text" name="nombre" id="nombre" onBlur={handleBlur} onChange={handleChange} value={form.name} />
                        {errors.nombre &&<p className="mensajeError">{errors.nombre}</p>}
                    </div>   
                    <div className="apellidog">
                        <label for="apellido"className="labelAggPaciente">APELLIDO </label>
                        {errors.apellido && <FontAwesomeIcon icon={faCircleXmark} className="errorIcon"/>}
                        <input type="text" name="apellido" id="apellido" onBlur={handleBlur} onChange={handleChange} value={form.apellido} />                    
                        {errors.apellido &&<p className="mensajeError">{errors.apellido}</p>}
                   </div>

                </div>
                <label for="telefono"className="labelAggPaciente">NUMERO DE CONTACTO </label>
                {errors.telefono && <FontAwesomeIcon icon={faCircleXmark} className="errorIcon"/>}
                <input type="Number" name="telefono" id="telefono" onBlur={handleBlur} onChange={handleChange} value={form.telefono} />                
                {errors.telefono &&<p className="mensajeError">{errors.telefono}</p>}
                <br></br>
                <div className="botonesAggPac">
                    <button className = "agregarAggPac" type="submit" id="btn-submit" >AGREGAR</button>
                    <button className ="cancelarAggPac" onClick={reload}>CANCELAR</button>
                </div>
                {successRegister && (<div className="feedBackMsg"><FontAwesomeIcon icon={faCheckCircle} className ="feedbackIcon"/><p className="msgFeedback">Paciente agregado exitosamente</p></div>)}
                {errorRegister &&(<div className="feedBackMsg"><FontAwesomeIcon icon={faTriangleExclamation} className = "feedbackIcon"/><p className="msgFeedback">No se pudo agregar el paciente porque ya existe</p></div>)}
            </form>
        </Fragment>
        
        
    )
}

export default PacientForm;

