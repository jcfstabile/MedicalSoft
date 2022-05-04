import React from "react";
import {useState} from "react";
import api from './Api'

export const useForm = (initialForm,validateForm) => {
    const[form,setForm] = useState (initialForm);
    const[errors,setErrors] = useState ({}) ; //si el objeto no tiene ningun elemento durante la validacion significa que esta todo ok
    const[successRegister,setSuccessRegister] = useState (false);
    const[errorRegister,setErrorRegister] = useState (false);

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
                e.target.reset()
                setErrors({})
                setErrorRegister(false)
                setSuccessRegister(true)
                setTimeout(() => setSuccessRegister(false), 5000);
              })
              .catch((error) => {
                console.log(error.response)    
                setErrorRegister(true)
            })
          } 
        
    }
    
    return {
        form,
        errors,
        successRegister,
        errorRegister,
        handleBlur,
        handleChange,
        handleSubmit
    }
}



