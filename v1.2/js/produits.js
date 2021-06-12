/* Fichier JavaScript */

// API
// let UrlAPI = 'http://localhost:3001/api/';
let UrlAPI = 'https://shadsoft.fr:3001/api/';

const Table = document.getElementById('ProductsTable');
const AddProduct = document.getElementById('AddCart');
Table.style.display = "none";
AddProduct.style.display = "none";

// On crée l'objet XMLHttpRequest()
let xhr = new XMLHttpRequest();

// Variables globales
let CAM = "";
let Lense = "";

// Initialiser une quantité
let Qty = localStorage.setItem("qty", 0);

// Fixer la variable à l'élément séléctionnée
let ID = localStorage.getItem("ID");

// Requête serveur AJAX (GET)

// Promesse
function Load(xhr) {
    return new Promise((resolve, reject) => {
        xhr.open("GET", UrlAPI + "cameras/" + ID);
        xhr.responseType = "json";
        xhr.send();

        xhr.onload = () => resolve(xhr.status);
        xhr.onerror = () => reject(xhr.status);
    })
}

Load(xhr).then(() => {
    // Si le status HTTP est 200, on affiche la réponse
    Table.style.display = "inline-block";

    // Affichage du produit séléctionnée
    document.getElementById("AddCart").style.display = "inline-block";
    CAM = new CreateItem(xhr.response._id, xhr.response.name, xhr.response.imageUrl, xhr.response.description, xhr.response.lenses[0], xhr.response.lenses[1], xhr.response.price);
    addElement(CAM._id, CAM.name, CAM.imageUrl, CAM.description, xhr.response.lenses[0], xhr.response.lenses[1], CAM.price);

    // Personalisation
    let lense = document.getElementsByClassName("lenses");

    for (let element of lense) {
        element.addEventListener("click", event => {
            Lense = element.value;
            localStorage.setItem("lense", element.value);
        })

        Lense = element.value;
        localStorage.setItem("lense", element.value);
    }

}).catch((e) => {
    Table.style.display = "none";
    AddProduct.style.display = "none";
    document.getElementById("OnError").innerHTML = "Oups! - Vous n'avez pas sélectionné de produit, vous allez être redirrigé vers l'accueil...";
    setTimeout(function () {
        document.getElementById('OnError').innerHTML = "";
        document.getElementById('OnSucess').innerHTML = "";
        document.location.href="index.html"; 
    }, 1500);
})

// Fonction de création d'un produit

function CreateItem(ID, name, imageUrl, description, lense1, lense2, price) {
    this._id = ID,
        this.name = name,
        this.imageUrl = imageUrl,
        this.description = description,
        this.lense1 = lense1,
        this.lense2 = lense2,
        this.price = price
}

// Ajout du produit au tableau 

function addElement(id, name, imageUrl, description, lense1, lense2, price) {

    let tr = document.createElement("tr");
    tr.id = id;
    tr.setAttribute("class", "Item");

    let td1 = document.createElement("td");
    td1.setAttribute("class", "name align-middle");

    td1.appendChild(document.createTextNode(name));
    tr.appendChild(td1);

    let td2 = document.createElement("td");
    td2.setAttribute("class", "imageUrl align-middle");

    let pict = document.createElement("img");
    pict.setAttribute("src", imageUrl);
    pict.setAttribute("width", "256");
    pict.setAttribute("height", "auto");
    pict.setAttribute("alt", "Photo du produit");
    pict.setAttribute("class", "img-thumbnail");

    td2.appendChild(pict);
    tr.appendChild(td2);

    let td3 = document.createElement("td");
    td3.setAttribute("class", "description align-middle");
    td3.appendChild(document.createTextNode(description));
    tr.appendChild(td3);

    let td4 = document.createElement("td");
    td4.setAttribute("class", "lense align-middle");

    let lenses = document.createElement("select");
    lenses.setAttribute("name", "lenses");
    lenses.setAttribute("class", "lenses");

    let L1 = document.createElement("option");
    L1.setAttribute("value", lense1);
    L1.setAttribute("slected", "yes");
    L1.textContent = lense1;

    let L2 = document.createElement("option");
    L2.setAttribute("value", lense2);
    L2.textContent = lense2;

    td4.appendChild(lenses);
    lenses.appendChild(L1);

    if (lense2 != null) {
        lenses.appendChild(L2);
    }
    tr.appendChild(td4);

    let td5 = document.createElement("td");
    td5.setAttribute("class", "price align-middle");

    td5.appendChild(document.createTextNode(price));
    tr.appendChild(td5);

    document.getElementById("ProductList").append(tr);
}

// Ajouter au panier

let btn = document.getElementById("AddCart");
btn.addEventListener('click', function () {
    let id = localStorage.getItem("ID");
    let lense = localStorage.getItem("lense");
    let qty = 1;

    localStorage.setItem(id + "-Cart-qty", qty);
    localStorage.setItem(id + "-Cart-lense", lense);
    localStorage.setItem(id + "-Cart-ID", id);

    document.getElementById("OnSucess").innerHTML = "Produit ajouté!";

    // Effacer les Messages sous 3 secondes
    setTimeout(function () {
        document.getElementById('OnError').innerHTML = "";
        document.getElementById('OnSucess').innerHTML = "";
    }, 2000);
});