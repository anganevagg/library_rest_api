const express = require("express");
const router = express.Router();

/* Esquema de libro */
const Libro = require("../models/schemas");
const lib = require("mongoose/lib");

/* Rutas para las consultas */

/* CREATE */
router.post("/", async (req, res)=>{
	const { codigo_isbn, titulo, autores, categoria, tipo, ficha_bibliografica } = req.body
	const libro = new Libro({ odigo_isbn, titulo, autores, categoria, tipo, ficha_bibliografica })
	libro.save()
	res.json({status:"libro guardado"})
})

/* READ  */
router.get("/", async (req, res) => {
	const libros = await Libro.find();
	res.json(req.params);
});

/* UPDATE */
router.put("/:id", async(req, res)=>{
	const { codigo_isbn, titulo, autores, categoria, tipo, ficha_bibliografica } = req.body
	const newLibro = { codigo_isbn, titulo, autores, categoria, tipo, ficha_bibliografica }
	await Libro.findByIdAndUpdate(req.params.id, newLibro)
	res.json({
		status: "Libro actualizado"
	})
})

/* DELETE */
router.delete("/:id", async(req, res)=>{
	await Libro.findByIdAndRemove(req.params.id)
	res.json({
		status:"Libro eliminado"
	})
})

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

/* Consulta con una condición */


module.exports = router;