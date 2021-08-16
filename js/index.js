document.getElementById("SigIn").addEventListener("click",function validateEmail(){
  email = document.getElementById('email').value;
  password = document.getElementById('pass').value;

  if (/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(email) && password.length >=6){
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
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("SigIn").click();
  }
})
document.getElementById("email").addEventListener("keypress", function(event){
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("SigIn").click();
  }
})

function SigIn(email, password){
    document.getElementById("load").innerHTML =`
    <div class="d-flex justify-content-center">
      <div class="spinner-border text-info" role="status">
      </div><br>
      <p>Loading...</p>
    </div><br>`
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      var db = firebase.firestore();
      db.collection("users").where("email", "==", email).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if(doc.data().participante == "postulante"){
            location.href = "postulante-proyecto.html"
          }else{
            location.href = "main.html"
          }
          
        });
    });
    })
    .catch((error) => {
      
      var errorCode = error.code;
      var errorMessage = error.message;
      errorMes = document.getElementById("error1")
      errorMes.innerHTML =`
      <div class="alert alert-danger" role="alert">
      ${errorMessage}
      </div>`
      
    });
}

document.getElementById("recuperar").addEventListener("click",function recuperar(){
    var email = document.getElementById("emailre").value
    var auth = firebase.auth();
    var emailAddress = email;
    var content = document.getElementById('error2')
    if (/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(email)){
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

// document.getElementById("registrarPostulante").addEventListener("click",function registrarPostulante(){
//   email = document.getElementById("emailr").value
//   pass = document.getElementById("passr").value
//   firstName = document.getElementById("nombresr").value
//   secondName = document.getElementById("apelliodosr").value
//   code = document.getElementById("codigor").value
//   carrera = document.getElementById("carrerar").value
//   type = document.getElementById("tipor").value
//   error2 = document.getElementById("errorPostulante")
//   firebase.auth().createUserWithEmailAndPassword(email, pass)
//   .then((userCredential) => {
//     // Signed in
//     registrarTablaUsers(email,firstName,secondName,code, carrera, type)
//     enviarEmail()
//     error2.innerHTML = `
//     <div class="alert alert-success" role="alert">
//       se ha registro correctamente
//     </div>`
//   })
//   .catch((error) => {
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     console.log(errorMessage)
//     // ..
//     error2.innerHTML = `
//     <div class="alert alert-danger" role="alert">
//       ${errorCode}<br>
//       ${errorMessage}
//     </div>`

//   });
// })


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
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}

function enviarEmail(){
  firebase.auth().currentUser.sendEmailVerification()
  .then(() => {
    // Email verification sent!
    // ...
  });
}

document.getElementById("registrarPostulante").addEventListener("click",function validate(){
  email = document.getElementById("emailr").value
  pass = document.getElementById("passr").value
  firstName = document.getElementById("nombresr").value
  secondName = document.getElementById("apelliodosr").value
  code = document.getElementById("codigor").value
  carrera = document.getElementById("carrerar").value
  type = document.getElementById("tipor").value
  error2 = document.getElementById("errorPostulante")
  var password = document.getElementById("passr")
  if (pass.trim().length <=5) {
    password.className += " is-invalid";
    for (var i = 0; i <1; i++){
      password.insertAdjacentHTML('afterend', `<div class="invalid-feedback" id="errorpassword">La contraseña debe tener minimo 6 caracteres</div>`);
    }
  }else{
    var myobj = document.getElementById("errorpassword");
    myobj.remove()
    password.className ="form-control"
  }
})

