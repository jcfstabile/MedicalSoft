package ar.edu.unq.eis.medicalsoft

import io.javalin.Javalin

data class Usuario(val usuario : String, val password : String)

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
            if (    (usuario.usuario == Administador.nombre && usuario.password == Administador.password)
                ||  (usuario.usuario == Medico.nombre && usuario.password == Medico.password))
                ctx.status(200)
            else
                ctx.status(401)
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
    }
}

class PacienteService(val base : Persistencia) {
    fun agregar(paciente : Paciente) {
        base.addPaciente(paciente.dni, paciente.nombre, paciente.apellido, paciente.telefono)
    }
}

fun main() {
    val persistencia = Persistencia()
    persistencia.useProductionDB()
    MedicalSoft.start(persistencia)
}