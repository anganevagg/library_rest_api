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
		Pais:{
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
			nombre_editorial:String,
			tipo:String,
			pais:String,
			idioma:String

		},
		Descripcion:String
	}
},{collection:"libros"})

module.exports = mongoose.model("Libro", LibroSchema);
