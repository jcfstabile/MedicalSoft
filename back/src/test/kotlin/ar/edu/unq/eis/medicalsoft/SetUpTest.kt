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
        println("beforeAll create pacientes turnos")
//        db.useTestingDB()
        MedicalSoft.start(db)
    }

    @BeforeEach
    fun beforeEach(){
        db.sqlUpdate("CREATE TABLE Pacientes (dni varchar(8) not null, nombre varchar(40), apellido varchar(40), telefono varchar(20), unique (dni));")
        db.sqlUpdate("CREATE TABLE Turnos (fecha date, hora time, dni varchar(8), unique (fecha, hora));")
        db.addTurno("9999-12-31", "11:22:00", "")
        db.addTurno("9999-02-03", "01:02:00", "22224444")
        db.addTurno("9999-10-20", "01:59:00", "")
    }

    @AfterEach
    fun tearDown(){
        db.sqlUpdate("DROP TABLE Pacientes;")
        db.sqlUpdate("DROP TABLE Turnos;")
    }


    @AfterAll
    fun  afterAll(){
        db.sqlUpdate("DROP DATABASE MedicalSoftTest;")
        MedicalSoft.stop()
    }

}