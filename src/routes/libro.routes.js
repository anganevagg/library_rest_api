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
	res.json(libros);
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
router.get("/buscar/categoria/:categoria", async(req,res)=>{
	const { id, titulo, autor } = req.body
	const libro= await Libro.find({categoria:req.params.categoria},{_id:0,titulo:1,autor:1})
	res.json(libro)
})

/* Lista NIN */
router.get("/buscar/nin/:categoria", async(req, res)=>{
	const categoria = req.params.categoria
	const re = await Libro.find({"$nin":[categoria]},{_id:0,titulo:1,autor:1})
	res.json(re)
})

/* Consulta con filtro de rango de valores */
router.get("/buscar/paginas/menorA/:paginas", async(req, res)=>{
	const re = await Libro.find({'ficha_bibliografica.paginas':{"$gt":req.params.paginas}})
	res.json(re)
})

/* Consulta con dos condiciones y el operador AND */
router.get("/buscar/multiple", async(req, res)=>{
	const { nCategoria, paginas } = req.body
	const re = await Libro.find({
		"$and":[
			{categoria:{
				"$nin":[nCategoria]
			}},
			{'ficha_bibliografica.paginas':{
				"$gt":paginas
			}}
		]
	},{_id:0,titulo:1,cliente:1})
	res.json(re)
})

/* Consulta con ordenamiento */
router.get("/buscar/ordenar", async(req, res)=>{
	const { paginas, nCategoria }= req.body
	const re = await Libro.find({
		"$and":[
			{
				categoria:{
					"$nin":[nCategoria]
				}
			},
			{
				"ficha_bibliografica.paginas":{
					"$gt":paginas
				}
			}
		]
	},{_id:0,titulo:1,tipo:1,categoria:1}).sort({tipo:1,categoria:1})
})

/* Consulta un array de contenidos de un atributo */
router.get("/buscar/autores",async(req,res)=>{
	const re = await Libro.distinct("autores")
	res.json(re)
})

/* Consulta por cadena que empieza por una letra */
router.get("/buscar/letra/:letra",async(req,res)=>{
	const r = new RegExp(`^${req.params.letra}`)
	const re = await Libro.find({titulo:r})
	res.json(re)
})

module.exports = router;