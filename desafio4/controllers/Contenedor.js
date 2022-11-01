const {promises: fs} = require ('fs')
const { send } = require('process')

class Contenedor {
    constructor(route) {
        this.route = route
    }
    async getAll(req, res, next) {
        try {
            const content = JSON.parse(await fs.readFile(`./productos.json`,'utf-8'))
            res.send(content)
        } catch (error) {
            res.send(error)
        }
    }
    async getById(req,res,next){
        try {
            const { id } = req.params
            const content = JSON.parse(await fs.readFile(`./productos.json`,'utf-8'))
            const elementosFiltrados = content.filter(e => e.id === (parseInt(id)))
            if(elementosFiltrados.length === 0){
                res.send({ error : 'producto no encontrado' })
            } else {
                res.send(elementosFiltrados)
            }
        } catch (error) {
            res.send(error)
            null
        }
    }
    async save(req, res, next) {
        try {
            const { body } = req
            const content = JSON.parse(await fs.readFile(`./productos.json`,'utf-8'))
            let newId;
            if(content.length == 0){
                newId = 1;
            }else {
                newId = content[content.length - 1].id + 1;
            }
            const newObj = {...body, id: newId}
            content.push(newObj);
            await fs.writeFile(`./productos.json`,JSON.stringify(content, null, 2))
            res.send(newObj)
        } catch (error) {
            res.send(error)
        }
    }

    async update(req, res, next) {
        try{
            const { title, price, thumbnail} = req.body;
            const { id } = req.params;
            const content = JSON.parse(await fs.readFile(`./productos.json`,'utf-8'))
            let identificacion = Number(id)
            let index = content.findIndex(prod => prod.id === identificacion)
            const newProduct = {title, price, thumbnail, "id": identificacion};
            if(index === -1 ) {
                res.send({ error : 'producto no encontrado' }
                ) 
            } else {
                content[index] = newProduct
            }
            await fs.writeFile(`./productos.json`,JSON.stringify(content, null, 2))
            res.send(content);
        } catch (error) {
            res.send(error)
        }
    }
    async deleteAll(){
        try {
            await fs.writeFile(`./$productos.json`,JSON.stringify([], null, 2))
            const content = JSON.parse(await fs.readFile(`./productos.json`,'utf-8'))
            console.log(content)
        } catch (error) {
            console.log(error)
            return "no pudo eliminarse"
        }
    }
    async deleteById (req, res, next ) {
        try {
            const { id } = req.params;
            const content = JSON.parse(await fs.readFile(`./productos.json`,'utf-8'))
            const elementosFiltrados = content.filter(e => e.id !== parseInt(id))
            if(elementosFiltrados.length === (content.length)){
                res.send({ error : 'producto no encontrado' })
            } else {
                res.send(elementosFiltrados)
                await fs.writeFile(`./productos.json`,JSON.stringify(elementosFiltrados, null, 2))
            }
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Contenedor