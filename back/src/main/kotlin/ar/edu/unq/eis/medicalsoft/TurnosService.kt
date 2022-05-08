package ar.edu.unq.eis.medicalsoft

data class TurnoDisponible  (val fecha : String, val hora : String)
data class Turno  (val fecha : String, val hora : String, val dni : String)
data class Turnos (val turnos : Array<TurnoDisponible>)

class TurnosService(val base : Persistencia) {
    fun obtenerTurnosDisponibles() : Turnos {
        return base.getTurnosDisponibles()
    }
}

