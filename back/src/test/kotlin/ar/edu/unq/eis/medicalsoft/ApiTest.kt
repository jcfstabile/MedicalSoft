package ar.edu.unq.eis.medicalsoft


import org.junit.jupiter.api.*
import org.junit.jupiter.api.Assertions.*

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class ApiTest : SetUpTest() {

    @Test
    fun `Login endpoint usuario esta autorizado`(){
        val response = khttp.post(
            url = "http://localhost:7777/api/login",
            json = mapOf("usuario" to "administrador", "password" to "1234")
        )
        assertEquals(200, response.statusCode)
    }

    @Test
    fun `Login endpoint usuario no autorizado`(){
        val response = khttp.post(
            url = "http://localhost:7777/api/login",
            json = mapOf("usuario" to "value1", "password" to "valuen")
        )
        assertEquals(401, response.statusCode)
    }

    @Test
    fun `Paciente endpoint Agregar` () {
        val response = khttp.post(
            url = "http://localhost:7777/api/paciente",
            json = mapOf( "apellido" to "Perez", "nombre" to  "Jose" , "dni"  to  "12333444" , "telefono" to  "55556666")
        )
        assertEquals(201, response.statusCode)
    }

    @Test
    fun `Paciente endpoint Agregar ya existente` () {
        var response = khttp.post(
            url = "http://localhost:7777/api/paciente",
            json = mapOf( "apellido" to "Perez", "nombre" to  "Jose" , "dni"  to  "12333444" , "telefono" to  "55556666")
        )
        assertEquals(201, response.statusCode)
       response = khttp.post(
            url = "http://localhost:7777/api/paciente",
            json = mapOf( "apellido" to "Perez", "nombre" to  "Jose" , "dni"  to  "12333444" , "telefono" to  "55556666")
        )
        assertEquals(422, response.statusCode)
    }
}