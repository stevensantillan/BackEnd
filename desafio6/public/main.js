
    const socket = io({ path: "/socket.io" });

    
    socket.on("productos", listaProductos => {
        loadProds(listaProductos)
    })

    function loadProds(listProd) {
        let htmlProd = ''
        const tableList = fetch('views/partials/table.ejs').then(res => res.text())
 
        if (listProd.length === 0){
            htmlProd = `<h4>No se encontraron productos.</h4>`
        }else{
            htmlProd = ejs.render(tableList, {listProd})
        }

        document.getElementById('tabla').innerHTML = htmlProd; 
    }

    document.getElementById('btn').addEventListener('click', () => {
        const nuevoProducto = {
            title: document.getElementById('title').value,
            price: document.getElementById('price').value,
            url: document.getElementById('url').value
        }
    socket.emit("guardarNuevoProducto",nuevoProducto)
    })


    function AddMessage() {
        const mail = document.getElementById("mail").value;
        const mensaje = document.getElementById("mensaje").value;

        const nuevoMensaje = {
            mail: mail,
            mensaje: mensaje
        };

        socket.emit("nuevoMensaje", nuevoMensaje);
        return false;
    }

    function render(data) {
        const html = data.map((el, index) => {
            return (`
                    <div>
                        <strong>${el.email}</strong>;
                        <em>${el.mensaje}</em>
                    </div>`);
        }).join(" ");

        document.getElementById("messages").innerHTML = html;
    }

    socket.on("messages", (data) => {
        render(data);  
      })

