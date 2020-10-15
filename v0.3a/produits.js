/* Fichier JavaScript */

// Variables globales
let CAM="";
let ID=localStorage.getItem("ID");  // Fixer la variable à l'élément séléctionnée

// Requête serveur AJAX

let xhr = new XMLHttpRequest();                         // On crée l'objet XMLHttpRequest()
xhr.open("GET","http://localhost:3000/api/cameras");    // On initialise notre requête avec open()
xhr.responseType = "json";                              // On veut une réponse au format JSON
xhr.send();                                             // On envoie la requête

// Si la requête n'as pas pu aboutir ...
xhr.onerror = function(){
    alert("La requête à échoué");
};

xhr.onload = function(){
    // Si le status HTTP n'est pas 200
    if (xhr.status != 200){
        // On affiche le status et le message correspondant
        alert("Erreur " + xhr.status + " : " + xhr.statusText);
    }
    else{
        // Si le status HTTP est 200, on affiche la réponse
        console.log(xhr.response);              // Récupération des informations dans la console

        for (i =0; i < xhr.response.length; i++){   // Affichage du produit séléctionnée
            if (Data[i]._id == ID){
            CAM = new CreateItem (Data[i]._id,Data[i].name,Data[i].imageUrl,Data[i].description,Data[i].lenses[0],Data[i].lenses[1],Data[i].price);
            addElement(CAM._id,CAM.name,CAM.imageUrl,CAM.description,Data[i].lenses[0],Data[i].lenses[1],CAM.price);}
        }
    }
};

// Fonction de création d'un produit

function CreateItem (ID,name,imageUrl,description,lense1,lense2,price){
    this._id = ID,
    this.name = name,
    this.imageUrl = imageUrl,
    this.description = description,
    this.lense1 = lense1,
    this.lense2 = lense2,
    this.price = price

//  alert(this._id +" \n "+ this.name +" \n "+ this.imageUrl +" \n "+ this.description +" \n "+ this.lense1 + " \n " + this.lense2 +" \n "+ this.price); // DEBUG
}

// Ajout du produit au tableau 

function addElement (id,name,imageUrl,description,lense1,lense2,price){

    let tr = document.createElement("tr");
    tr.id = id;

    let td1 = document.createElement("td");
    td1.setAttribute("class","name");

    td1.appendChild(document.createTextNode(name));
    tr.appendChild(td1);

    let td2 = document.createElement("td");
    td2.setAttribute("class","imageUrl");

    let pict = document.createElement("img");
        pict.setAttribute("src",imageUrl);
        pict.setAttribute("width","256");
        pict.setAttribute("height","auto");
        pict.setAttribute("alt","Photo du produit");
    
    td2.appendChild(pict);
    tr.appendChild(td2);
    
    let td3 = document.createElement("td");
    td3.setAttribute("class","description");
    td3.appendChild(document.createTextNode(description));
    tr.appendChild(td3);

    let td4 = document.createElement("td");
    td4.setAttribute("class","lense");

    let lenses = document.createElement("select");
        lenses.setAttribute("name","lenses");
        lenses.setAttribute("class","lenses");

    let L1 = document.createElement("option");
        L1.setAttribute("value",lense1);
        L1.setAttribute("slected","yes");
        L1.textContent = lense1;
    
    let L2 = document.createElement("option");
        L2.setAttribute("value",lense2);
        L2.textContent = lense2;

    td4.appendChild(lenses);
    lenses.appendChild(L1);
    lenses.appendChild(L2);
    tr.appendChild(td4);

    let td5 = document.createElement("td");
    td5.setAttribute("class","price");

    td5.appendChild(document.createTextNode(price));
    tr.appendChild(td5);

    document.getElementById("ProductList").append(tr);
}

// Personalisation

let lense = document.getElementsByClassName("lenses");
lense.addEventListener ("mouseover",setCurrentLense);

function setCurrentLense(){
    localStorage.setItem("lense", lense.textContent);
    alert(lense.textContent);
}

// Ajouter au panier
let name1 = document.getElementById("name");
let image1 = document.getElementById("imageUrl");
let desc1 = document.getElementById("description");
let lense1 = document.getElementById("lense");
let price1 = document.getElementById("price");


let btn = document.getElementById("AddCart");
btn.addEventListener("click", addToCart(name1.textContent,image1.textContent,description1.textContent,lense1.textContent,price1.textContent));

function addToCart (name,imageUrl,description,lense,price){
    this.name = name,
    this.imageUrl = imageUrl,
    this.description = description,
    this.lense = lense,
    this.qty = 1,
    this.price =price

    localStorage.setItem("name", this.name);
    localStorage.setItem("imageUrl", this.imageUrl);
    localStorage.setItem("description", this.description);
    localStorage.setItem("qty", this.qty);
    localStorage.setItem("price", this.price);

    console.log(this.name + " - "+ this.imageUrl + " - " + this.description + " - " + this.qty + " - " + this.price);
}
