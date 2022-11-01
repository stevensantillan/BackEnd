const Contenedor = require('../controllers/Contenedor.js')
const express = require('express')
const app = express()
const { Router } = express
const routerProductos = new Router()
const ProductoController = new Contenedor('productos.json')
app.use(express.json())
app.use(express.urlencoded({extended:true}));

routerProductos.get('/', ProductoController.getAll)
routerProductos.get('/:id', ProductoController.getById)
routerProductos.post('/', ProductoController.save)
routerProductos.put('/:id',ProductoController.update)
routerProductos.delete('/:id',ProductoController.deleteById)


module.exports = routerProductos