const express = require("express");
const router = express.Router();

/* Esquema de libro */
const Libro = require("../models/libro");

/* Rutas para las consultas */

/* 
CRUD INSERTAR

db.libros.insert(
  {
  'codigo_isbn':9788422616931,
  'titulo': "Vientos de guerra",
  'autores': [
               {
                   "nombre": " Herman Wouk ",
                   "Fecha_nacimiento":"27/05/1915",
                   "Pais":"Estados Unidos"
                }
             ],
            
  'categoria':"Literaturas de otras lenguas",
  'tipo':"Trilogia",
  'ficha_bibliografica': {
                         'año':1971,
                         'paginas':1080,
			             'edicion': 'primera',
			             'encuadernacion':'Tapa dura',
			             'editorial' :  {
			                             'nombre_editorial':'Grijalbo',
			                             'tipo':'tradicional',
			                             'pais':'Estados Unidos'
			                            },
			               'idioma': 'Ingles'
                       },
  'Descripcion':' La batalla de Inglaterra, el avance nazi sobre Moscú'           
}
) 
*/
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

/* READ */
router.get("/", async (req, res) => {
	const libros = await Libro.find();
	res.json(libros);
});

/* 
CRUD UPDATE

db.tienda.update(
	{
		_id:ObjectId("5f515ea92fec5e2cd8a8f943")
	}, 
	{ 
	$set:{titulo:'La flecha roja'}
	} 
)
 */
router.put("/:id", async (req, res) => {
	const {
		titulo
	} = req.body
	const newLibro = {
		titulo
	}
	await Libro.findByIdAndUpdate(req.params.id, newLibro)
	res.json({
		status: "Libro actualizado"
	})
})

/*
CRUD DELETE

db.libros.remove(
     { 
       "_id" : ObjectId ("5f4ff8875b1a556d7101d69b")
     }
) 
*/
router.delete("/:id", async (req, res) => {
	await Libro.findByIdAndRemove(req.params.id)
	res.json({
		status: "Libro eliminado"
	})
})

/* 
UPDATE SUBDOCUMENTO


db.libros.update(
  {
       "_id" : ObjectId ("5f4ffcbc5b1a556d7101d69c")
  },
  
  {$set:
        {
              "ficha_bibliografica.edicion" : "cuarta"
        }
                  
    
  }      
) 
*/
router.put("/update/edicion/:id",async(req,res)=>{
	await Libro.findByIdAndUpdate(req.params.id, {
		"$set":{
			'ficha_bibliografica.edicion':req.body.edicion
		}
	})
	res.json({
		status:"Edicion actualizada"
	})
})


/* INSERTAR SUBDOCUMENTO

db.libros.insert(
{ 
       "_id" : ObjectId ("5f4ffcbc5b1a556d7101d69c")
   }, 
   {
	$set : {
		    "ficha_bibliografica.edicion" : "cuarta"
	        }
}
) */
router.put("/insertar/edicion/:id",async(req,res)=>{
	await Libro.findByIdAndUpdate(req.params.id, {
		"$set":{
			'ficha_bibliografica.edicion':req.body.edicion
		}
	})
	res.json({
		status:"Edicion insertada"
	})
})

/* 
DELETE SUBDOCUMENTO

db.libros.update(
  {
       "_id" : ObjectId ("5f4ffcbc5b1a556d7101d69c")
  },
  
  {$unset:
        {
              "ficha_bibliografica.edicion" : "cuarta"
        }
                  
    
  }      
) 
*/
router.delete("/delete/edicion/:id",async(req,res)=>{
	await Libro.findByIdAndUpdate(req.params.id,{
		"$unset":{
			"ficha_bibliografica.edicion" : "cuarta"
		}
	})
})

/* 
INSERTAR ARRAY

db.libros.update(
  { 
      "_id" : ObjectId ("5f4ff8875b1a556d7101d69b")
  },
  {$push:
      {
          autores: {$each:
                 [
                      {
                      "nombre": "Pablo Neruda",
                      "Fecha_nacimiento":"12/04/1955",
                      "Pais":"Colombia"
                      }
                                     
                 ]
          }    
      }    
  }
) 
*/
router.post("/insertar/autores/:id",async(req,res)=>{
	const {nombre,Fecha_nacimiento,Pais}=req.body
	await Libro.findByIdAndUpdate(req.params.id,{
		"$push":{
			autores:{
				"$each":[{
					nombre,
					Fecha_nacimiento,
					Pais
				}]
			}
		}
	})
	res.json({
		status:"Autor agregado"
	})
})

/* ARRAY UPDATE//
//Modificar elementos de un arreglo condicionados


db.libros.update(
  {},
  {$set:{
            'autores.$[elem].Fecha_nacimiento':' 18/28/1887 '
        }       
      },
  {arrayFilters: 
      [
          {"elem.nombre":"Simon Bolivar"  }
      ],
      multi : true
      
  }
) */
router.post("/insertar/nombre",async(req,res)=>{
	await Libro.find({},{
		"$set":{
			'autores.$[elem].Fecha_nacimiento':"18/28/1887"
		},
		"arrayFilters":[{
			"elem.nombre":"Simon Bolivar"
		}]
	})
})

/* 
ARRAY DELETE

db.libros.update(
  {
       "_id" : ObjectId ("5f528e24c17be955e385bbd9")
  },
  
  {$pull:
        {
             autores:{nombre:" Jhon Lennon "}
        }
                  
    
  }      
)
*/

router.delete("/delete/array/:id",async(req,res)=>{
	await Libro.findByIdAndUpdate(req.params.id,{
		"$pull":{
			autores:{
				nombre:"Jhon Lennon"
			}
		}
	})
	await res.json(Libro.findById(req.params.id))
})

/* 
//ORDENAR POR TIPO  Y CATEGORIA////

db.libros.find(
{$and:
    [
    {'categoria':{$nin:['Literaturas de otras lenguas']}},
    {'ficha_bibliografica.paginas':{$gt:309}}
    ]
}

).sort(
        {categoria:1}
) */

router.get("/buscar/and/ordenar/:categoria/:paginas",async(req,res)=>{
	const re = await Libro.find({"$and":[
		{categoria:{"$nin":[req.params.categoria]}},
		{'ficha_bibliografica.paginas':{"$gt":req.params.paginas}}
	]}).sort({categoria:1})
	res.json(re)
})

/* 
//PROYECCION POR TITULO, TIPO Y CATEGORIA////

db.libros.find(
{$and:
    [
    {'categoria':{$nin:['Literaturas de otras lenguas']}},
    {'ficha_bibliografica.paginas':{$gt:309}}
    ]
},
{
_id:0, titulo:1, tipo:1, categoria:1
}
) */
router.get("/buscar/and/proyeccion/:categoria/:paginas",async(req,res)=>{
	const re=await Libro.find({"$and":[
		{categoria:{"$nin":[req.params.categoria]}},
		{'ficha_bibliografica.paginas':{"$gt":req.params.paginas}}
	]},{_id:0,titulo:1,tipo:1,categoria:1})
	res.json(re)
})

/* REGEXP 

db.libros.find(
{
'titulo':/^A/
}

) */
router.get("/bucar/letra/:letra",async(req,res)=>{
	const r = new RegExp(`^${req.params.letra}`)
	const re = await Libro.find({titulo:r})
	res.json(re)
})

module.exports = router;