
function verificarPerfil(){
    
    var categoria = document.getElementById("categoriaPostulante")
    var desactivar = document.getElementById("Tipo")
    // desactivar.setAttribute("disabled", false);
    
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var db = firebase.firestore();
            db.collection("users").where("email", "==", user.email).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if(doc.data().type == "Semilleros de investigación"){
                        desactivar.innerHTML =`<select class="form-select" aria-label="Disabled select example" disabled>
                        <option selected>Tipo de Investigación</option>
                        <option value="Experimental">Experimental</option>
                        <option value="No experimental">No experimental</option>
                        </select>`
                    }else{
                        desactivar.innerHTML =`<select class="form-select" aria-label="Disabled select example" id="tipoinvestigacion">
                        <option selected>Tipo de Investigación</option>
                        <option value="Experimental">Experimental</option>
                        <option value="No experimental">No experimental</option>
                        </select>`
                    }
                    categoria.innerHTML =`<span class="input-group-text" id="Categoría">Categoría</span>
                    <input type="text" class="form-control" value="${doc.data().type}" id="categoria" aria-label="Sizing example input" aria-describedby="Categoría" disabled>`
                    document.getElementById("responsable").innerHTML =`
                    <span class="input-group-text" id="NombreResponsable">Responsable</span>
            <input type="text" id="responsable" value="${doc.data().firstName} ${doc.data().secondName}" class="form-control" aria-label="Sizing example input" aria-describedby="NombreResponsable" disabled>`
                    document.getElementById("carrera").innerHTML=`
                    <span class="input-group-text" id="NombreResponsable">Carrera</span>
                    <input type="text" id="carrera" value="${doc.data().carrera}" class="form-control" aria-label="Sizing example input" aria-describedby="NombreResponsable" disabled>`
        });
            });
        } else {
          // User is signed out
          // ...
        }
    });
}

verificarPerfil()


function guardar(){
    var storageRef = firebase.storage().ref();
    var file = document.getElementById('formFile').files[0]
    var uploadTask = storageRef.child(file.name).put(file);
    uploadTask.on('state_changed', function(snapshot){
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
        guardarDatos(downloadURL)
    });
    });
}

function guardarDatos(id) {
    var downloadURL = id
    var nombreProyecto = document.getElementById("NombreProyecto").value
    var tipoinvestigacion = document.getElementById("tipoinvestigacion").value
    var carrera = document.getElementById("carrera").value
    var objetivoGeneral = document.getElementById("objetivo").value
    var problemaSolucionar = document.getElementById("problema").value
    var inicio = document.getElementById("inicio").value
    var fin = document.getElementById("fin").value
    var actividad = document.getElementById("Actividad").value
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            guardarAcoleccion(downloadURL,nombreProyecto,tipoinvestigacion,objetivoGeneral,problemaSolucionar,user.email,inicio,fin,actividad,carrera)
        }
    });
}
function guardarAcoleccion(id, nombreProyecto, tipoinvestigacion, objetivoGeneral, problemaSolucionar,email,inicio,fin,Actividad,carrera) {
            var db = firebase.firestore();
            db.collection("users").where("email", "==", email).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    db.collection("nombre-proyecto").add({
                        nombreProyecto: nombreProyecto,
                        tipoinvestigacion: tipoinvestigacion,
                        objetivoGeneral: objetivoGeneral,
                        problemaSolucionar: problemaSolucionar,
                        archivo: id,
                        responsable: doc.data().firstName+' '+doc.data().secondName,
                        categoria: doc.data().type,
                        actividad: Actividad,
                        carrera: carrera,
                        FechaInicio: inicio,
                        FechaFin: fin
                    })
                    .then((docRef) => {
                        document.getElementById("sucessfull").innerHTML =`
                        <div class="alert alert-success" role="alert">
                            se registro Correctamente
                        </div>`
                    })
                    .catch((error) => {
                        document.getElementById("sucessfull").innerHTML =`
                        <div class="alert alert-danger" role="alert">
                            Fallo al registrar
                        </div>`
                    });
                });
            });
}