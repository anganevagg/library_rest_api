const express = require('express')
const router = express.Router()

/* Esquema de libro */
const Libro = require('../models/schemas')

/* Rutas para las consultas */

/** @GET
 * Tomará todas los registros de la colección libros
 */
router.get("/", async(req, res) => {
	const libro = await Libro.find()
	res.json(libro)
})

router.post("/", (req, res) => {

})


module.exports = router