package ar.edu.unq.eis.medicalsoft

data class FechaHora  (val fecha : String, val hora : String)
data class TurnoAsignado (val turno : FechaHora?)
data class Turno  (val fecha : String, val hora : String, val dni : String)
data class Turnos (val turnos : Array<FechaHora>)

class TurnosService(val base : Persistencia) {
    fun obtenerTurnosDisponibles() : Turnos {
        return base.getTurnosDisponibles()
    }

    fun asignarTurno(turno: Turno) {
        base.updateTurno(turno.fecha, turno.hora, turno.dni)
    }

    fun obtenerTurnoAsignado(dni: String?): TurnoAsignado {
        return base.getTurnoPara(dni);
    }
}

