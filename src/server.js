const express = require('express')
const app = express()

/* Inicializacion de la base de datos */
const { mongoose } = require('./database')

/* Configuracion del puerto del servidor */
app.set('port',  process.env.PORT || 3000)

/* Middlewares */
app.use(express.json())

/* Rutas de la aplicación */
app.use('/',(req, res)=>{
	res.json({
		status:'online'
	})
})
app.use('/api', require('./routes/libro.routes'))

/* Inicialización del servidor */
app.listen(app.get('port'),()=>{
	console.log(`server on http://localhost:${app.get('port')}`)
})