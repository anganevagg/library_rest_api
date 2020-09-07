const mongoose = require("mongoose");
const { Schema } = mongoose

const Tipo_libro = new Schema({
	// _id:Schema.Types.ObjectId,
	ancestors:[{
		type:String
	}],
	parent:String
})

module.exports = mongoose.model("tipo_libro", Tipo_libro);
