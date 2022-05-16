USE MedicalSoft;
DROP TABLE IF EXISTS Turnos;
CREATE TABLE Turnos ( fecha date DEFAULT NULL, hora time DEFAULT NULL, dni varchar(8) DEFAULT NULL, UNIQUE KEY (fecha,hora) );
INSERT INTO Turnos (dni, fecha, hora)
VALUES('', '2022-10-20', '10:00:00');
INSERT INTO Turnos (dni, fecha, hora)
VALUES('', '2022-10-20', '10:15:00');
INSERT INTO Turnos (dni, fecha, hora)
VALUES('', '2022-10-20', '10:30:00');
INSERT INTO Turnos (dni, fecha, hora)
VALUES('', '2022-10-20', '10:45:00');
INSERT INTO Turnos (dni, fecha, hora)
VALUES('', '2022-10-20', '11:00:00');
INSERT INTO Turnos (dni, fecha, hora)
VALUES('', '2022-10-20', '11:15:00');
INSERT INTO Turnos (dni, fecha, hora)
VALUES('', '2022-10-20', '11:30:00');
INSERT INTO Turnos (dni, fecha, hora)
VALUES('', '2022-10-20', '11:45:00');
INSERT INTO Turnos (dni, fecha, hora)
VALUES('', '2022-10-20', '12:00:00');
INSERT INTO Turnos (dni, fecha, hora)
VALUES('', '2022-10-20', '12:15:00');
INSERT INTO Turnos (dni, fecha, hora)
VALUES('', '2022-10-20', '12:30:00');
