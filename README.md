# Catálogo de autos — Microservicio web

Microservicio hecho con **Node.js** y **Express** que devuelve un catálogo básico de autos.

Autor: Antonio Sánchez Jiménez

## Cómo ejecutarlo en tu computadora

```bash
npm install
node server.js
```

Luego abre `http://localhost:3000/autos` en el navegador.

## Modelo de datos (Auto)

| Campo  | Tipo   | Descripción                     |
|--------|--------|---------------------------------|
| id     | número | Identificador único (automático)|
| marca  | texto  | Marca del auto                  |
| modelo | texto  | Modelo del auto                 |
| anio   | número | Año del modelo (1900 a año+1)   |
| precio | número | Precio en pesos (mayor que 0)   |
| color  | texto  | Color del auto                  |

## Rutas

| Método | Ruta | Descripción | Respuestas |
|--------|------|-------------|------------|
| GET  | `/` | Información del servicio y sus rutas | 200 |
| GET  | `/autos` | Lista todos los autos | 200 |
| GET  | `/autos?marca=Toyota&color=Gris` | Filtra por marca y/o color | 200 |
| GET  | `/autos/:id` | Devuelve un auto por id | 200, 400, 404 |
| POST | `/autos` | Agrega un auto (encabezado `x-api-key`) | 201, 400, 401 |

Cualquier otra ruta responde `404`.

## Variables de entorno

- `PORT`: puerto del servidor (Render lo asigna automáticamente).
- `API_KEY`: clave necesaria para usar `POST /autos`.
