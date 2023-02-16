## Web de Noticias colaborativas

Este proyecto consiste en crear una app similar a reddit o menéame.

## Instalar

-   Crear una base de datos vacía en una instancia de MySQL local.

-   Guardar el archivo `.env` y cubrir los datos necesarios.

-   Ejecutar `npm run initDB` para crear las tablas necesarias en la base de datos.

-   Ejecutar `npm run dev` ejecutar el servidor.

## Entidades

-   Users

    -   id
    -   name
    -   email
    -   biography
    -   foto

-   Notices

    -   id
    -   title
    -   foto
    -   intro
    -   notice
    -   theme

-   Likes
    -   idUsers
    -   idNotice

## ENDPOINTS

## Usuarios Anonimos:

-   GET [/] - Visualizar la lista de las ultimas noticias del dia ordenada por valoracion **_ LISTO _**
-   GET [/notice/:tema] - Visualizar noticias de dias anteriores:
    · filtradas por: Tema **_ LISTO _**

-   POST [/login] - Login **_ LISTO _**
-   POST [/users] - Registro: Nombre, Email, Biografia, Foto **_ LISTO _**

## Usuarios Registrados:

**_ Lo mismo que los anonimos _**

-   POST [/notice] - Publicar una nueva noticia: Titulo, Foto (opcional), Entradilla, Texto de la noticia, Tema ## (necesita cabecera con token) **_ LISTO _**
-   PUT [/notice/:idNotice/edit]Editar una noticia publicada por el mismo usuario ## (necesita cabecera con token) ## **_ LISTO _**
-   DELETE [/notice/:idNotice] Borrar una noticia publicada por el usuario ## (necesita cabecera con token) ## **_ LISTO _**
-   POST [/notice/:idNotice/like] Votar positivamente o negativamente otras noticias ## (necesita cabecera con token) ## **_ LISTO _**

## BONUS POINT

-   POST [/edit/user/:idUser]Gestión del perfil de usuario (Nombre, Email, Biografía, Foto, …
