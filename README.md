# MedicalSoft

## Product Backlog, Sprint Backlog: [link](https://trello.com/b/4xbNYNMN/medicalsoft)

## Repositorio del producto: [link](https://github.com/jcfstabile/MedicalSoft)

## Reporte de seguimiento: [link](https://docs.google.com/document/d/1i-_3sovV7Rmn_SwQJ19DVCtSBIEqLHWkhMZj2OwJzPw/edit)

## Especificación de la API: [link](https://docs.google.com/document/d/1glaYFCfceoM3HE6bfgwl7qtiwr7uXV32EJqgvb2f75g/edit)



### Sobre la base de datos

#### El ddl de la estructura de la base de MedicalSoft se genero con el comando:

```
mysqldump -d -u root -p --databases MedicalSoft --result-file=MedicalSoft.sql
```

#### La estructura de la base puede ser replicada con:

```
mysql -e "source MedicalSoft.sql" MedicalSoft
```

#### La tabla Turnos hardcodeada se puede cargar con

```
mysql -e "source Turnos.sql" -u root -p
```


## Se puede generar un jar del back de MedicalSoft



##### Configurar el artefacto

File -> Project Structure -> Artifacts -> + -> JAR -> From modules with dependencies

En el campo Main Class _click_ en la carpeta.

Esperar que termine el ***() Searching...*** en Search by Name

Seleccionar MedicalSoft -> Ok -> Ok -> Apply -> Ok

##### Construir el artefacto

Build -> Build Artifacts...
Seleccionar zero.jar -> (Action)Build

El ***jar*** quedara construido en ***back/out/artifacts/zero_jar*** como ***zero.jar***

##### Ejecutar el artefacto

Desde el directorio back/out/artifacts/zero_jar

```
java -jar zero.jar
```


[Referiencia](https://www.jetbrains.com/help/idea/compiling-applications.html#package_into_jar)

#### Para comprobar la configuración del repositorio:

Clonar con

```
git clone https://github.com/jcfstabile/MedicalSoft
```
o
```
git clone git@github.com:jcfstabile/MedicalSoft.git
```

```
git checkout master
```

#### front

```
cd front
npm install
npm start
```

### back

Levantar el servidor MySQL (debe estar instalado).

Arrancar InteliJ IDEA.

Abrir proyecto desde el directorio: _**MedicalSoft/back**_

Ir a la pestaña Maven (en el borde derecho) y presionar _**Reload all maven proyects**_.

Cambiar en las lineas 16 y 17 los datos conforme tengan seteado el server MySQL.

Ir al archivo src/main/kotlin/org/example/Hello.kt.

Correr el codigo presionando el triangulo verde de la linea 19 y haciendo _**Run...**_.

### Prueba

Ir a la pestaña en el navegador: _**React App**_

Presionar el Boton.

Si obtenemos:

Network Error es que el back no esta levantado.

Request failed with status code 503 , el backend no se esta comunicando con el servidor MySQL

Listado con las bases del servido, todo **OK**

