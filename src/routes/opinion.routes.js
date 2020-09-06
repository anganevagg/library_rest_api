const express = require("express");
const router = express.Router();

/* Esquema de opinion */
const Opinion = require("../models/opinion");

/* 
Añadir varios elementos a un arreglo

db.opiniones.update(
  { "_id" : ObjectId ("5f5008440b2c410c96882c9b")},
  {$push:{opiniones:
      {$each: [
                  {"nombre":"Milton Martinez"},
                  {"correo": "mmaertinez@hotmail.com"},
                  {"pais":"Colombia"},
                  {"comentario": 'El libro es poco entendible'},
                  {"Fecha": '23/08/2020'},
                  {"puntuacion": 2},
                  {"critica": "negativa"} 
              ] 
      }
  }      
}
)
*/
router.get("/",async(req,res)=>{
	const opinion=await Opinion.find()
	res.json(opinion)
})

// router.post("/actualizar/:id", async(req,res)=>{
// 	const { nombre, correo, pais, comentario, Fecha, puntuacion, critica } = req.body
// 	const opinion = Opinion.findByIdAndUpdate(req.params.id,{
// 		"$push":{
// 			opiniones:{
// 				"$each":[
// 					{nombre},
// 					{}
// 				]
// 			}
// 		}
// 	})
// })

module.exports = router