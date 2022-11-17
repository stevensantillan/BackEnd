const express = require("express")

const { Server: HttpServer } = require("http")
const { Server: IOServer } = require("socket.io")

const app = express()
const httpServer = new HttpServer(app)

const io = new IOServer(httpServer)

const Contenedor = require('./class/Contenedor')
const contenedor1 = new Contenedor()

app.set('view engine', 'ejs')
app.set('views','./public/views');
app.use(express.json())

app.get('/', (req, res) => {
    res.render('pages/index');
})

const mensajes = []

app.use('/public', express.static(__dirname + '/public'));

io.on("connection", socket => {
    console.log("Usuario conectado!");

    socket.emit("products", contenedor1.getAll)
    socket.on("saveProduct", (newProduct) => {
        contenedor1.save(newProduct)
        io.sockets.emit("products", contenedor1.getAll)
    })   

    socket.on("nuevoMensaje", (data) => {
        mensajes.push({mensaje: data, fecha: new Date()});
        io.sockets.emit("mensajes", mensajes);
    })
    socket.emit("mensajes", mensajes);

});

const PORT = 8080
const server = httpServer.listen(PORT, () => console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`))
server.on('error', (err) => console.log(err.message))