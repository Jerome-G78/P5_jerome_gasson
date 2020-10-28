/* Fichier JavaScript */

// On crée l'objet XMLHttpRequest()
let xhr = new XMLHttpRequest();

// Variables globales
let CAM="";
let ID="";

// Requête serveur AJAX (GET)

// Promesse
function Load(xhr){
    return new Promise ((resolve, reject) => {

        // On initialise notre requête avec open()
        xhr.open("GET","http://localhost:3000/api/cameras");

        // On veut une réponse au format JSON
        xhr.responseType = "json";   
        
        // On envoie la requête
        xhr.send();                                             
        
        xhr.onload = () => resolve(xhr.status);
        xhr.onerror = () => reject(xhr.status);
    })
}

Load(xhr).then(() => {
    // Si le status HTTP est 200                 

    // Boucle for pour créer la liste des produits
    for (i =0; i < xhr.response.length; i++){
        CAM = new CreateItem (xhr.response[i]._id,xhr.response[i].name,xhr.response[i].imageUrl,xhr.response[i].description,xhr.response[i].price);
        addElement(CAM._id,CAM.name,CAM.imageUrl,CAM.description,CAM.price);
    }

    // Récupération de l'ID produit dans le localStorage
    let Item = document.getElementsByClassName("Item");

    // La variable element récupère l'index actuel HTMLCollection de Item
    for (let element of Item){
        element.addEventListener('click', event => {
            localStorage.setItem("ID",element.id);
        })
    }

}).catch((e) =>{
    alert("La requête à échoué : "+ e);
})

// Fonction de création d'un produit

function CreateItem (ID,name,imageUrl,description,price){
    this._id = ID,
    this.name = name,
    this.imageUrl = imageUrl,
    this.description = description,
    this.price = price
}

// Ajout du produit au tableau 

function addElement (id,name,imageUrl,description,price){

    let tr = document.createElement("tr");
    tr.id = id;
    tr.setAttribute("class","Item");

    let td1 = document.createElement("td");
    td1.setAttribute("class","align-middle");
    
    let link = document.createElement("a");
    link.setAttribute("href","produits.html");

    link.appendChild(document.createTextNode("Détail..."));
    td1.appendChild(link);
    tr.appendChild(td1);

    let td2 = document.createElement("td");
    td2.setAttribute("class","name align-middle");

    td2.appendChild(document.createTextNode(name));
    tr.appendChild(td2);

    let td3 = document.createElement("td");
    td3.setAttribute("class","imageUrl");
    td3.setAttribute("class","align-middle");

    let pict = document.createElement("img");
        pict.setAttribute("src",imageUrl);
        pict.setAttribute("width","256");
        pict.setAttribute("height","auto");
        pict.setAttribute("alt","Photo du produit");
        pict.setAttribute("class","img-thumbnail");

    td3.appendChild(pict);
    tr.appendChild(td3);

    let td4 = document.createElement("td");
    td4.setAttribute("class","description align-middle");

    td4.appendChild(document.createTextNode(description));
    tr.appendChild(td4);

    let td5 = document.createElement("td");
    td5.setAttribute("class","price align-middle");

    td5.appendChild(document.createTextNode(price));
    tr.appendChild(td5);

    document.getElementById("ProductList").append(tr);
}