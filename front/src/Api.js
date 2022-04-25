// IMPORTANTE : aca van a ir todas las querys ya sea pedir turnos borrar un turno etc

import axios from 'axios'

const host = 'http://localhost:3000';


function agregarPaciente( payload){
    return axios.post(host.concat('/agregarpaciente'), payload)
}

export default{
    agregarPaciente
}