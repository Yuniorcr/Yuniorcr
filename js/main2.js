document.getElementById("SigOut").addEventListener("click", function sigOut(){
  firebase.auth().signOut().then(() => {
      location.href= "index.html"
    }).catch((error) => {
      console.log(error);
    });
})

setTimeout(() => {
  firebase.auth().signOut().then(() => {
    location.href= "index.html"
  }).catch((error) => {
    console.log(error);
  });
}, 1200000);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;
    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
    }
  } else {
    console.log("no exise")
  }
});

function mostrarTablaj(){
  var db = firebase.firestore();
  var tb = document.getElementById("tablaj")
  db.collection("users").where("participante", "==", "jurado").onSnapshot((querySnapshot) => {
    tb.innerHTML=''
    querySnapshot.forEach((doc) => {
      tb.innerHTML +=`
      <tr> 
          <td>${doc.data().email}</td>
          <td>${doc.data().code}</td>
          <td>${doc.data().carrera}</td>
          <td>${doc.data().firstName}</td>
          <td>${doc.data().secondName}</td>
          <td>${doc.data().type}</td>
          <td>${doc.data().participante}</td>
          
          <td><a href="#" class="link-danger" data-bs-toggle="modal" data-bs-target="#exampleModal4" onclick="eliminarMensaje('${doc.id}','${doc.data().email}')"><span class="iconify" data-icon="feather-trash-2" data-inline="false"></span>Eliminar</a></td>
          <td><a href="#" class="link-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="actualizar('${doc.data().email}','${doc.data().firstName}','${doc.data().secondName}','${doc.data().code}','${doc.data().carrera}','${doc.data().type}')"><span class="iconify" data-icon="feather-refresh-cw" data-inline="false"></span>Actualizar</a></td>
        </tr>`
    });
});
}
mostrarTablaj()
// console.log(document.getElementById("id").value)
function mostrarTablap(){
  var db = firebase.firestore();
  var tb = document.getElementById("tablap")
  db.collection("users").where("participante", "==", "postulante").onSnapshot((querySnapshot) => {
    tb.innerHTML=''
    querySnapshot.forEach((doc) => {
    tb.innerHTML+=`
    <tr>
      <td>${doc.data().email}</td>
      <td>${doc.data().code}</td>
      <td>${doc.data().carrera}</td>
      <td>${doc.data().firstName}</td>
      <td>${doc.data().secondName}</td>
      <td>${doc.data().type}</td>
      <td>${doc.data().participante}</td>
      </tr>`
    });
  });
}
mostrarTablap()

function registrarJurado(){
  var errorj = document.getElementById("errorjurado");
  var db = firebase.firestore();
  email = document.getElementById("emailj").value
  pass = document.getElementById("passj").value
  firstName = document.getElementById("nombresj").value
  secondName = document.getElementById("apelliodosj").value
  code = document.getElementById("codigoj").value
  carrera = document.getElementById("carreraj").value
  type = document.getElementById("tipoj").value
  firebase.auth().createUserWithEmailAndPassword(email, pass)
  .then((userCredential) => {
    // Signed in
    db.collection("users").add({
      email: email,
      firstName: firstName,
      secondName: secondName,
      code: code,
      carrera: carrera,
      type: type,
      participante: "jurado"
    })
    .then((docRef) => {
      document.getElementById("emailj").value = ""
      document.getElementById("passj").value = ""
      document.getElementById("nombresj").value = ""
      document.getElementById("apelliodosj").value = ""
      document.getElementById("codigoj").value = ""
      errorj.innerHTML = `
    <div class="alert alert-success" role="alert">
      Se registro Correctamente<br>
    </div>`
    })
    .catch((error) => {
      console.log(error)
      console.log("no write")
    });
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage)
    // ..
    errorj.innerHTML = `
    <div class="alert alert-danger" role="alert">
      ${errorCode}<br>
      ${errorMessage}
    </div>`

  });
  
}

function actualizar(email, nombres, apellidos, codigo, carrera, tipo){
    
    document.getElementById("emailj").value = email
    document.getElementById("nombresj").value = nombres
    document.getElementById("apelliodosj").value = apellidos
    document.getElementById("codigoj").value = codigo
    document.getElementById('carreraj').value = carrera
    document.getElementById('tipoj').value = tipo
    
    // var boton = document.getElementById('boton')
    // boton.innerHTML=`editar`

    // boton.onclick = function () {
    //     var nombre = document.getElementById('nombres').value 
    //     var fecha = document.getElementById('fechas').value 
    //     var apellido = document.getElementById('apellidos').value 

    //     var washingtonRef = db.collection("users").doc(id);

    //     // Set the "capital" field of the city 'DC'
    //     return washingtonRef.update({
    //         nombre: nombre,
    //         apellido: apellido,
    //         fecha: fecha
    //     })
    //     .then(function() {
    //         console.log("Document successfully updated!");
    //         boton.innerHTML = 'save'
    //         document.getElementById('nombres').value = ''
    //         document.getElementById('fechas').value = ''
    //         document.getElementById('apellidos').value = ''
    //     })
    //     .catch(function(error) {
    //         // The document probably doesn't exist.
    //         console.error("Error updating document: ", error);
    //     }); 
    // }
}
function limpiarVentana() {
  document.getElementById("emailj").value = ""
  document.getElementById("passj").value = ""
  document.getElementById("nombresj").value = ""
  document.getElementById("apelliodosj").value = ""
  document.getElementById("codigoj").value = ""
}

function eliminarMensaje(idE, email) {
  console.log(email, idE)
  var deleteID = document.getElementById("Eliminar")
  var emailMensaje = document.getElementById("tituloEmail")
  emailMensaje.innerText = 'eliminar: '+email
  deleteID.innerHTML =`<input type="text" id="id" value="${idE}" class="form-control" hidden>`
}

function eliminar() {
  id = document.getElementById("id").value
  var db = firebase.firestore();
  db.collection("users").doc(id).delete().then(function() {
      console.log("Document successfully deleted!");
      document.getElementById("id").value = ""
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
}

function mostrarTablaProyectos(){
  var tb = document.getElementById("tablaProyectos")
  var db = firebase.firestore();
  db.collection("nombre-proyecto").onSnapshot((querySnapshot) => {
    tb.innerHTML=""
    querySnapshot.forEach((doc) => {
      tb.innerHTML +=`<tr>
        <td>${doc.data().nombreProyecto}</td>
        <td>${doc.data().responsable}</td>
        <td>${doc.data().tipoinvestigacion}</td>
        <td>${doc.data().problemaSolucionar}</td>
        <td>${doc.data().objetivoGeneral}</td>
        <td>${doc.data().categoria}</td>
        </tr>`
    });
  });
}
mostrarTablaProyectos()

function eliminar2(id) {
  var db = firebase.firestore();
  db.collection("nombre-proyecto").doc(id).delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
}