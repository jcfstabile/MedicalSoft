import React from "react";
import {useState} from "react";
import api from './Api'

export const useForm = (initialForm,validateForm) => {
    const[form,setForm] = useState (initialForm);
    const[errors,setErrors] = useState ({}) ; //si el objeto no tiene ningun elemento durante la validacion significa que esta todo ok
    const[response,setResponse] = useState (null);

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
        setErrors(validateForm(form));
        if(errors){
            api.agregarPaciente(form).then((res) => {
                setResponse(true);
                setForm(initialForm);
                setTimeout(() => setResponse(false), 5000);
              });
          } else {
            return;
        }
    }
    
    return {
        form,
        errors,
        response,
        handleBlur,
        handleChange,
        handleSubmit
    }
}



