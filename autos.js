// Datos del catálogo de autos
// Cada auto tiene: id, marca, modelo, anio, precio y color.

let autos = [
  { id: 1,  marca: "Toyota",     modelo: "Corolla", anio: 2022, precio: 389900, color: "Blanco" },
  { id: 2,  marca: "Nissan",     modelo: "Versa",   anio: 2023, precio: 329900, color: "Gris" },
  { id: 3,  marca: "Volkswagen", modelo: "Jetta",   anio: 2021, precio: 419900, color: "Negro" },
  { id: 4,  marca: "Mazda",      modelo: "Mazda 3", anio: 2024, precio: 459900, color: "Rojo" },
  { id: 5,  marca: "Honda",      modelo: "Civic",   anio: 2022, precio: 499900, color: "Azul" },
  { id: 6,  marca: "Chevrolet",  modelo: "Aveo",    anio: 2023, precio: 279900, color: "Plata" },
  { id: 7,  marca: "Kia",        modelo: "Rio",     anio: 2021, precio: 289900, color: "Blanco" },
  { id: 8,  marca: "Toyota",     modelo: "RAV4",    anio: 2024, precio: 689900, color: "Gris" },
  { id: 9,  marca: "Ford",       modelo: "Mustang", anio: 2020, precio: 799900, color: "Amarillo" },
  { id: 10, marca: "Nissan",     modelo: "Sentra",  anio: 2022, precio: 399900, color: "Rojo" }
];

// Exportamos la lista para poder usarla en server.js
module.exports = autos;
