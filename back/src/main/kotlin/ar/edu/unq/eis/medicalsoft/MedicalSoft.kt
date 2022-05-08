package ar.edu.unq.eis.medicalsoft

import io.javalin.Javalin

data class Usuario(val username : String, val password : String)

data class Paciente(val apellido : String, val nombre : String, val dni : String, val telefono : String )

object Administador {
    val nombre = "administrador"
    val password = "1234"
}

object Medico {
    val nombre : String = "medico"
    val password : String = "1234"
}

object MedicalSoft {

    internal lateinit var app : Javalin
    internal lateinit var base : Persistencia

    @JvmStatic fun start( _base : Persistencia) {
        base = _base

        javalinUp()
    }

    fun stop() {
        app.stop()
    }


//    if (resultset != null) {
//        try {
//            resultset.close()
//        } catch (sqlEx: SQLException) {}
//
//        resultset = null
//    }


    fun javalinUp() {

        app = Javalin.create {
            it.enableCorsForAllOrigins()
        }.start(7777)

        app.post("/api/login") { ctx ->
            val usuario = ctx.bodyAsClass(Usuario::class.java)
            if (    (usuario.username == Administador.nombre && usuario.password == Administador.password)
                ||  (usuario.username == Medico.nombre && usuario.password == Medico.password))
                ctx.status(200)
            else
                ctx.status(401)
        }

        app.get("/api/paciente") { ctx ->
            val dni = ctx.queryParam("dni")
            try {
                val paciente = PacienteService(base).obtener(dni)
                ctx.status(200).json(paciente)
            } catch (es : ExcepcionPacienteInexistente) {
                ctx.status(404)
            }
        }

        app.post("/api/paciente") { ctx ->
            val paciente = ctx.bodyAsClass(Paciente::class.java)
            println(paciente)
            try {
                PacienteService(base).agregar(paciente)
                ctx.status(201)
            } catch (es : ExcepcionExistePaciente) {
                ctx.status(422)
            }

        }

        app.get("/api/turnos") { ctx ->
//             data class Turno(val fecha : String, val hora : String )
//             data class Turnos(val turnos : Array<Turno>)
            //val turnos = Turnos(arrayOf(Turno("9999-12-31", "11:22:00", "")))
            val turnos = TurnosService(base).obtenerTurnosDisponibles()
            ctx.status(200)
            ctx.json(turnos)
        }

    }
}

data class TurnoDisponible  (val fecha : String, val hora : String)
data class Turno  (val fecha : String, val hora : String, val dni : String)
data class Turnos (val turnos : Array<TurnoDisponible>)

class TurnosService(val base : Persistencia) {
   fun obtenerTurnosDisponibles() : Turnos {
      return base.getTurnosDisponibles()
   }
}

class PacienteService(val base : Persistencia) {
    fun agregar(paciente : Paciente) {
        base.addPaciente(paciente.dni, paciente.nombre, paciente.apellido, paciente.telefono)
    }

    fun obtener(dni: String?) : Paciente {
        return base.getPaciente(dni!!)
    }
}

fun main() {
    val persistencia = Persistencia()
    persistencia.useProductionDB()
    MedicalSoft.start(persistencia)
}