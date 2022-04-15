package org.example
import com.mysql.cj.jdbc.exceptions.CommunicationsException
import java.sql.*
import java.util.Properties

import io.javalin.Javalin

val reservations = mutableMapOf<String?, String?>(
    "saturday" to "No reservation",
    "sunday" to "No reservation"
)


object  MySQLDatabaseExampleKotlin {
//    internal var connection: Connection? = null
    internal var username = "root"
    internal var password = "root"

    @JvmStatic fun main(args: Array<String>) {

        // start javalin server
        val app = Javalin.create {
//            it.addStaticFiles("/home/a/sandbox", Location.CLASSPATH)
            it.enableCorsForAllOrigins()
        }.start(7777)

        app.post("/make-reservation") { ctx ->
            reservations[ctx.formParam("day")] = ctx.formParam("time")
            ctx.html("Your reservation has been saved")
        }

        app.get("/list-of-databases") { ctx ->
            // ctx.html(reservations[ctx.queryParam("day")]!!)

            //var bases : String = "bases:\n"
            var bases = object {
                val listOfBases = executeSQLQuery(getConnection())
            }

            ctx.json(bases)
            ctx.status(200)

        }

        app.get("/") { ctx -> ctx.result("Hola desde javalin result")}

        app.exception(NullPointerException::class.java) { e, ctx ->
            val msg = object { val msg = "Falta levantar el servidor MySQL? $e" }
            ctx.result(msg.msg).status(503)
        }
        // end javalin server
    }

    fun executeSQLQuery(conn : Connection?) : MutableList<String> {
        var stmt: Statement? = null
        var resultset: ResultSet? = null
        val listOfDatabases: MutableList<String> = mutableListOf()

        try {
            stmt = conn!!.createStatement()
            resultset = stmt.executeQuery("SHOW DATABASES;")


            while (resultset!!.next()) {
                val row : String = resultset.getString("Database")
                println(row)
                listOfDatabases.add(row)
            }
        } catch (ex: SQLException) {
            ex.printStackTrace()
        } finally {
            if (resultset != null) {
                try {
                    resultset.close()
                } catch (sqlEx: SQLException) {}

                resultset = null
            }

            if (stmt != null) {
                try {
                    stmt.close()
                } catch (sqlEx: SQLException){}

                stmt = null
            }

            // if (conn != null) {
            //     try {
            //         conn.close()
            //     } catch (sqlEx: SQLException){}

            //     conn = null
            // }
        }
        return listOfDatabases // add by jcfs
    }

    fun getConnection() : Connection? {
        var connection : Connection? = null
        val connectionProps = Properties()
        connectionProps.put("user", username)
        connectionProps.put("password", password)

        try {
            Class.forName("com.mysql.cj.jdbc.Driver").getDeclaredConstructor().newInstance()
            connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/", connectionProps
            )
            // com.mysql.cj.jdbc.exceptions.CommunicationsException: Communications link failure
        } catch (ex: CommunicationsException) {
            println("Falta levantar el server MySQL?")
        }  catch (ex: SQLException) {
            ex.printStackTrace()
        }

        return connection
    }
}
// fun main(args: Array<String>) {
//     println("Hello, World")
// }

