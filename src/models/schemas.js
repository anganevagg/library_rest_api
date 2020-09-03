const mongoose = require("mongoose");
const { Schema } = mongoose

const LibroSchema = new Schema({
	codigo_isbn: Number,
	titulo: String,
	autores:[{
		nombre:{
			type: String,
			required:true
		},
		pais:{
			type:String,
			required: true
		},
		Fecha_nacimiento:{
			type:String,
			required: true
		}
	}],
	categoria:{
		type: String
	},
	tipo:{
		type: String
	},
	ficha_bibliografica:{
		año:Number,
		paginas:Number,
		edicion:String,
		encuadernacion:String,
		editorial:{
			nombre_editoriale:String,
			tipo:String,
			pais:String,
			idioma:String

		},
		Descripcion:String
	}
})

// const OpinionSchema = new Schema({
// 	codigo_isbn:{
// 		type: Schema.Types.ObjectId
// 	},
// 	opiniones:[
// 		{
// 			nombre : String,
// 			correo : String,
// 			pais : String,
// 			comentario : String,
// 			Fecha : String,
// 			puntuacion : Number,
// 			critica : String
// 		}
// 	]
// })


module.exports = mongoose.model("Libro", LibroSchema);
// module.exports = mongoose.model("Opinion", OpinionSchema);
