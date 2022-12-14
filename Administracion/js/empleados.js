window.onload = init;
var headers = {}
const API_URL = 'https://tallerdenode.azurewebsites.net';

function init(){
    if(sessionStorage.getItem("token")){
        headers = {
            headers:{
                'Authorization': 'bearer ' + sessionStorage.getItem("token")
            }
        }
        loadEmpleados()
        document.querySelector('.lupa').addEventListener('click',search)
        document.querySelector('.mBoton').addEventListener('click',agregar)
    }else{
        window.location.href="index.html"
    }
    var today = new Date();
    var hour = today.getHours()
    var saludo1 = ''
    var saludo2 = ''
    if(hour>18){
        saludo1='Buenas'
        saludo2='Noches'
    }else if(hour>11){
        saludo1='Buenas'
        saludo2='Tardes'
    }else{
        saludo1='Buenos'
        saludo2='Días'
    }
    console.log(saludo1 + " " + saludo2)
    document.getElementById("mTitle").innerHTML = saludo1
    document.getElementById("mNombre").innerHTML = saludo2
}

function loadEmpleados(){
    axios.get(API_URL+"/empleados",headers)
    .then(function(res){
        console.log(res)
        displayEmpleados(res.data.message)
    }).catch(function(err){
        console.log(err)
    })
}

function displayEmpleados(emp){
    var datos = document.getElementById("datos")
    for(i=0;i<emp.length;i++){
        datos.innerHTML += `<div class="datos">
                                <div class="nombre">
                                    <h3>${emp[i].nombre} ${emp[i].apellidos}</h3>
                                </div>
                                <div class="tel">
                                    <h3>${emp[i].telefono}</h3>
                                </div>
                                <div class="correo">
                                    <h3>${emp[i].correo}</h3>
                                </div>
                                <div class="direccion">
                                    <h3>${emp[i].direccion}</h3>
                                </div>
                                <div class="imagen">
                                    <img
                                        src="./images/editar.png"
                                        height="20"
                                        width="20"
                                        onclick="window.location.href='edit.html?id=${emp[i].id}'"
                                    />
                                </div>
                                <div class="imagen">
                                    <img
                                        src="./images/eliminar.png"
                                        height="20"
                                        width="20"
                                        onclick="window.location.href='delete.html?id=${emp[i].id}'"
                                    />
                                </div>
                            </div>`
    }
}

function search(){
    var nombre = document.getElementById('nombre').value
    if(nombre.length>0){
        axios.get(API_URL+"/empleados/"+nombre,headers)
        .then(function(res){
            var datos = document.getElementById("datos")
            datos.innerHTML = ''
            displayEmpleados(res.data.message)
        }).catch(function(err){
            alert("Usuario no encontrado :(")
        })
    }else{
        axios.get(API_URL+"/empleados",headers)
        .then(function(res){
            console.log(res)
            var datos = document.getElementById("datos")
            datos.innerHTML = ''
            displayEmpleados(res.data.message)
        }).catch(function(err){
            console.log(err)
        })
    }
}

function agregar(){
    window.location.href="add.html"
}