package ar.edu.unq.eis.medicalsoft

import com.mysql.cj.jdbc.exceptions.CommunicationsException
import java.sql.*

class ExcepcionExistePaciente(val mensaje : String ) : RuntimeException(mensaje)
class ExcepcionPacienteInexistente(val mensaje : String ) : RuntimeException(mensaje)

class Persistencia {

    internal val conn : Connection?

    constructor() {
        conn = dbConnection()
    }

    fun useTestingDB(){
        sqlUpdate("USE MedicalSoftTest")
    }

    fun useProductionDB(){
        sqlUpdate("USE MedicalSoft")
    }

    fun showDatabases() {
        val list = sqlQuery("SHOW DATABASES;")
        println(list)
    }

    fun sqlUpdate(query : String) : Int {
        var stmt: Statement? = null
        var count : Int = 0

        try {
            stmt = conn!!.createStatement()
            println(query)
            count = stmt.executeUpdate(query)
        } catch (ex: SQLIntegrityConstraintViolationException ) {
            throw ExcepcionExistePaciente("Paciente existe")
        } catch (ex: SQLException) {
            ex.printStackTrace()
        } finally {
            if (stmt != null) {
                try {
                    stmt.close()
                } catch (sqlEx: SQLException){}

                stmt = null
            }
        }
        return count
    }
    fun sqlQuery(query : String) : ResultSet? {
        var stmt: Statement? = null
        var resultset: ResultSet? = null

        try {
            stmt = conn!!.createStatement()
            resultset = stmt.executeQuery(query)
        } catch (ex: SQLException) {
            ex.printStackTrace()
        } finally {
//            if (stmt != null)
//                try {
//                    stmt.close()
//                } catch (sqlEx: SQLException){}
//
//                stmt = null
//            }
        }
        return resultset
    }


    fun dbConnection() : Connection? {
        var connection : Connection? = null

        try {
            Class.forName("com.mysql.cj.jdbc.Driver").getDeclaredConstructor().newInstance()
            connection = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306", "root", "root"
            )

            // com.mysql.cj.jdbc.exceptions.CommunicationsException: Communications link failure
        } catch (ex: CommunicationsException) {
            println("Falta levantar el server MySQL?")
        }  catch (ex: SQLException) {
            ex.printStackTrace()
        }

        return connection
    }

    fun getPaciente(dni : String) : Paciente {
        val rs = sqlQuery(
            """
                SELECT * FROM Pacientes
                WHERE dni LIKE ${dni};
            """.trimIndent()
        )
        if (! rs!!.next()) {
            throw ExcepcionPacienteInexistente("No existe paciente con DNI: ${dni}")
        }
        return Paciente(rs!!.getString("apellido"), rs!!.getString("nombre"), rs!!.getString("dni"), rs!!.getString("telefono"))
    }

    fun addPaciente(dni : String, nombre : String, apellido : String, telefono : String): Int {
        return sqlUpdate(
            """
                INSERT INTO Pacientes (dni, nombre, apellido, telefono)
                VALUES('${dni}', '${nombre}', '${apellido}', '${telefono}');
                """
        )
    }

    fun updateTurno(fecha : String, hora : String, dni : String) : Int {
        return sqlUpdate(
            """
                UPDATE Turnos
                SET dni = '${dni}'
                WHERE fecha = '${fecha}' AND hora = '${hora}';
            """.trimIndent()
        )
    }

    fun addTurno(fecha : String, hora : String, dni : String) : Int {
        return sqlUpdate(
            """
                INSERT INTO Turnos (dni, fecha, hora)
                VALUES('${dni}', '${fecha}', '${hora}');
            """.trimIndent()
        )
    }

    fun getTurnosDisponibles() : Turnos {
        var turnos : Array<FechaHora> = arrayOf()
        val rs = sqlQuery(
            """
                SELECT * FROM Turnos 
                WHERE dni LIKE "";
            """.trimIndent()
        )

        while (rs!!.next()) {
            turnos += FechaHora(rs!!.getString("fecha"), rs!!.getString("hora"))
        }

       return (Turnos(turnos))
    }

    fun getTurnoPara(dni: String?): TurnoAsignado {
        val rs = sqlQuery(
            """
                SELECT * FROM Turnos 
                WHERE dni LIKE '${dni}';
            """.trimIndent()
        )

        return if (rs!!.next())
                    TurnoAsignado(FechaHora(rs!!.getString("fecha"), rs!!.getString("hora")))
               else
                    TurnoAsignado(null)

    }

    fun modPaciente(dni : String, nombre : String, apellido : String, telefono : String): Int {
        return sqlUpdate(
            """
                UPDATE Pacientes
                SET nombre = '${nombre}', apellido = '${apellido}', telefono =  '${telefono}'
                WHERE dni = '${dni}';
                """
        )
    }
}