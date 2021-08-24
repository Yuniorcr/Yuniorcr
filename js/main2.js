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
      var db = firebase.firestore();
      db.collection("users").where("participante", "==", "administrativo").where("email", "==", email).onSnapshot((querySnapshot) => {
        if (querySnapshot.empty == true) {
          firebase.auth().signOut().then(() => {
            location.href= "/"
          }).catch((error) => {
            console.log(error);
          });
        }else if (querySnapshot.empty == false) {
          mostrarTablap()
          mostrarTablaProyectos()
          mostrarTablaj()
          mostrarColeccionAdministrador()
          mostrarConvocatoria()
          mostrarAsignacionP()
          seguimiento()
        }
    });
    }
  } else {
    location.href = "/"
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

function eliminar2(id) {
  var db = firebase.firestore();
  db.collection("nombre-proyecto").doc(id).delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
}


function registrarConvocatorias(){
  var nombreConvocatoria = document.getElementById("nameC").value
  var inicioConvocatoria = document.getElementById("icC").value
  var inicioPresentacion = document.getElementById("ipC").value
  var finPresentacion = document.getElementById("fpC").value
  var cierreConvocatoria = document.getElementById("cC").value
  var inicioevaluacion = document.getElementById("ieC").value
  var finevaluacion = document.getElementById("feC").value
  var publicacionresult = document.getElementById("prC").value
  var inicioejecucion = document.getElementById("iejC").value
  var basesconcurso = document.getElementById("bccC").files[0]
  var errorC= document.getElementById("convocatoriaE")
  var alertC = document.getElementById("convocatoriaEA")
  if(nombreConvocatoria.trim().length !=0 && inicioConvocatoria != "" && inicioPresentacion != "" && finPresentacion != "" && cierreConvocatoria != "" && inicioevaluacion != "" && finevaluacion != "" && publicacionresult != "" && inicioejecucion != "" && basesconcurso != undefined){
    var storageRef = firebase.storage().ref();
    var file = document.getElementById('bccC').files[0]
    var uploadTask = storageRef.child(file.name).put(file);
    uploadTask.on('state_changed', function(snapshot){
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    errorC.innerHTML = `<div class="progress">
                          <div class="progress-bar" role="progressbar" style="width: ${progress.toFixed(2)}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${progress.toFixed(2)}%</div>
                        </div>`
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
    }, function(error) {
    }, function() {
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      var db = firebase.firestore();
      db.collection("nombre_convocatoria").add({
        nombreConvocatoria: nombreConvocatoria.trim(),
        inicioConvocatoria:inicioConvocatoria,
        inicioPresentacion: inicioPresentacion,
        finPresentacion: finPresentacion,
        cierreConvocatoria: cierreConvocatoria,
        inicioevaluacion: inicioevaluacion,
        finevaluacion: finevaluacion,
        publicacionresult: publicacionresult,
        inicioejecucion: inicioejecucion,
        basesconcurso: downloadURL
      })
      alertC.innerHTML =`<br>
      <div class="alert alert-success" role="alert">
  se ha insertado Correctamente.
</div>
      `
    });
    });
  }

}
function mostrarConvocatoria(){
  var db = firebase.firestore();
  var tb = document.getElementById("convocatoriatb")
  db.collection("nombre_convocatoria").onSnapshot((querySnapshot) => {
    tb.innerHTML=''
    querySnapshot.forEach((doc) => {
      tb.innerHTML +=`
      <tr>
          <td>${doc.data().nombreConvocatoria}</td>
          <td>${doc.data().inicioConvocatoria}</td>
          <td>${doc.data().inicioPresentacion}</td>
          <td>${doc.data().finPresentacion}</td>
          <td>${doc.data().cierreConvocatoria}</td>
          <td>${doc.data().inicioevaluacion}</td>
          <td>${doc.data().finevaluacion}</td>
          <td>${doc.data().publicacionresult}</td>
          <td>${doc.data().inicioejecucion}</td>
          <td><a a href="${doc.data().basesconcurso}" class="link-danger">Descargar base</a></td>
          <td><a href="#" class="link-danger" data-bs-toggle="modal" data-bs-target="#exampleModal4" onclick="eliminarMensaje('${doc.id}','${doc.data().email}')"><span class="iconify" data-icon="feather-trash-2" data-inline="false"></span>Eliminar</a></td>
        </tr>`
    });
});
}



