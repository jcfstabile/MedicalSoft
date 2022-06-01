package ar.edu.unq.eis.medicalsoft

import org.junit.jupiter.api.*
import org.junit.jupiter.api.Assertions.*

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class PersistenciaTest : SetUpTest() {

    @Test
    fun `Agregar Paciente no existente`(){
        assertEquals(1, db.addPaciente("1234", "Nombre", "Apellido", "123456789" ))
    }

    @Test
    fun `Intentar obtener un Paciente inexistente lanza excepcion`() {
        assertThrows(ExcepcionPacienteInexistente::class.java) {
            db.getPaciente("99999999")
        }
    }

    @Test
    fun `Modificar paciente existente`(){
        db.addPaciente("12344321", "Keith", "Richar", "0" )
        db.modPaciente("12344321", "Mick", "Jagg", "0" )

        val paciente = db.getPaciente("12344321")
        assertEquals("Mick", paciente.nombre)
        assertEquals("Jagg", paciente.apellido)
        assertEquals("0", paciente.telefono)
        assertEquals("12344321", paciente.dni)
    }

    @Test
    fun `Obtener turnos asignados vacio`() {
        val turnos = db.getTurnosAsignadosDel("9999-02-02")
        assertTrue(turnos.turnos.isEmpty())
    }

    @Test
    fun `Obtener turnos asignados`() {
        val turnos = db.getTurnosAsignadosDel("9999-02-03")
        assertEquals("9999-02-03", turnos.turnos[0].fecha )
        assertEquals("01:02:00", turnos.turnos[0].hora )
        assertEquals("22224444", turnos.turnos[0].dni )
    }

    @Test
    fun `Obtener pacientes ordenados por dni`() {
        val dni1 = "11111111"
        val dni2 = "22222222"
        val dni3 = "33333333"
        val telefono = "76549012"
        val nombre = "A"
        val apellido = "A"
        db.addPaciente(dni2, nombre, apellido, telefono)
        db.addPaciente(dni1, nombre, apellido, telefono)
        db.addPaciente(dni3, nombre, apellido, telefono)

        val pacientes = db.getPacientes()

        assertEquals(dni1, pacientes.pacientes[0].dni)
        assertEquals(dni2, pacientes.pacientes[1].dni)
        assertEquals(dni3, pacientes.pacientes[2].dni)
        assertEquals(nombre, pacientes.pacientes[0].nombre)
        assertEquals(apellido, pacientes.pacientes[1].apellido)
        assertEquals(telefono, pacientes.pacientes[2].telefono)
    }

    @Test
    fun `Obtener turnos disponibles`() {
        val turnos = db.getTurnosDisponibles()
        assertEquals("9999-12-31", turnos.turnos[0].fecha )
        assertEquals("11:22:00", turnos.turnos[0].hora )
        assertEquals("9999-10-20", turnos.turnos[1].fecha )
        assertEquals("01:59:00", turnos.turnos[1].hora )
    }

    @Test
    fun `Obtener Paciente existente`() {
        db.addPaciente("1234", "Frank", "Zappa", "0" )

        val paciente = db.getPaciente("1234")

        assertEquals("Frank", paciente.nombre)
        assertEquals("Zappa", paciente.apellido)
        assertEquals("0", paciente.telefono)
        assertEquals("1234", paciente.dni)
    }

    @Test
    fun `Agregar Paciente existente lanza excepcion`(){
        db.addPaciente("1234", "Nombre", "Apellido", "123456789" )
        assertThrows(ExcepcionExistePaciente::class.java) {
            db.addPaciente("1234", "Nombre", "Apellido", "123456789")
        }
    }
}