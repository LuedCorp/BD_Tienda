// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyAOFIICSy4uGif6xHxy5jMBmVDVo1XYVQ0",
    authDomain: "ttk2-632d5.firebaseapp.com",
    projectId: "ttk2-632d5"
  });
  
  // Initialize Cloud Firestore and get a reference to the service
  var db = firebase.firestore();
  
  // Validar que los campos no estén vacíos
  function validarLleno() {
    var nombre = document.getElementById('nombre').value.trim();
    var categoria = document.getElementById('categoria').value.trim();
    var precio = document.getElementById('precio').value.trim();
  
    if (!nombre || !categoria || !precio) {
      alert("Todos los campos deben estar llenos.");
      return false;
    }
    return true;
  }
  
  // Guardar documentos
  function guardar() {
    if (!validarLleno()) {
      return;
    }
  
    var nombre = document.getElementById('nombre').value;
    var categoria = document.getElementById('categoria').value;
    var precio = document.getElementById('precio').value;
  
    db.collection("tienda").add({
      nombre: nombre,
      categoria: categoria,
      precio: precio
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      document.getElementById('nombre').value = '';
      document.getElementById('categoria').value = '';
      document.getElementById('precio').value = '';
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }
  
//Leer Documentos 
var tabla = document.getElementById('tabla');
db.collection("tienda").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        tabla.innerHTML += `          
        <tr>
        <td>${doc.data().nombre}</td>
        <td>${doc.data().categoria}</td>
        <td>${doc.data().precio}</td>
        <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().nombre}','${doc.data().categoria}','${doc.data().precio}')">Editar</button></td>
        </tr>`
    });
});
  
  // Borrar documentos
  function eliminar(id) {
    db.collection("tienda").doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }
  
  // Actualizar documentos
  function editar(id, nombre, categoria, precio) {
    document.getElementById('nombre').value = nombre;
    document.getElementById('categoria').value = categoria;
    document.getElementById('precio').value = precio;
  
    var boton = document.getElementById('boton');
    boton.innerHTML = 'Editar';
    boton.onclick = function() {
      if (!validarLleno()) {
        return;
      }
  
      var nombre = document.getElementById('nombre').value;
      var categoria = document.getElementById('categoria').value;
      var precio = document.getElementById('precio').value;
  
      var washingtonRef = db.collection("tienda").doc(id);
  
      return washingtonRef.update({
        nombre: nombre,
        categoria: categoria,
        precio: precio
      })
      .then(() => {
        console.log("Document successfully updated!");
        boton.innerHTML = 'Guardar';
        boton.onclick = guardar;
        document.getElementById('nombre').value = '';
        document.getElementById('categoria').value = '';
        document.getElementById('precio').value = '';
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
    };
  }
  