// document.getElementById('convocatoriasID').addEventListener('change', () =>
function seguimiento() {
  var db = firebase.firestore();
  var tb = document.getElementById("convocatoriasID")
    db.collection("nombre_convocatoria").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        tb.innerHTML +=`
        <option value="${doc.id}">${doc.data().nombreConvocatoria}</option>`
      });
  });
}
  


function subirPostulante(first, email) {
  var jurado = document.getElementById("juradoI")
  var eml = document.getElementById("emailM")
  eml.value = email
  jurado.value =first;
  hideFuncJ()
}

function hideFuncJ() {
  const truck_modal = document.querySelector('#elegirjurado');
  const modal = bootstrap.Modal.getInstance(truck_modal);    
  modal.hide();
}
document.getElementById("elegirJuradoM").addEventListener("click", function mostrarJuradosDesignacion(){
  var db = firebase.firestore();
  var tb = document.getElementById("mostrarJuradosDesignacion")
  
  db.collection("users").where("participante", "==", "jurado").onSnapshot((querySnapshot) => {
    tb.innerHTML=''
    querySnapshot.forEach((doc) => {
      tb.innerHTML +=`
        <tr>
          <td>${doc.data().firstName}</td>
          <td>${doc.data().secondName}</td>
          <td><button type="button" onclick="subirPostulante('${doc.data().firstName+" "+doc.data().secondName}','${doc.data().email}')" class="btn btn-success">Elegir</button></td>
        </tr>`
    });
});
})

function subirProyecto(first,id) {
  var jurado = document.getElementById("postulanteI")
  var id1 = document.getElementById("idP")
  jurado.value =first;
  id1.value =id;
  // hideFuncP()
}

// function hideFuncP() {
//   const truck_modal = document.querySelector('#elegirproyecto');
//   const modal = bootstrap.Modal.getInstance(truck_modal);    
//   modal.hide();
// }

// document.getElementById("proyectoElegir").addEventListener("click", () => {
//   var db = firebase.firestore();
//   var tb = document.getElementById("elegirproyectoM")
//   db.collection("nombre-proyecto").onSnapshot((querySnapshot) => {
//     tb.innerHTML=''
//     querySnapshot.forEach((doc) => {
//       tb.innerHTML +=`
//         <tr>
//           <td>${doc.data().nombreProyecto}</td>
//           <td>${doc.data().responsable}</td>
//           <td><button type="button" onclick="subirProyecto('${doc.data().nombreProyecto}')" class="btn btn-success">Elegir</button></td>
//         </tr>`
//     });
// });
// })

function hideFuncA() {
  const truck_modal = document.querySelector('#Asignaciones');
  const modal = bootstrap.Modal.getInstance(truck_modal);    
  modal.hide();
}
document.getElementById("saveAsig").addEventListener('click', () => {
  var jurado = document.getElementById("juradoI").value;
  var proyecto = document.getElementById("postulanteI").value;
  var idProyecto = document.getElementById("idP").value;
  var eml = document.getElementById("emailM").value;
  var db = firebase.firestore();
      db.collection("asignacion").add({
        Jurado: jurado,
        Proyecto:proyecto,
        idProyecto: idProyecto,
        emailJurado: eml
      })
      hideFuncA()
      var proyecto = db.collection("nombre-proyecto").doc(idProyecto);

      // Set the "capital" field of the city 'DC'
      return proyecto.update({
          emailjurado: eml
      })
      .then(() => {
          console.log("Document successfully updated!");
      })
      .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });


      
})

