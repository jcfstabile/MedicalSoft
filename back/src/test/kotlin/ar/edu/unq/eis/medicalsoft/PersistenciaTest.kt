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