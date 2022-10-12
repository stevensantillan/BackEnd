class Usuario {
    constructor (nombre, apellido, mascotas, libros) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        console.log(`Hola soy ${this.nombre} ${this.apellido}`)
    }

    addMascota(mascota) {
        this.mascotas.push(mascota);
    }

    countMascotas() {
        console.log(this.mascotas.length);
    }

    addBook(libro) {
        this.libros.push(libro);
    }

    getBookNames() {
        console.log(this.libros);
    }
}


const persona1 = new Usuario ("Juan" , "Perez", ["Perro", "Gato"], [] )

persona1.addBook("It","Stephen King")

console.log(persona1)

persona1.getFullName()

persona1.countMascotas()

persona1.getBookNames()