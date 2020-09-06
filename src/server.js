const express = require('express')
const morgan = require('morgan')

const app = express()

/* Inicializacion de la base de datos */
const { mongoose } = require('./database')

/* Configuracion del puerto del servidor */
app.set('port',  process.env.PORT || 3000)

/* Middlewares */
app.use(morgan('dev'))
app.use(express.json())

/* Rutas de la aplicación */
app.use('/api/libros', require('./routes/libro.routes'))
app.use('/api/opiniones', require('./routes/opinion.routes'))

/* Inicialización del servidor */
app.listen(app.get('port'),()=>{
	console.log(`server on http://localhost:${app.get('port')}`)
})