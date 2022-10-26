const {promises : fs} = require('fs')

class Contenedor {
    constructor(ruta){
        this.route = ruta
    }

async getAll(){
    try{
        const contenido = JSON.parse(await fs.readFile(`./${this.route}`,'utf-8'))
        console.log(contenido);
        return contenido;
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

async save(nombre, precio) 
    {
        try{
            const contenido = JSON.parse(await fs.readFile(`./${this.route}`,'utf-8'))
            const generarId = Object.keys(contenido).length
            const nuevoProd = {
                nombre: nombre,
                precio: precio,
                id: (generarId + 1)
            }
            contenido.push(nuevoProd) 
            await fs.writeFile(`./${this.route}`,JSON.stringify(contenido,null,2))
        }catch (error) {
            console.log(error)
        }
}

async getRandom() {
    try {
        const get = await this.getAll();
        const randomItem = Math.floor(Math.random()*get.length);
        const getRandom = get[randomItem];
        return getRandom;
    }
    catch (err) {
        console.log(`Reading ERR! ${err}`);
    }
};

}

const ruta = new Contenedor ('productos.json')
ruta.getAll()
ruta.getById(3)

module.exports = Contenedor;





