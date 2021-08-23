


document.getElementById("SigIn").addEventListener("click",function validateEmail(){
  email = document.getElementById('email').value;
  password = document.getElementById('pass').value;

  if (validarEmail(email) && password.length >=6){
      SigIn(email, password)
  } else {
    errorMes = document.getElementById("error1")
    errorMes.innerHTML =`
    <div class="alert alert-danger" role="alert">
    Email o password incorrectos
  </div>`;
    
  }
})

document.getElementById("pass").addEventListener("keypress", function(event){
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("SigIn").click();
  }
})
document.getElementById("email").addEventListener("keypress", function(event){
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("SigIn").click();
  }
})

function SigIn(email, password){
    
    document.getElementById("load").innerHTML =`
    <div class="d-flex justify-content-center" id="load1">
      <div class="spinner-border text-info" role="status">
      </div><br>
      <p>Loading...</p>
    </div><br>`
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var db = firebase.firestore();
      db.collection("users").where("email", "==", email).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if(doc.data().participante == "postulante" ){
            location.href = "postulante-proyecto.html"
          }
          else if(doc.data().participante == "jurado" || doc.data().participante == "administrativo") {
            location.href = "main.html"
          }else {
            firebase.auth().signOut().then(() => {
              location.href = "/"
            }).catch((error) => {
              // An error happened.
            });
          }
            
        });
    });
    })
    .catch((error) => {
      var errorMessage = error.message;
      errorMes = document.getElementById("error1")
      errorMes.innerHTML =`
      <div class="alert alert-danger" role="alert">
      ${errorMessage}
      </div>`
      document.getElementById("load1").remove()
    });
}

document.getElementById("recuperar").addEventListener("click",function recuperar(){
    var email = document.getElementById("emailre").value
    var auth = firebase.auth();
    var emailAddress = email;
    var content = document.getElementById('error2')
    if (validarEmail(email)){
      auth.sendPasswordResetEmail(emailAddress).then(function() {
        content.innerHTML = `
            <div class="alert alert-success" role="alert">
            Se ha enviado un email de recuperacion a su correo
            </div>`
          document.getElementById('emailre').value = ''
    }).catch(function(error) {
        content.innerHTML = `
            <div class="alert alert-danger" role="alert">
            ${error.errorMessage}
            </div>`
          document.getElementById('emailre').value = ''
    });
    }else{
      content.innerHTML = `
            <div class="alert alert-danger" role="alert">
            Ingrese un Email valido
            </div>`
    }
} )

function sesionActiva(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            location.href = "main.html"
        } else {
            console.log('Don\'t session')
        }
      });
}

document.getElementById("registrarPostulante").addEventListener("click",function registrarPostulante(){
  email = document.getElementById("emailr").value
  pass = document.getElementById("passr").value
  firstName = document.getElementById("nombresr").value
  secondName = document.getElementById("apelliodosr").value
  code = document.getElementById("codigor").value
  carrera = document.getElementById("carrerar").value
  type = document.getElementById("tipor").value
  error2 = document.getElementById("errorPostulante")
  if (validarEmail(email.trim()) && validarPassword(pass.trim()) && validarDatos(firstName.trim(), secondName.trim()) && validarCodigo(code.trim()) && validarSelects(carrera,  type)){
    document.getElementById("load3").innerHTML =`
    <div class="d-flex justify-content-center" id="load1">
      <div class="spinner-border text-info" role="status">
      </div><br>
      <p>Loading...</p>
    </div><br>`
    firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then((userCredential) => {
      // Signed in
      registrarTablaUsers(email,firstName,secondName,code, carrera, type)
      enviarEmail()
      document.getElementById("load1").remove()
      error2.innerHTML = `
      <div class="alert alert-success" role="alert">
        se ha registro correctamente
      </div>`
      document.getElementById("emailr").value = ""
      document.getElementById("passr").value = ""
      document.getElementById("nombresr").value = ""
      document.getElementById("apelliodosr").value = ""
      document.getElementById("codigor").value = "" 
      document.getElementById("carrerar").value = "1"
      document.getElementById("tipor").value = "1"
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage)
      // ..
      document.getElementById("load1").remove()
      error2.innerHTML = `
      <div class="alert alert-danger" role="alert">
        ${errorCode}<br>
        ${errorMessage}
      </div>`
  
    });
  }
})


function registrarTablaUsers(email, firstName, secondName, code, carrera, type){
  var db = firebase.firestore();
  db.collection("users").add({
        email: email,
        firstName: firstName,
        secondName: secondName,
        code: code,
        carrera: carrera,
        type: type,
        participante: "postulante"
    })
    .then((docRef) => {
    })
    .catch((error) => {
        
    });
}

function enviarEmail(){
  firebase.auth().currentUser.sendEmailVerification()
  .then(() => {
  });
}


function validarEmail(email){
  var emailE = document.getElementById("emailr")
  if (email !=0 && /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(email)) {
    emailE.className ="form-control"
    return true;
  }else{
    emailE.className += " is-invalid";
    return false;
  }
}

function validarPassword(password){
  var passwordE = document.getElementById("passr")
  if (password.length <=5 || password.length >30) {
    passwordE.className += " is-invalid";
    return false;
  }else{
    passwordE.className ="form-control"
    return true;
  }
}

function validarDatos(nombre, apellido){
  var nombreE = document.getElementById("nombresr")
  var apellidoE = document.getElementById("apelliodosr")
  if (nombre.length ==0 && apellido.length ==0 || nombre.length > 40 || apellido.length >60) {
    nombreE.className += " is-invalid";
    apellidoE.className += " is-invalid";
    return false;
  }else{
    nombreE.className ="form-control"
    apellidoE.className ="form-control"
    return true;
  }
}

function validarCodigo(codigo){
  var codigoE = document.getElementById("codigor")
  if (codigo.length == 8 || codigo.length == 10 && /^[0-9]{10}$/.test(codigo)) {
    console.log("e")
    codigoE.className ="form-control"
    return true;
  }else{
    codigoE.className += " is-invalid";
    return false;
  }
}

function validarSelects(carrera, tipo){
  var carreraE = document.getElementById("carrerar")
  var tipoE = document.getElementById("tipor")
  if (carrera == "1" && tipo == "1") {
    carreraE.className += " is-invalid";
    tipoE.className += " is-invalid";
    return false;
  }else{
    carreraE.className ="form-select"
    tipoE.className ="form-select"
    return true;
  }
}
