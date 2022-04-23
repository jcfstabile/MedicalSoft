package ar.edu.unq.eis.medicalsoft

import io.javalin.Javalin

data class Usuario(val usuario : String, val password : String)

object Administador {
    val nombre = "administrador"
    val password = "1234"
}

object Medico {
    val nombre : String = "medico"
    val password : String = "1234"
}

object MedicalSolf {

    internal lateinit var app : Javalin;

    @JvmStatic fun start(){
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

    }

}
