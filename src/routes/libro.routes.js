const express = require("express");
const router = express.Router();

/* Esquema de libro */
const Libro = require("../models/schemas");
const lib = require("mongoose/lib");

/* Rutas para las consultas */

/* Consulta de todos los registros */
router.get("/", async (req, res) => {
	const libros = await Libro.find();
	res.json(req.params);
});

/* Consulta dentro de un arreglo */
router.get("/buscar/autor/:nombre", async (req, res)=>{
	const libros = await Libro.find({"autores.nombre":req.params.nombre})
	res.json(libros)
})

/* Consulta dentro de un subdocumento */
router.get("/buscar/edicion/:edicion",async(req,res)=>{
	const libros = await Libro.find({'ficha_bibliografica.edicion':req.params.edicion})
	res.json(libros)
})

module.exports = router;