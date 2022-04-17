# configzero-eis

1. clonar con

```
git clone https://github.com/jcfstabile/configzero-eis
```
o
```
git clone git@github.com:jcfstabile/configzero-eis.git
```

### front

```
cd front
npm init
npm start
```

### back

Levantar el servidor MySQL.

Arrancar InteliJ IDEA.

Abrir proyecto desde el directorio: _**configzero-eis/back**_

Ir a la pestaña Maven (en el borde derecho) y presionar _**Reload all maven proyects**_.

Cambiar en las lineas 16 y 17 los datos conforme tengan seteado el server MySQL.

Ir al archivo src/main/kotlin/org/example/Hello.kt.

Correr el codigo presionando el triangulo verde de la linea 19 y haciendo _**Run...**_.

## Prueba

Ir a la pestaña en el navegador: _**React App**_

Presionar el Boton.

Si obtenemos:

Network Error es que el back no esta levantado.

Request failed with status code 503 , el backend no se esta comunicando con el servidor MySQL

Listado con las bases del servido, todo **OK**

