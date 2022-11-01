const express = require('express')
const Contenedor = require('./controllers/Contenedor.js')
const routerProductos = require('./routes/index.js')
const app = express()

const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto http://localhost:${PORT}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

app.use('/api/productos', routerProductos)