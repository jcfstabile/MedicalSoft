package ar.edu.unq.eis.medicalsoft

data class Paciente(val apellido : String, val nombre : String, val dni : String, val telefono : String )
data class Pacientes (val pacientes : Array<Paciente>)

class PacienteService(val base : Persistencia) {
    fun agregar(paciente : Paciente) {
        base.addPaciente(paciente.dni, paciente.nombre, paciente.apellido, paciente.telefono)
    }

    fun obtener(dni: String?) : Paciente {
        return base.getPaciente(dni!!)
    }

    fun modificar(paciente: Paciente) {
        base.modPaciente(paciente.dni, paciente.nombre, paciente.apellido, paciente.telefono)
    }

    fun obtenerTodos(): Pacientes {
        return base.getPacientes()
    }
}
