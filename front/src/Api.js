// IMPORTANTE : aca van a ir todas las querys ya sea pedir turnos borrar un turno etc

import axios from 'axios'

const host = 'http://localhost:7777';


function agregarPaciente( payload){
    return axios.post(host.concat('/api/paciente'), payload)
}

function login (datosUsuario){
    return axios.post(host.concat('/api/login'),datosUsuario)
}

function buscarPaciente(dni) {
    return axios.post(host.concat('/api/paciente'), dni)
}

function traerPaciente() {
    return axios.get(host.concat('/api/paciente'))
}

export default{
    agregarPaciente,
    login
}