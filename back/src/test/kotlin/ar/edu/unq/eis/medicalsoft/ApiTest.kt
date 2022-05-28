package ar.edu.unq.eis.medicalsoft


import org.junit.jupiter.api.*
import org.junit.jupiter.api.Assertions.*

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class ApiTest : SetUpTest() {

    @Test
    fun `Turno endpoint con turno asignado a paciente`(){
        db.addTurno("8888-12-31", "11:22:00", "87654321")

        val payload = mapOf( "dni"  to  "87654321")
        val response = khttp.get(
            url = "http://localhost:7777/api/turno",
            params=payload
        )

        assertEquals(200, response.statusCode)
        assertEquals("{\"fecha\":\"8888-12-31\",\"hora\":\"11:22:00\"}", response.jsonObject.get("turno").toString())
    }

    @Test
    fun `Turnos endpoint listado de turnos del dia vacio`(){
        val payload = mapOf( "fecha"  to  "1888-12-31")
        val response = khttp.get(
            url = "http://localhost:7777/api/turnos",
            params = payload
        )

        assertEquals(200, response.statusCode)
        assertEquals("[]"
            , response.jsonObject["turnos"].toString())
    }

    @Test
    fun `Turnos endpoint listado de turnos del día ordenados por hora`(){
        db.addTurno("8888-12-31", "11:44:00", "91110044")
        db.addTurno("9999-12-28", "01:22:01", "91110001")
        db.addTurno("7777-12-31", "11:22:00", "91110002")
        db.addTurno("8888-12-31", "11:34:00", "91110034")

        val payload = mapOf( "fecha"  to  "8888-12-31")
        val response = khttp.get(
            url = "http://localhost:7777/api/turnos",
            params = payload
        )

        assertEquals(200, response.statusCode)
        assertEquals("[{\"fecha\":\"8888-12-31\",\"hora\":\"11:34:00\",\"dni\":\"91110034\"},{\"fecha\":\"8888-12-31\",\"hora\":\"11:44:00\",\"dni\":\"91110044\"}]"
            , response.jsonObject["turnos"].toString())
    }

    @Test
    fun `Turnos endpoint Asignar un turno`(){
        db.addTurno("8888-12-31", "11:22:00", "")
        val response_before = khttp.get(
            url = "http://localhost:7777/api/turnos",
        )
        assertEquals(200, response_before.statusCode)
        assertEquals("[{\"fecha\":\"9999-12-31\",\"hora\":\"11:22:00\"},{\"fecha\":\"9999-10-20\",\"hora\":\"01:59:00\"},{\"fecha\":\"8888-12-31\",\"hora\":\"11:22:00\"}]"
            , response_before.jsonObject["turnos"].toString())


        val response = khttp.patch(
            url = "http://localhost:7777/api/turnos",
            json = mapOf("fecha" to "8888-12-31",
                         "hora" to "11:22:00",
                         "dni" to "12345678"
                )
        )
        assertEquals(204, response.statusCode)


        val response_after = khttp.get(
            url = "http://localhost:7777/api/turnos",
        )
        assertEquals(200, response_after.statusCode)
        assertEquals("[{\"fecha\":\"9999-12-31\",\"hora\":\"11:22:00\"},{\"fecha\":\"9999-10-20\",\"hora\":\"01:59:00\"}]"
            , response_after.jsonObject["turnos"].toString())
    }

    @Test
    fun `Turnos endpoint todos los turnos disponibles`(){
        val response = khttp.get(
            url = "http://localhost:7777/api/turnos",
        )

        assertEquals(200, response.statusCode)
        assertEquals("[{\"fecha\":\"9999-12-31\",\"hora\":\"11:22:00\"},{\"fecha\":\"9999-10-20\",\"hora\":\"01:59:00\"}]"
                   , response.jsonObject["turnos"].toString())
    }

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

    @Test
    fun `Paciente endpoint Modificar`(){
        db.addPaciente("12333444", "Juan", "None", "23232323")

        val response = khttp.patch(
            url = "http://localhost:7777/api/paciente",
            json = mapOf( "apellido" to "Paol", "nombre" to  "Join" , "dni"  to  "12333444" , "telefono" to  "55556666")
        )
        assertEquals(204, response.statusCode)

        val paciente = db.getPaciente("12333444")
        assertEquals("Paol", paciente.apellido)
        assertEquals("Join", paciente.nombre)
        assertEquals("55556666", paciente.telefono)
    }
}