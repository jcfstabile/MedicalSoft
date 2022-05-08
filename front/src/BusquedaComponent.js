import {Fragment, useState } from "react";
import Api from "./Api";


const initialForm = {
    dni : ""
};

const InitalData = {
    dni : "",
    nombre : "",
    apellido : "",
    telefono : ""
}

const BusquedaComponent = () =>{
    const [search,setSearch] = useState (initialForm)
    const [datos,setDatos] = useState (InitalData)
    const [error,setError] = useState ("")

    const buscarPaciente = async () => {
        const data = await Api.buscarPaciente(search)
        setDatos(data);
        console.log(datos);
    };

    const handleChange = (e) => {
        let regexDNI = /^[\d]{1,3}\.?[\d]{3,3}\.?[\d]{3,3}$/; // 4 a 10 digitos.
        console.log(e.target.value);
        setSearch(e.target.value);
        
        if(!search.trim() || !regexDNI.test(search.trim())){
            setError("EL CAMPO D.N.I NO TIENE UN FORMATO CORRECTO (EJEMPLO:000000000")
        }else{
            setError("")
            console.log("no hay ningun error")
        }
    };

    const handleBlur = (e) => {
        let regexDNI = /^[\d]{1,3}\.?[\d]{3,3}\.?[\d]{3,3}$/; // 4 a 10 digitos.

        if(!search.trim() || !regexDNI.test(search.trim())){
            setError("EL CAMPO D.N.I NO TIENE UN FORMATO CORRECTO (EJEMPLO:000000000")
        }else{
            setError("")
            console.log("no hay ningun error")
        }
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
                {error? <p className = "errorMsgBuscarPac">{error}</p> : null}
            </div>
            <div className="datosTraidos">
                <p>DNI: <p>{datos.dni}</p></p>
                <p>NOMBRE: <p>{datos.nombre}</p></p>
                <p>APELLIDO: <p>{datos.apellido}</p></p>
                <p>TELEFONO: <p>{datos.telefono}</p></p>
            </div>

        </Fragment> 
    )
};

export default BusquedaComponent;
