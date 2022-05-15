package ar.edu.unq.eis.medicalsoft

class PacienteService(val base : Persistencia) {
    fun agregar(paciente : Paciente) {
        base.addPaciente(paciente.dni, paciente.nombre, paciente.apellido, paciente.telefono)
    }

    fun obtener(dni: String?) : Paciente {
        return base.getPaciente(dni!!)
    }
}
