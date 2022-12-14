window.onload = init;
const API_URL = 'http://localhost:3000';

function init(){
    if(!sessionStorage.getItem("token")){
        document.getElementById('button').addEventListener('click',login)
    }else{
        window.location.href = "home.html"
    }
}

function login(){
    var mail = document.getElementById('input-mail').value
    var pass = document.getElementById('input-password').value

    axios({
        method:'post',
        url:API_URL+'/user/login',
        data:{
            correo: mail,
            pass: pass
        }
    }).then(function(res){
        if(res.data.code === 200){
            sessionStorage.setItem("token",res.data.message)
            window.location.href ="home.html"
        }else{
            alert("Usuario y/o contraseña incorrectos")
        }
    }).catch(function(err){
        console.log(err)
    })
}