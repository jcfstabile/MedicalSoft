// IMPORTANTE : aca van a ir todas las querys ya sea pedir turnos borrar un turno etc

import axios from 'axios'

const host = 'http://localhost:7777';


function agregarPaciente(payload){
    return axios.post(host.concat('/api/paciente'), payload)
}

function login (datosUsuario){
    return axios.post(host.concat('/api/login'),datosUsuario)
}

function asignarTurno(turno){
    return axios.patch(host.concat('/api/turnos'), turno)
}

function buscarPaciente(dniSearch) {
    const url = host.concat('/api/paciente?dni=' + dniSearch)
    return axios
        .get(url)
        .then(response => response.data)
}

function buscarTurnos(){
    const url = host.concat('/api/turnos')
    return axios
        .get(url)
        .then(response => response.data)
}

function buscarTurnosAsignados(){
    const url = host.concat('/api/turnos?fecha=9990-12-21')
    return axios
        .get(url)
        .then(response =>response.data)
}

function buscarTurno(dni){
    const url = host.concat('/api/turno?dni='+dni)
    return axios
        .get(url)
        .then(response => response.data)
}

function modificarPaciente(paciente){
    return axios.patch(host.concat('/api/paciente'), paciente)
}

export default{
    agregarPaciente,
    login,
    buscarPaciente,
    buscarTurnos,
    buscarTurnosAsignados,
    asignarTurno,
    buscarTurno,
    modificarPaciente
    
}