package org.example

import org.junit.jupiter.api.*
import org.junit.jupiter.api.Assertions.*
import khttp.get as apiGet
import khttp.*


// https://www.baeldung.com/kotlin/junit-5-kotlin

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class HelloTest {
    @BeforeAll
    fun setup() { // @BeforeAll - executes once before all test methods in this class.
        MySQLDatabaseExampleKotlin.main(ArrayList<String>(0).toTypedArray())
    }

    @BeforeEach
    fun init() { // @BeforeEach - executes before each test method in this class.
    }

    @Test
    fun `Api and mysql is up and responding`() {
        val response = khttp.get(url = "http://localhost:7777/list-of-databases")
        assertEquals(200,  response.statusCode)
    }

    @Test
    fun `Dividir por cero es malo`() {
        val exception = assertThrows(ArithmeticException::class.java)  {
            val a = 1 / 0
        }

        assertNotNull(exception)
    }

    @Test
    fun `Uno mas dos es tres`() {
        assertEquals(3, 1 + 2)
    }

    @Disabled
    @Test
    fun `disabled Test`() {
        assertTrue(false)
    }

    @AfterEach
    fun tearDown() { // @AfterEach - executed after each test method.
    }

    @AfterAll
    fun done() { //  @AfterAll - executed after all test methods.
    }
}