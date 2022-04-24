package ar.edu.unq.eis.medicalsoft

import org.junit.jupiter.api.*

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
open class SetUpTest {

    lateinit var db : Persistencia

    @BeforeAll
    fun beforeAll(){
        db = Persistencia()
        db.sqlUpdate("DROP DATABASE IF EXISTS MedicalSoftTest;")
        db.sqlUpdate("CREATE DATABASE MedicalSoftTest;")
        db.sqlUpdate("USE MedicalSoftTest;")
        println("beforeAll create pacientes")
//        db.useTestingDB()
        MedicalSoft.start(db)
    }

    @BeforeEach
    fun beforeEach(){
        db.sqlUpdate("CREATE TABLE Pacientes (dni varchar(8) not null, nombre varchar(40), apellido varchar(40), telefono varchar(20), unique (dni));")
    }

    @AfterEach
    fun tearDown(){
        db.sqlUpdate("DROP TABLE Pacientes;")
    }


    @AfterAll
    fun  afterAll(){
        db.sqlUpdate("DROP DATABASE MedicalSoftTest;")
        MedicalSoft.stop()
    }

}