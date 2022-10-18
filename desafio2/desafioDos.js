const {promises : fs} = require('fs')

class Contenedor {
    constructor(ruta){
        this.route = ruta
    }

async getAll(){
    try{
        const contenido = JSON.parse(await fs.readFile(`./${this.route}`,'utf-8'))
        console.log(contenido)
    } catch (error){
        console.log(error)
    }}

async deleteByiD(id){
    
    try{
        const contenido = JSON.parse(await fs.readFile(`./${this.route}`,'utf-8'))
        const elementoAEliminar = contenido.filter(e => e.id !== id)
        await fs.writeFile(`./${this.route}`, JSON.stringify(elementoAEliminar, null, 2)) 
    }catch (error) {
        console.log(error)
    }
}

async getById(id){
    try{
        const contenido = JSON.parse(await fs.readFile(`./${this.route}`,'utf-8'))
        const elementFiltrado = contenido.find(e => e.id === id)
        console.log(elementFiltrado) 
    }catch (error) {
        console.log(error)
    }
}

async deleteAll(){
    try{
        const contenido = JSON.parse(await fs.readFile(`./${this.route}`,'utf-8'))
        await fs.writeFile(`./${this.route}`, JSON.stringify(contenido.length = [], null, 2)) 
    }catch (error) {
        console.log(error)
    }
}

async save(nombre, precio, id) 
    {
        try{
            const contenido = JSON.parse(await fs.readFile(`./${this.route}`,'utf-8'))
            await fs.appendFile(`./${this.route}`, JSON.stringify({
                nombre: nombre,
                precio: precio,
                id: id
            }, null, 2)) 
        }catch (error) {
            console.log(error)
        }
}

}

const ruta = new Contenedor ('productos.json')
ruta.getAll()
ruta.save("prod3",234,3)





