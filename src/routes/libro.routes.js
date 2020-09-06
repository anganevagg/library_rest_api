const express = require("express");
const router = express.Router();

/* Esquema de libro */
const Libro = require("../models/libro");

/* Rutas para las consultas */

/* CREATE */
router.post("/", async (req, res) => {
	const {
		codigo_isbn,
		titulo,
		autores,
		categoria,
		tipo,
		ficha_bibliografica
	} = req.body
	const libro = new Libro({
		codigo_isbn,
		titulo,
		autores,
		categoria,
		tipo,
		ficha_bibliografica
	})
	await libro.save()
	res.json({
		status: "libro guardado"
	})
})

/* READ  */
router.get("/", async (req, res) => {
	const libros = await Libro.find();
	res.json(libros);
});

/* UPDATE */
router.put("/:id", async (req, res) => {
	const {
		codigo_isbn,
		titulo,
		autores,
		categoria,
		tipo,
		ficha_bibliografica
	} = req.body
	const newLibro = {
		codigo_isbn,
		titulo,
		autores,
		categoria,
		tipo,
		ficha_bibliografica
	}
	await Libro.findByIdAndUpdate(req.params.id, newLibro)
	res.json({
		status: "Libro actualizado"
	})
})

/* DELETE */
router.delete("/:id", async (req, res) => {
	await Libro.findByIdAndRemove(req.params.id)
	res.json({
		status: "Libro eliminado"
	})
})

/* 
Consulta por cadena que termina con una letra
db.libros.find({
	'titulo':/r$/
}) 
*/
router.get("/buscar/ultimaLetra/:letra", async (req, res) => {
	const r = new RegExp(`${req.params.letra}$`)
	const re = await Libro.find({
		titulo: r
	})
	res.json(re)
})

/* 
Consulta con dos condiciones y operador $and

db.libros.find({
   $and:[ {
    'titulo':/^H/
    },
    {
    'categoria':/o$/
    }
   ]
})
*/
router.get("/buscar/and/:letra/:letraFinal", async (req, res) => {
	const r1 = new RegExp(`^${req.params.letra}`)
	const r2 = new RegExp(`${req.params.letraFinal}$`)
	const re = await Libro.find({
		"$and": [{
				titulo: r1
			},
			{
				categoria: r2
			}
		]
	})
	res.json(re)
})

/*  
Actualización mediante el uso de $set

db.libros.update(
{
    titulo:'Simon Bolivar'
},
{
$set: {titulo:'La vida de Simon Bolivar'}
}
)
*/
router.get("/actualizar/titulo/:titulo/:nuevoTitulo", async (req, res) => {
	await Libro.update({
		titulo: req.params.titulo
	}, {
		"$set": {
			titulo: req.params.nuevoTitulo
		}
	})
	res.json({
		status: "Titulo actualizado"
	})
})

/* 
Actualización de un elemento del arreglo

db.libros.update(
{
    titulo:'La vida de Simon Bolivar',
    'autores.nombre':'Simon Bolivar '
},
{
$set: {'autores.$.nombre':'El libertador'}
}
)
*/
router.get("/actualizar/autor/:titulo/:nombre/:nombreNuevo", async (req, res) => {
	await Libro.update({
		titulo: req.params.titulo,
		'autores.nombre': req.params.nombre
	}, {
		'$set': {
			'autores.$.nombre': req.params.nombreNuevo
		}
	})
	res.json({
		status: "Autor actualizado"
	})
})

/* 
Añadir de un elemento a un arreglo

db.libros.update(
  { "_id" : ObjectId ("5f545dcd3bf21c3608eae5ef")},
  {$push:{
	  ficha_bibliografica.editorial:
                  {
					  nombre_editorial:"Grupo Editorial Patria"
					  ,pais: "Peru"
				  }

               
      }
})
*/
router.get("/push/ficha/:id/:editorial/:pais", async (req, res) => {
	const re = await Libro.findByIdAndUpdate(req.params.id, {
		"$push": {
			'ficha_bibliografica.editorial': {
				nombre_editorial: req.params.editorial,
				pais: req.params.pais
			}
		}
	})
	res.json(
		{status: "Push correcto"},
		re
	)
})

module.exports = router;