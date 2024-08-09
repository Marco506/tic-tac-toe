const divPadre = document.getElementById("divPadre");
const divHijos = document.getElementsByClassName("divHijos");

const reiniciar = document.getElementById("Reiniciar");

let letraA = document.getElementById("letraA");
let letraO = document.getElementById("letraO");
let empate = document.getElementById("empates")

let puntajeX = parseInt(localStorage.getItem("ganesX")) || 0;
let puntajeO = parseInt(localStorage.getItem("ganesO")) || 0;
let conteoEmpates = parseInt(localStorage.getItem("empate")) || 0;

document.getElementById("puntajex").innerHTML = puntajeX;
document.getElementById("puntajeo").innerHTML = puntajeO;
document.getElementById("contadorEmpate").innerHTML = conteoEmpates;

const ganes = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6] 
];

function winnerPerson() {
    for (const ganadores of ganes) {
        const [a, b, c] = ganadores;
        const valorA = divHijos[a].innerHTML;
        const valorB = divHijos[b].innerHTML;
        const valorC = divHijos[c].innerHTML;

        if (valorA && valorA === valorB && valorA === valorC) {
            return valorA;
        }
       
    }
    return null;
}

function checkEmpate() {
    const vacios = Array.from(divHijos).filter(div => div.innerHTML === "")

    if (vacios.length === 0) {
        let parrafo = document.createElement("h1");
        parrafo.innerHTML="EMPATE!"
        let divP = document.getElementById("parrafo");
        divP.appendChild(parrafo)

        conteoEmpates++;
        localStorage.setItem("empate", conteoEmpates);
        document.getElementById("contadorEmpate").innerHTML = conteoEmpates;
        return true;
        
    }
    return false;
}

function juego() {
    for (let index = 0; index < divHijos.length; index++) {
        divHijos[index].addEventListener("click", function() {
            if (divHijos[index].innerHTML === "") {  // Solo actúa si la celda está vacía
                divHijos[index].innerHTML = "X";
                divHijos[index].id= "styloL"
                 const ganador = winnerPerson();

                if (ganador) {
                    let parrafo = document.createElement("h1");
                    parrafo.innerHTML="GANA X!"
                    let divP = document.getElementById("parrafo");
                    divP.appendChild(parrafo)
    
                    

                    puntajeX++;
                    localStorage.setItem("ganesX", puntajeX);
                    document.getElementById("puntajex").innerHTML = puntajeX
                   
                    return;
                } 
                if (checkEmpate()) {
                    return;
                }
                
        

                // Convierte el HTMLCollection divHijos en un array para usar métodos de array
                const hijosListas = Array.from(divHijos);

                // Filtra los elementos que tienen un contenido HTML vacío
                const vacios = hijosListas.filter(div => div.innerHTML === "");

                // Si hay elementos vacíos, elige uno al azar para colocar una "O"
                if (vacios.length > 0) {
                    // Selecciona un elemento vacío al azar usando la función generadorO
                    const randomDiv = vacios[generadorO(vacios.length)];
                    // Cambia el contenido HTML del elemento elegido al azar a "O"
                    
                    randomDiv.innerHTML = "O";
                    randomDiv.id= "letraStyle"
                    const ganadorO = winnerPerson();
                    if (ganadorO) {
                        puntajeO++;
                        localStorage.setItem("ganesO", puntajeO);
                        document.getElementById("puntajeo").innerHTML = puntajeO;
                         let parrafo = document.createElement("h1");
                    parrafo.innerHTML="GANA O!"
                    let divP = document.getElementById("parrafo");
                    divP.appendChild(parrafo)
    
                        return;  
                    }
                    if (checkEmpate()) {
                        return;
                    }
                }
               
                
            }
           

        }, { once: true });
    }
}

juego();




function generadorO(max) {
    return Math.floor(Math.random() * max); 
}

reiniciar.addEventListener("click", function () {
    document.location.reload()
})










