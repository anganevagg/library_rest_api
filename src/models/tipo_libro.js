const mongoose = require("mongoose");
const { Schema } = mongoose

const Tipo_libro = new Schema({
	_id:String,
	ancestors:[{
		type:String
	}],
	parent:String
},{collection:"tipo_libro"})

module.exports = mongoose.model("Tipo_Libro", Tipo_libro);
