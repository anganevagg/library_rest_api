const mongoose = require("mongoose");
const { Schema } = mongoose

const OpinionSchema = new Schema({
	codigo_isbn:{
		type: Number
	},
	opiniones:[
		{
			nombre : String,
			correo : String,
			pais : String,
			comentario : String,
			Fecha : String,
			puntuacion : Number,
			critica : String
		}
	]
})

module.exports = mongoose.model("Opinion", OpinionSchema);
