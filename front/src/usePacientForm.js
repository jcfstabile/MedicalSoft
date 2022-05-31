import React from "react";
import {useState} from "react";
import api from './Api'

export const usePacientForm = (initialForm,validateForm) => {
    const[form,setForm] = useState (initialForm);
    const[errors,setErrors] = useState ({}) ; //si el objeto no tiene ningun elemento durante la validacion significa que esta todo ok
    const[successRegister,setSuccessRegister] = useState (false);
    const[errorRegister,setErrorRegister] = useState (false);
    const[netError,setNetError] = useState (false);

    //variables que se van a ejecutar en los eventos
    const handleChange = (e) => {
        const {name,value} = e.target;
        setForm({
            ...form,
            [name] : value
        })
        setErrors(validateForm(form))
    };
    const handleBlur = (e) => {
        handleChange(e);
        setErrors(validateForm(form))
    };
    const handleSubmit = (e) => {;
        e.preventDefault();
        console.log(e.target)
        setErrors(validateForm(form));
        if(errors){
            api.agregarPaciente(form).then((res) => {
                setForm(initialForm)
                e.target.reset()
                setErrors({})
                setErrorRegister(false)
                setNetError(false)
                setSuccessRegister(true)
                setTimeout(() => setSuccessRegister(false), 5000);
              }).catch((error) => {
                if (error.response && error.response.status === 422) {
                    setErrorRegister(true)
                    setNetError(false)
                } else
                    setNetError(error)
                // if(error.response == undefined){
                //     setErrorRegister(false)
                //     setNoConectionError(true)
                //     console.log("el servidor no esta levantado")
                // }
                // else{
                //     setNoConectionError(false)
                //     setErrorRegister(true)
                //     console.log("servidor levantado")
                // }
            })
          } 
        
    }
    
    return {
        form,
        errors,
        successRegister,
        errorRegister,
        netError,
        handleBlur,
        handleChange,
        handleSubmit
    }
}



