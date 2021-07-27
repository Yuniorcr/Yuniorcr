function registrarProyecto(){
    db.collection("nombre-proyecto").add({
        
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}

function verificarPerfil(){
    
    var categoria = document.getElementById("categoriaPostulante")
    var desactivar = document.getElementById("Tipo")
    // desactivar.setAttribute("disabled", false);
    
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var db = firebase.firestore();

            db.collection("users").where("email", "==", user.email).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if(doc.data().type == "3"){
                        desactivar.innerHTML =`<select class="form-select" aria-label="Disabled select example" disabled>
                        <option selected>Tipo de Investigación</option>
                        <option value="1">Experimental</option>
                        <option value="2">No experimental</option>
                      </select>`
                    }else{
                        desactivar.innerHTML =`<select class="form-select" aria-label="Disabled select example" id="tipoinvestigacion">
                        <option selected>Tipo de Investigación</option>
                        <option value="1">Experimental</option>
                        <option value="2">No experimental</option>
                      </select>`
                    }
                    categoria.innerHTML =`<span class="input-group-text" id="Categoría">Categoría</span>
    <input type="text" class="form-control" value="${doc.data().type}" id="categoria"aria-label="Sizing example input" aria-describedby="Categoría" disabled>`
                });
            });
        } else {
          // User is signed out
          // ...
        }
      });
    
    
}

verificarPerfil()