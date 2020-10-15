/* Fichier JavaScript */

// Variables globales
let Data="Not received!";

let CAM001="";
let CAM002="";
let CAM003="";
let CAM004="";
let CAM005="";
// Requête serveur AJAX

let xhr = new XMLHttpRequest();                         // On crée l'objet XMLHttpRequest()
xhr.open("GET","http://localhost:3000/api/cameras");    // On initialise notre requête avec open()
xhr.responseType = "json";                              // On veut une réponse au format JSON
xhr.send();                                             // On envoie la requête

xhr.onload = function(){
    // Si le status HTTP n'est pas 200
    if (xhr.status != 200){
        // On affiche le status et le message correspondant
        alert("Erreur " + xhr.status + " : " + xhr.statusText);
    }
    else{
        // Si le status HTTP est 200, on affiche la réponse
        console.log(xhr.response);              // Récupération des informations dans la console
        Data = xhr.response;

        for (i =0; i < xhr.response.length; i++){
            CAM = new CreateItem (Data[i]._id,Data[i].name,Data[i].imageUrl,Data[i].description,Data[i].price);
            CAM00[i] = CAM ;
        }
    }
};


// Si la requête n'as pas pu aboutir ...
xhr.onerror = function(){
    alert("La requête à échoué");
};

// Fonction de création d'un produit

function CreateItem (ID,name,imageUrl,description,price){
    this._id = ID,
    this.name = name,
    this.imageUrl = imageUrl,
    this.description = description,
    this.price = price
    
    alert(this._id, this.name, this.imageUrl, this.description, this.price);
    return this._id + this.name + this.imageUrl + this.description + this.price;
}

// création des produits

/*
CAM001 = new CreateItem ("CAM001","CamSuper8","images/vcam_2.jpg","Description",200);
CAM001 = new CreateItem ("CAM001","CamSuper8","images/vcam_2.jpg","Description",200);
CAM002 = new CreateItem ("CAM002","Cam8"    ,"images/vcam_2.jpg","Description",200);
CAM003 = new CreateItem ("CAM003","Retrocam","images/vcam_3.jpg","Description",170);
CAM004 = new CreateItem ("CAM004","DV-76950","images/vcam_4.jpg","Description",316);
CAM005 = new CreateItem ("CAM005","DV-95744","images/vcam_5.jpg","Description",700);
*/

// Positionnement des éléments dans un Array
let products = [];
products.push(CAM001,CAM002,CAM003,CAM004,CAM005);

// alert(products[0].name +"\n"+ products[1].name +"\n"+ products[2].name +"\n"+ products[3].name +"\n"+ products[4].name);

// Fonction Ajout des produits via le DOM

function addElement (id,name,imageUrl,description,price){

    let tr = document.createElement("tr");
    tr.id = id;

    let td1 = document.createElement("td");
    td1.appendChild(document.createTextNode(id));

    let td2 = document.createElement("td");
    td2.appendChild(document.createTextNode(name));

    let td3 = document.createElement("td");
    td3.appendChild(document.createTextNode(imageUrl));
 
    let td4 = document.createElement("td");
    td4.appendChild(document.createTextNode(description));

    let td5 = document.createElement("td");
    td5.appendChild(document.createTextNode(price));

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    // tbody = document.getElementById("ProductList");

    return (tr);
}

//Ajout des produits
let CAM = "";
let CAM1 = addElement (CAM001._id, CAM001.name, CAM001.imageUrl, CAM001.description, CAM001.price);
let CAM2 = addElement (CAM002._id, CAM002.name, CAM002.imageUrl, CAM002.description, CAM002.price);
let CAM3 = addElement (CAM003._id, CAM003.name, CAM003.imageUrl, CAM003.description, CAM003.price);
let CAM4 = addElement (CAM004._id, CAM004.name, CAM004.imageUrl, CAM004.description, CAM004.price);
let CAM5 = addElement (CAM005._id, CAM005.name, CAM005.imageUrl, CAM005.description, CAM005.price);

document.getElementById("ProductList").append(CAM1);
document.getElementById("ProductList").append(CAM2);
document.getElementById("ProductList").append(CAM3);
document.getElementById("ProductList").append(CAM4);
document.getElementById("ProductList").append(CAM5);