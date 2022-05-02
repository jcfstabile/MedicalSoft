package ar.edu.unq.eis.medicalsoft


import org.junit.jupiter.api.*
import org.junit.jupiter.api.Assertions.*

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class ApiTest : SetUpTest() {

    @Test
    fun `Login endpoint usuario esta autorizado`(){
        val response = khttp.post(
            url = "http://localhost:7777/api/login",
            json = mapOf("username" to "administrador", "password" to "1234")
        )
        assertEquals(200, response.statusCode)
    }

    @Test
    fun `Login endpoint usuario no autorizado`(){
        val response = khttp.post(
            url = "http://localhost:7777/api/login",
            json = mapOf("username" to "value1", "password" to "valuen")
        )
        assertEquals(401, response.statusCode)
    }

    @Test
    fun `Paciente endpoint not found por dni inexistente` () {

        val payload = mapOf( "dni"  to  "99999999")
        val response = khttp.get(
            url = "http://localhost:7777/api/paciente",
            params=payload
        )
        assertEquals(404, response.statusCode)
    }

    @Test
    fun `Paciente endpoint Buscar por dni con exito` () {
        val values = mapOf( "apellido" to "L", "nombre" to  "O" , "dni"  to  "23418148" , "telefono" to  "")
        khttp.post(
            url = "http://localhost:7777/api/paciente",
            json = values
        )

        val payload = mapOf( "dni"  to  "23418148")
        val response = khttp.get(
            url = "http://localhost:7777/api/paciente",
            params=payload
        )

        assertEquals(200, response.statusCode)
        assertEquals("23418148", response.jsonObject.getString("dni"))
        assertEquals("L", response.jsonObject.getString("apellido"))
        assertEquals("O", response.jsonObject.getString("nombre"))
        assertEquals("", response.jsonObject.getString("telefono"))
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