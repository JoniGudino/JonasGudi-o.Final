const api = 'https://api.yumserver.com/16786/products'
//Obtener Productos 

fetch(api)
.then(response => response.json())
.then(MostrarProductos)
.catch(error => console.error('Error:', error));

//Mostrar Productos
function MostrarProductos (productos){
    let html='';
    for (let i = 0; i < productos.length; i++)
         {
        html +=`<tr>
        <td>${productos[i].idcod} </td>
        <td>${productos[i].titulo} </td>
        <td>${productos[i].precioPeso} </td>
        <td>${productos[i].precioDolar} </td>
        <td>${productos[i].fecha} </td>
        <td><button onclick ="Borrar('${productos[i].idcod}')">Borrar</button></td>
        <td><button onclick ="ApareceModificar('${productos[i].idcod}')">Modificar</button></td>
        </tr> `;
        
    }
    document.getElementById('identificador').innerHTML=html;
}
//Crear Productos
function guardar(){
fetch(api, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
titulo: document.getElementById("Titulo").value,
precioPeso: document.getElementById("PrecioPeso").value,
precioDolar: document.getElementById("PrecioDolar").value,
fecha: document.getElementById("Fecha").value
})
})
.then(response => response.text())
.then(function (respuesta){
    if (respuesta == "OK"){
        alert ("Producto Agregado")
    }
    else {
        alert (respuesta)
    }

})
.catch(error => console.error('Error:', error));
}

//Eliminar Productos 
function Borrar(Idcod){
    if(confirm("¿Quieres eliminar el producto?")){
        fetch(api, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            idcod: Idcod  
            })
            })
            .then(response => response.text())
            .then(function (respuesta){
                if (respuesta == "OK"){
                    alert ("Producto Eliminado")
                }
                else {
                    alert (respuesta)
                }
            
            })
            .catch(error => console.error('Error:', error));
    }
   
    }
    

    //Modificar Producto
    function Modificar(Idcod){
        fetch(api, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        idcod:Idcod,         
        titulo: document.getElementById("Title").value,
        precioPeso: document.getElementById("PrecioenPesos").value,
        precioDolar: document.getElementById("PrecioenDolares").value,
        fecha: document.getElementById("FechadeModificacion").value
        })
        })
        .then(response => response.text())
        .then(function (respuesta){
            if (respuesta == "OK"){
                alert ("Producto modificado")
            }
            else {
                alert (respuesta)
            }
        
        })
        .catch(error => console.error('Error:', error));
        }
var id=['Tablaproductos','formMod']
        function aparecer(_id){
            for (let i = 0;  i< id.length; i++) {
                document.getElementById(id[i]).setAttribute('style','display:none')
                
            }
            document.getElementById(_id).removeAttribute('style');
        }

        function ApareceModificar(idRecibidora){
            aparecer("formMod")
            let htmll='';
            htmll=`<button onclick = "Modificar('${idRecibidora}')">Modificar</button>`
            document.getElementById("btnmodificar").innerHTML = htmll;

        }