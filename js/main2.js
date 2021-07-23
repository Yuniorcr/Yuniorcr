
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
      console.log(uid)
    }
  } else {
    console.log("no exise")
  }
});

function mostrarTabla(){
  var db = firebase.firestore();
  var tb = document.getElementById("tabla")
  db.collection("users").get().then((querySnapshot) => {
    tb.innerHTML=''
    querySnapshot.forEach((doc) => {
       tb.innerHTML +=`
       <tr>
          <td>${doc.id}</td>
          <td>${doc.data().apellido}</td>
          <td>${doc.data().carrera}</td>
          <td>${doc.data().names}</td>
          <td><a href="#" class="link-danger" data-bs-toggle="modal" data-bs-target="#exampleModal4"><span class="iconify" data-icon="feather-trash-2" data-inline="false"></span>Eliminar</a></td>
          <td><a href="#" class="link-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="actualizar('${doc.id}','${doc.data().carrera}')"><span class="iconify" data-icon="feather-refresh-cw" data-inline="false"></span>Actualizar</a></td>
        </tr>`
    });
});
}
mostrarTabla()

function registrarJurado(){
  var error = document.getElementById("errorjurado");
  var db = firebase.firestore();
  db.collection("users").add({
    Apellidos: "Clinton",
    last: "Cardenas Quispe",
    born: 1999,
    code: "1005620181"
  })
  .then((docRef) => {
    error.innerHTML = `
    <div class="alert alert-success" role="alert">
      se ha ingresado correctamente
    </div>`
    console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
    error.innerHTML = `
    <div class="alert alert-danger" role="alert">
      ${error}
    </div>`
    console.error("Error adding document: ", error);
  });
}

function actualizar(id, carrera){
    document.getElementById('Apellidosj').value = id
    document.getElementById('Apellidosj').value = carrera
    
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

function eliminar(id) {
  var db = firebase.firestore();
  db.collection("users").doc(id).delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
}