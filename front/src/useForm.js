import React from "react";
import {useState} from "react";

export const useForm = (initialForm,validateForm) => {
    const[form,setForm] = useState (initialForm);
    const[errors,setErrors] = useState ({}) ; //si el objeto no tiene ningun elemento durante la validacion significa que esta todo ok
    const[loading,setLoading] = useState (false);
    const[response,setResponse] = useState (null);

    //variables que se van a ejecutar en los eventos
    const handleChange = (e) => {
        const[name,value] = e.target;
        setForm({
            ...form,
            [name] : value
        })
    };
    const handleBlur = (e) => {
        handleChange(e);
        setErrors(validateForm(form))
    };
    const handleSubmit = (e) => {};

    return {
        form,errors,loading,response,handleBlur,handleChange,handleSubmit
    }
}