function mostrarAsignacionP(){
  var db = firebase.firestore();
  var tb = document.getElementById("mostrarAsignacion")
  db.collection("asignacion").onSnapshot((querySnapshot) => {
    tb.innerHTML=''
    querySnapshot.forEach((doc) => {
      tb.innerHTML +=`
        <tr>
          <td>${doc.data().Jurado}</td>
          <td>${doc.data().Proyecto}</td>
        </tr>`
    });
});
}

document.getElementById("carrerita").addEventListener("change",(e) => {
  filtrarProyectos(e.target.value);
})

function filtrarProyectos(carrera){
  var db = firebase.firestore();
  var tb = document.getElementById("mostrarTablitaProyecto")
  db.collection("nombre-proyecto").where("carrera", "==", carrera).onSnapshot((querySnapshot) => {
    tb.innerHTML=''
    querySnapshot.forEach((doc) => {
      if (doc.data().emailjurado == undefined) {
        tb.innerHTML +=`
        <tr>
          <td>${doc.data().nombreProyecto}</td>
          <td>${doc.data().responsable}</td>
          <td><button type="button" onclick="subirProyecto('${doc.data().nombreProyecto}','${doc.id}')" class="btn btn-success">Elegir</button></td>
        </tr>`
      }
    });
});
}

function mostrarColeccionAdministrador() {
  var db = firebase.firestore();
  var tb = document.getElementById("administracion")
  db.collection("users").where("participante", "==", "administrativo").onSnapshot((querySnapshot) => {
    tb.innerHTML=''
    querySnapshot.forEach((doc) => {
      tb.innerHTML +=`
      <tr> 
          <td>${doc.data().email}</td>
          <td>${doc.data().firstName}</td>
          <td>${doc.data().secondName}</td>
          <td>${doc.data().participante}</td>
          
          <td><a href="#" class="link-danger" data-bs-toggle="modal" data-bs-target="#exampleModal4" onclick="eliminarMensaje('${doc.id}','${doc.data().email}')"><span class="iconify" data-icon="feather-trash-2" data-inline="false"></span>Eliminar</a></td>
        </tr>`
    });
});
}
function agregarAdministrativo() {
  email = document.getElementById("emailAdmin").value
  password = document.getElementById("passAdmin").value
  nombre = document.getElementById("nameAdmin").value
  apellidos = document.getElementById("apelAdmin").value
  adminError = document.getElementById("errorAdministrativo")
  if (validarEmail(email.trim()) && validarPassword(password.trim()) && validarDatos(nombre.trim(),apellidos.trim())) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var db = firebase.firestore();
      db.collection("users").add({
        firstName: nombre.trim(),
        secondName:apellidos.trim(),
        email: email.trim(),
        participante: "administrativo"
      })
      adminError.innerHTML =
      `
      <div class="alert alert-success" role="alert">
        Se ha registrado Correctamente.
      </div>
      `
    })
    .catch((error) => {
      var errorMessage = error.message;
      adminError.innerHTML = `
      <div class="alert alert-danger" role="alert">
        ${errorMessage}
      </div>
      `
    });
    
  }
  
}

function validarEmail(email){
  var emailE = document.getElementById("emailAdmin")
  if (email !=0 && /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(email)) {
    emailE.className ="form-control"
    return true;
  }else{
    emailE.className += " is-invalid";
    return false;
  }
}

function validarPassword(password){
  var passwordE = document.getElementById("passAdmin")
  if (password.length <=5 || password.length >30) {
    passwordE.className += " is-invalid";
    return false;
  }else{
    passwordE.className ="form-control"
    return true;
  }
}

function validarDatos(nombre, apellido){
  var nombreE = document.getElementById("nameAdmin")
  var apellidoE = document.getElementById("apelAdmin")
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