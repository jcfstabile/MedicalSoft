package ar.edu.unq.eis.medicalsoft


import org.junit.jupiter.api.*
import org.junit.jupiter.api.Assertions.*
import khttp.get as apiGet

@TestInstance(TestInstance.Lifecycle.PER_CLASS)

class ApiTest {
    @BeforeAll
    fun setUp(){
        MedicalSolf.start()
    }

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

}