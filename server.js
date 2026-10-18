// ============================================================
// Microservicio web: Catálogo básico de autos
// Lenguaje: JavaScript (Node.js) con el framework Express
// ============================================================

// 1. Importamos Express y los datos de los autos
let express = require("express");
let autos = require("./autos");

// 2. Creamos la aplicación
let app = express();

// 3. Puerto: Render nos da uno en process.env.PORT; en nuestra computadora usamos el 3000
let puerto = process.env.PORT || 3000;

// 4. Clave para poder agregar autos (seguridad básica).
//    En Render se configura como variable de entorno llamada API_KEY.
let claveApi = process.env.API_KEY || "clave-de-prueba";

// 5. Esto permite que el servidor entienda datos en formato JSON
app.use(express.json());


// ------------------------------------------------------------
// RUTA 1: GET /
// Página de inicio que explica qué rutas tiene el servicio
// ------------------------------------------------------------
app.get("/", function (req, res) {
  res.json({
    servicio: "Catálogo básico de autos",
    version: "1.0",
    rutas: [
      "GET  /autos            -> lista todos los autos",
      "GET  /autos?marca=Toyota&color=Rojo -> filtra por marca y/o color",
      "GET  /autos/:id        -> busca un auto por su id",
      "POST /autos            -> agrega un auto (requiere encabezado x-api-key)"
    ]
  });
});


// ------------------------------------------------------------
// RUTA 2: GET /autos
// Devuelve todos los autos. Se puede filtrar por marca o color.
// Ejemplo: /autos?marca=Nissan
// ------------------------------------------------------------
app.get("/autos", function (req, res) {
  let marca = req.query.marca;
  let color = req.query.color;
  let resultado = [];

  for (let i = 0; i < autos.length; i++) {
    let auto = autos[i];
    let coincide = true;

    // Si mandaron una marca y no es igual, este auto no coincide
    if (marca) {
      if (auto.marca.toLowerCase() !== marca.toLowerCase()) {
        coincide = false;
      }
    }

    // Lo mismo con el color
    if (color) {
      if (auto.color.toLowerCase() !== color.toLowerCase()) {
        coincide = false;
      }
    }

    if (coincide) {
      resultado.push(auto);
    }
  }

  res.json({
    total: resultado.length,
    autos: resultado
  });
});


// ------------------------------------------------------------
// RUTA 3: GET /autos/:id
// Busca un solo auto por su id. Ejemplo: /autos/3
// ------------------------------------------------------------
app.get("/autos/:id", function (req, res) {
  let id = Number(req.params.id);

  // Validamos que el id sea un número
  if (isNaN(id)) {
    res.status(400).json({ error: "El id debe ser un número" });
    return;
  }

  // Buscamos el auto recorriendo la lista
  let autoEncontrado = null;
  for (let i = 0; i < autos.length; i++) {
    if (autos[i].id === id) {
      autoEncontrado = autos[i];
    }
  }

  if (autoEncontrado === null) {
    res.status(404).json({ error: "No existe un auto con el id " + id });
    return;
  }

  res.json(autoEncontrado);
});


// ------------------------------------------------------------
// RUTA 4: POST /autos
// Agrega un auto nuevo. Requiere el encabezado x-api-key.
// Ejemplo de cuerpo (JSON):
// { "marca": "Kia", "modelo": "Forte", "anio": 2024, "precio": 399900, "color": "Negro" }
// ------------------------------------------------------------
app.post("/autos", function (req, res) {
  // a) Revisamos la clave de acceso
  let claveRecibida = req.headers["x-api-key"];
  if (claveRecibida !== claveApi) {
    res.status(401).json({ error: "No autorizado: falta la clave x-api-key o es incorrecta" });
    return;
  }

  // b) Tomamos los datos que nos mandaron
  let datos = req.body;
  if (!datos) {
    datos = {};
  }
  let marca = datos.marca;
  let modelo = datos.modelo;
  let anio = datos.anio;
  let precio = datos.precio;
  let color = datos.color;

  // c) Validamos cada dato y guardamos los errores en una lista
  let errores = [];
  let anioActual = new Date().getFullYear();

  if (typeof marca !== "string" || marca.trim() === "") {
    errores.push("marca es obligatoria y debe ser texto");
  }
  if (typeof modelo !== "string" || modelo.trim() === "") {
    errores.push("modelo es obligatorio y debe ser texto");
  }
  if (typeof anio !== "number" || anio < 1900 || anio > anioActual + 1) {
    errores.push("anio debe ser un número entre 1900 y " + (anioActual + 1));
  }
  if (typeof precio !== "number" || precio <= 0) {
    errores.push("precio debe ser un número mayor que 0");
  }
  if (typeof color !== "string" || color.trim() === "") {
    errores.push("color es obligatorio y debe ser texto");
  }

  if (errores.length > 0) {
    res.status(400).json({ error: "Datos inválidos", detalles: errores });
    return;
  }

  // d) Calculamos el nuevo id (el id más alto + 1)
  let idMayor = 0;
  for (let i = 0; i < autos.length; i++) {
    if (autos[i].id > idMayor) {
      idMayor = autos[i].id;
    }
  }

  let nuevoAuto = {
    id: idMayor + 1,
    marca: marca.trim(),
    modelo: modelo.trim(),
    anio: anio,
    precio: precio,
    color: color.trim()
  };

  autos.push(nuevoAuto);

  // 201 significa "creado"
  res.status(201).json(nuevoAuto);
});


// ------------------------------------------------------------
// Manejo de errores
// ------------------------------------------------------------

// Si la ruta no existe, respondemos 404
app.use(function (req, res) {
  res.status(404).json({ error: "Ruta no encontrada: " + req.method + " " + req.url });
});

// Si ocurre un error (por ejemplo, un JSON mal escrito), respondemos aquí
app.use(function (err, req, res, next) {
  if (err.type === "entity.parse.failed") {
    res.status(400).json({ error: "El cuerpo de la petición no es un JSON válido" });
    return;
  }
  console.log(err);
  res.status(500).json({ error: "Error interno del servidor" });
});


// 6. Encendemos el servidor
app.listen(puerto, function () {
  console.log("Servidor del catálogo de autos funcionando en el puerto " + puerto);
});
