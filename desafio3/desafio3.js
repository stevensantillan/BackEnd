const desafio2 = require("../desafio2/desafioDos.js");
const express = require("express");
const Contenedor = require("../desafio2/desafioDos.js");

const app = express();

app.get("/", (req, res) => {
    res.send(`<h1>Funciona</h1>`)
});

app.get("/productos", async(req, res) => {
    try {
        const pathFile = new Contenedor("./productos.json");
        const getProducts = await pathFile.getAll();
        const productsStringify = JSON.stringify(getProducts);
        res.send(
            `<p>${productsStringify}</p>`
        )
    } catch (err) {
        console.log(err)
    }
});

app.get("/productoRandom", async(req, res) => {
    try {
        const pathFile = new Contenedor("./productos.json");
        const getRandomProducts = await pathFile.getRandom();
        const randomStringify = JSON.stringify(getRandomProducts)
        res.send(
            `<p>${randomStringify}</p>`
        )
    } catch (err) {
        console.log(err)
    }
})

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
});

server.on("error", (err) => {
    console.log(`Error en el servidor ${err}`)
});

