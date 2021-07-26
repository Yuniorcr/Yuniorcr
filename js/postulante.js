function sigOut(){
    firebase.auth().signOut().then(() => {
        location.href= "index.html"
    }).catch((error) => {
        console.log(error);
    });
}

function DatosPostulate(){ 
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var email = user.email;
            var db = firebase.firestore();
            
            var datos = document.getElementById("postulante")
            db.collection("users").where("email", "==", email).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                datos.innerHTML =`<tr>
                <td>Nombres</td>
                <td>${doc.data().firstName}</td>
                </tr>
                <tr>
                    <td>Apellidos</td>
                    <td>${doc.data().secondName}</td>
                </tr>
                <tr>
                    <td>Código</td>
                    <td>${doc.data().code}</td>
                </tr>
                <tr>
                    <td>Carrera</td>
                    <td>${doc.data().carrera}</td>
                </tr>
                <tr>
                    <td>Modalidad</td>
                    <td>${doc.data().type}</td>
                </tr>`
            });
        }); 
        } else {
          // User is signed out
            location.href = "index.html"
        }
    });
}
