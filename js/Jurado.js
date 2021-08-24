let n1=0,n2=0, n3=0, n4=0 , n5=0, n6=0, n7=0, n8=0, n9=0;
let totalT = 0;
subTotal = document.getElementById('subTotal');
total = document.getElementById('total');
group1 = document.getElementsByName('inlineRadioOptions');
group2 = document.getElementsByName('inlineRadioOptions1');
group3 = document.getElementsByName('inlineRadioOptions2');
group4 = document.getElementsByName('inlineRadioOptions3');
group5 = document.getElementsByName('inlineRadioOptions4');
group6 = document.getElementsByName('inlineRadioOptions5');
group7 = document.getElementsByName('inlineRadioOptions6');
group8 = document.getElementsByName('inlineRadioOptions7');
group9 = document.getElementsByName('inlineRadioOptions8');

group1.forEach(e => {
    e.addEventListener('change', () =>{
        n1 = e.value
        subTotal.innerText = n1
    })
});
group2.forEach(e => {
    e.addEventListener('change', () =>{
        n2 = e.value
        subTotal.innerText = parseInt(n2) + parseInt(n1)
    })
});
group3.forEach(e => {
    e.addEventListener('change', () =>{
        n3 = e.value
        subTotal.innerText = parseInt(n2) + parseInt(n1) + parseInt(n3)
    })
});
group4.forEach(e => {
    e.addEventListener('change', () =>{
        n4 = e.value
        subTotal.innerText = parseInt(n2) + parseInt(n1) + parseInt(n3) + parseInt(n4)
    })
});
group5.forEach(e => {
    e.addEventListener('change', () =>{
        n5 = e.value
        subTotal.innerText = parseInt(n2) + parseInt(n1) + parseInt(n3) + parseInt(n4) + parseInt(n5)
    })
});
group6.forEach(e => {
    e.addEventListener('change', () =>{
        n6 = e.value
        subTotal.innerText = parseInt(n2) + parseInt(n1) + parseInt(n3) + parseInt(n4) + parseInt(n5) + parseInt(n6)
    })
});
group7.forEach(e => {
    e.addEventListener('change', () =>{
        n7 = e.value
        subTotal.innerText = parseInt(n2) + parseInt(n1) + parseInt(n3) + parseInt(n4) + parseInt(n5) + parseInt(n6) + parseInt(n7)
    })
});
group8.forEach(e => {
    e.addEventListener('change', () =>{
        n8 = e.value
        subTotal.innerText = parseInt(n2) + parseInt(n1) + parseInt(n3) + parseInt(n4) + parseInt(n5) + parseInt(n6) + parseInt(n7) + parseInt(n8)
    })
});
group9.forEach(e => {
    e.addEventListener('change', () =>{
        n9 = e.value
        totalT = parseInt(n2) + parseInt(n1) + parseInt(n3) + parseInt(n4) + parseInt(n5) + parseInt(n6) + parseInt(n7) + parseInt(n8) + parseInt(n9)
        subTotal.innerText = totalT
        total.innerText = totalT
        calificar(totalT)
    })
});

function calificar(t){
    total.innerHTML=`<input type="text" value="${t}" id="total1" hidden>`
}

function sigOut(){
    firebase.auth().signOut().then(() => {
        location.href= "index.html"
    }).catch((error) => {
        console.log(error);
    });
}
mostrarProyectosJurado()
function mostrarProyectosJurado(){
    var tb= document.getElementById("juradoCalifica")
    var db = firebase.firestore();  
    firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                if (user !== null) {
                    const email = user.email;
                    // .where("email" , "==", email)
                    db.collection("asignacion").onSnapshot((querySnapshot) => { 
                        querySnapshot.forEach((doc) => {
                            tb.innerHTML =`
                            <tr>
                                <td>${doc.data().idProyecto}</td>
                                <td>${doc.data().Proyecto}</td>
                                <td><a href="#"onclick="update('${doc.data().idProyecto}')" value="${doc.data().idProyecto}" class="link-success" data-bs-toggle="modal" data-bs-target="#exampleModal"id="informacionP"><i class="fas fa-info-circle"></i> Información</a></td>
                                <td><a href="#"onclick="agregaridP('${doc.data().idProyecto}')" class="link-success" data-bs-toggle="modal" data-bs-target="#exampleModal1" id="revisar"><i class="fas fa-star"></i> Revisar</a></td>
                            </tr>`
                        });
                    });
                    }
            // ...
            } else {
            // User is signed out
            // ...
            }
    });
    
    
}

function agregaridP(id1){
    var id = document.getElementById("idproyecto1");
    id.value = id1
}

function revisar() {
    
    var id = document.getElementById("idproyecto1").value
    console.log(id);
    var db = firebase.firestore(); 
    var total = document.getElementById("total1").value;
    console.log(total);
    var washingtonRef = db.collection("nombre-proyecto").doc(id);

    // Set the "capital" field of the city 'DC'
    return washingtonRef.update({
        calificacion: total
    })
    .then(() => {
        console.log("Document successfully updated!");
    })
    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
}
function update(idProyectito){
    var db = firebase.firestore();  
    var NombreProyecto = document.getElementById("NombreProyecto")
    var Responsable = document.getElementById("Responsable")
    var categoriaPostulante = document.getElementById("categoriaPostulante")
    var objetivo = document.getElementById("objetivo")
    var problema = document.getElementById("problema")
    var Actividad = document.getElementById("Actividad")
    var descargame = document.getElementById("descargame")
    var inicio = document.getElementById("inicio")
    var fin = document.getElementById("fin")
    var docRef = db.collection("nombre-proyecto").doc(idProyectito);

    docRef.get().then((doc) => {
        if (doc.exists) {
            NombreProyecto.value = doc.data().nombreProyecto
            Responsable.value = doc.data().nombreProyecto
            categoriaPostulante.value = doc.data().categoria
            objetivo.value = doc.data().objetivoGeneral
            problema.value = doc.data().problemaSolucionar
            Actividad.value = doc.data().actividad
            fin.value= doc.data().FechaFin
            inicio.value = doc.data().FechaInicio
            descargame.innerHTML =`
            <a href="${doc.data().archivo}" type="button" class="btn btn-outline-danger">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-pdf" viewBox="0 0 16 16">
                <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"></path>
                <path d="M4.603 12.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.701 19.701 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.716 5.716 0 0 1-.911-.95 11.642 11.642 0 0 0-1.997.406 11.311 11.311 0 0 1-1.021 1.51c-.29.35-.608.655-.926.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.27.27 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.647 12.647 0 0 1 1.01-.193 11.666 11.666 0 0 1-.51-.858 20.741 20.741 0 0 1-.5 1.05zm2.446.45c.15.162.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.881 3.881 0 0 0-.612-.053zM8.078 5.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z"></path>
                </svg>
                download
            </a>`
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

