window.onload = init;
var headers = {}
const API_URL = 'http://localhost:3000';

function init(){
    if(sessionStorage.getItem("token")){
        headers = {
            headers:{
                'Authorization': 'bearer ' + sessionStorage.getItem("token")
            }
        }
        document.querySelector('.mBoton').addEventListener('click',regresar)
        document.getElementById('button').addEventListener('click',registrar)
    }else{
        window.location.href="index.html"
    }
}

function regresar(){
    window.location.href="home.html"
}

function registrar(){
    var nombres = document.getElementById('nombres').value
    var apellidos = document.getElementById('apellidos').value
    var correo = document.getElementById('email').value
    var telefono = document.getElementById('telefono').value
    var direccion = document.getElementById('direccion').value

    axios({
        method:'post',
        url:API_URL+'/empleados',
        headers:headers.headers,
        data:{
            nombres:nombres,
            apellidos:apellidos,
            telefono:telefono,
            correo:correo,
            direccion:direccion,
        }
    }).then(function(res){
        alert("Empleado registrado correctamente")
        window.location.href="home.html"
    }).catch(function(err){
        alert("Empleado no se registró")
        console.log(err)
    })
}