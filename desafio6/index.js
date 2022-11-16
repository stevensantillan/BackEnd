const express = require("express")
const { Server: httpServer1 } = require("http")
const { Server: IOServer } = require("socket.io")
const app = express()

const httpServer = new httpServer1(app)
const io = new IOServer(httpServer)

const Contenedor = require('./class/Contenedor')

const routerProd = express.Router()
const contenedor1 = new Contenedor()

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(routerProd)

app.set('view engine', 'ejs');
app.set("index", "../views/pages");

routerProd
    .get('/', (req, res) => {
        res.render('pages/index');
    })

const messages = []

io.on("connection", async(socket) => {
    console.log("Usuario conectado!");

    socket.emit("products", contenedor1.getAll)
    socket.on("saveProduct", (newProduct) => {
        contenedor1.save(newProduct)
        io.sockets.emit("products", contenedor1.getAll)
    })
})

const PORT = 8080
const server = app.listen(PORT, () => console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`))
server.on('error', (err) => console.log(err.message))