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
    fun `Agregar Paciente existente lanza excepcion`(){
        db.addPaciente("1234", "Nombre", "Apellido", "123456789" )
        assertThrows(ExcepcionExistePaciente::class.java) {
            db.addPaciente("1234", "Nombre", "Apellido", "123456789")
        }
    }
}