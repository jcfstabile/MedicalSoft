import { useForm } from "./useForm";
import { Fragment } from "react";

const initialForm = {
    dni:"",
    nombre:"",
    apellido:"",
    telefono:""
};

const validationsForm = (form) => {
    let errors = {

    }
    return errors
}

const PacientForm = () => {
    const {
        form,
        errors,
        loading,
        response,
        handleChange,
        handleBlur,
        handleSubmit
    } = useForm(initialForm,validationsForm);

    return(
        <Fragment>
           <form className="datosPaciente" onSubmit={handleSubmit}>
                <h3> AGREGAR  PACIENTE</h3>
                <br></br>
                <br></br>
                <br></br>
                    
                <br/>
                <label for="dni">D.N.I</label>
                <input type="number" name="dni" id="dni" onBlur={handleBlur} onChange={handleChange} value ={form.name} required/>
                <div className="groupNombre">
                    <div className="nombreg">
                        <label for="nombre">NOMBRE</label>
                        <input type="text" name="nombre" id="nombre" onBlur={handleBlur} onChange={handleChange} value = {form.name} required/>

                    </div>   
                    <div className="apellidog">
                        <label for="apellido">APELLIDO </label>
                        <input type="text" name="apellido" id="apellido" onBlur={handleBlur} onChange={handleChange} value = {form.apellido} required/>                    
                   </div>
                </div>
                <label for="telefono">NUMERO DE CONTACTO </label>
                <input type="Number" name="telefono" id="telefono" onBlur={handleBlur} onChange={handleChange} value = {form.telefono} required/>                

                <br></br>
                <div className="botonesAggPac">
                    <button className = "agregarAggPac" type="submit" id="btn-submit" >AGREGAR</button>
                    <button className ="cancelarAggPac" type="submit" id="btn-submit" >CANCELAR</button>
                </div>
            </form>
        </Fragment>
        
        
    )
}

export default PacientForm;

