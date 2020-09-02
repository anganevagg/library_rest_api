const mongoose = require('mongoose')
const db = require('./config/keys').mogodbURI

/* Configuración de la base de datos */
mongoose.connect(db, { useNewUrlParser:true, useUnifiedTopology:true })
	/* Se espera de manera asincrona a que se conecte la db */
	.then(()=>{
		console.log('db is connect')
	})
	/* Se reporta el error si hay en la conexión */
	.catch(err=>{
		console.error(err)
	})

module.exports = mongoose