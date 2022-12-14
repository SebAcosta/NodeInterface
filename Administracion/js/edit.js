window.onload = init;
var headers = {}
let id = 0
const API_URL = 'http://localhost:3000';

function init(){
    if(sessionStorage.getItem("token")){
        headers = {
            headers:{
                'Authorization': 'bearer ' + sessionStorage.getItem("token")
            }
        }
        let params = new URLSearchParams(document.location.search);
        id = parseInt(params.get("id"));
        loadDatos()
        document.querySelector('.mBoton').addEventListener('click',regresar)
        document.getElementById('button').addEventListener('click',modificar)
    }else{
        window.location.href="index.html"
    }
}

function regresar(){
    window.location.href="home.html"
}

function modificar(){
    var nombres = document.getElementById('nombres').value
    var apellidos = document.getElementById('apellidos').value
    var correo = document.getElementById('email').value
    var telefono = document.getElementById('telefono').value
    var direccion = document.getElementById('direccion').value

    axios({
        method:'PUT',
        url:API_URL+'/empleados/'+id,
        headers:headers.headers,
        data:{
            nombres:nombres,
            apellidos:apellidos,
            telefono:telefono,
            correo:correo,
            direccion:direccion,
        }
    }).then(function(res){
        alert("Empleado modificado correctamente")
        window.location.href="home.html"
    }).catch(function(err){
        alert("Empleado no se modificó")
        console.log(err)
    })
}

function loadDatos(){
    axios.get(API_URL+"/empleados/"+id,headers)
    .then(function(res){
        console.log(res)
        displayDatos(res.data.message)
    }).catch(function(err){
        console.log(err)
    })
}

function displayDatos(datos){
    document.getElementById('nombres').value = datos[0].nombre
    document.getElementById('apellidos').value = datos[0].apellidos
    document.getElementById('email').value = datos[0].correo
    document.getElementById('telefono').value = datos[0].telefono
    document.getElementById('direccion').value = datos[0].direccion
}