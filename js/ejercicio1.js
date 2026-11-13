let listaNombres =[];

function agregarNombre(){
    let nombre = document.getElementById("nombre").value.trim().toUpperCase();  //trim elimina espacios  //toCaseUpper pone las letras en mayuscula  //.value es para tomar el valor de lo que escribí
    
    if(nombre===""){
        alert("Por favor ingrese el nombre");
        document.getElementById("nombre").classList.add("is-invalid");
        return;  //termina el proceso
    }
    else if(listaNombres.includes(nombre)){     //.includes mira si el nombre ya esta
        alert(`El nombre ${nombre} ya esta registrado`);
        document.getElementById("nombre").classList.remove("is-invalid");
        return;
    }
    else{
        document.getElementById("nombre").classList.remove("is-invalid");
        listaNombres.push(nombre);
        alert(`Se guardo el nombre: ${nombre}`);
        document.getElementById("nombre").value ="";
    }
    mostrarNombres();
}

function mostrarNombres(){
    let lista = document.getElementById("lista");
    let cantidad = document.getElementById("cantidad");

    lista.innerText="";

    for(let i =0; i<listaNombres.length; i++){            //.length cuenta cuantos eleementos hay
        lista.innerHTML+=`<li>${listaNombres[i]} </li>`;
    }
    cantidad.innerText=`Total Nombres: ${listaNombres.length}`;
}