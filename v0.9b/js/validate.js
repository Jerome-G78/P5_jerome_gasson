/* Fichier JavaScript */

// On crée l'objet XMLHttpRequest()
let xhr = new XMLHttpRequest();

// Variables
ID="";
productID=[];
Lense = "";
Qty = 0;
DataParse ="";

// Order in progress ...
Validation = document.getElementById("Validation");
Working = document.getElementById("Working");
// Validation.style.visibility="hidden";

// Requête serveur AJAX
/*
let xhr = new XMLHttpRequest();                         // On crée l'objet XMLHttpRequest()
xhr.open("GET","http://localhost:3000/api/cameras");    // On initialise notre requête avec open()
xhr.responseType = "json";                              // On veut une réponse au format JSON
xhr.send();                                             // On envoie la requête
*/

// Promesse
function Load(xhr){
    return new Promise ((resolve, reject) => {
        xhr.open("GET","http://localhost:3000/api/cameras");
        xhr.responseType = "json";
        xhr.send();
        
        xhr.onload = () => resolve(xhr.status);
        xhr.onerror = () => reject(xhr.status);
    })
}

Load(xhr).then(() => {
    // Si le status HTTP est 200, on affiche la réponse
    console.log(xhr.response);

    // Affichage des produits
    for (i =0; i < xhr.response.length; i++){
        if (localStorage.getItem(xhr.response[i]._id+"-Cart-qty") !=null){
            // Ajout de l'élément au tableau products  
            productID[productID.length] = new Array (xhr.response[i]._id);
            console.log(productID);
            Lense = localStorage.getItem(xhr.response[i]._id+"-Cart-lense");
            Qty = localStorage.getItem(xhr.response[i]._id+"-Cart-qty");

            CAM = new CreateItem (xhr.response[i]._id,xhr.response[i].name,xhr.response[i].imageUrl,xhr.response[i].description,Lense,xhr.response[i].price);
            addElement(CAM._id,CAM.name,CAM.imageUrl,CAM.description,Lense,Qty,CAM.price);
            Total(CAM.price);
        }

    }

}).catch((xhr) =>{
    alert("La requête à échoué");
})
/*
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
        console.log(xhr.response);                                                  // Récupération des informations dans la console

        for (i =0; i < xhr.response.length; i++){                                   // Affichage des produits
            if (localStorage.getItem(xhr.response[i]._id+"-Cart-qty") !=null){
                productID[productID.length] = new Array (xhr.response[i]._id);      // Ajout de l'élément au tableau products  
                console.log(productID);
                Lense = localStorage.getItem(xhr.response[i]._id+"-Cart-lense");
                Qty = localStorage.getItem(xhr.response[i]._id+"-Cart-qty");

                CAM = new CreateItem (xhr.response[i]._id,xhr.response[i].name,xhr.response[i].imageUrl,xhr.response[i].description,Lense,xhr.response[i].price);
                addElement(CAM._id,CAM.name,CAM.imageUrl,CAM.description,Lense,Qty,CAM.price);
                Total(CAM.price);
            }

        }
    
    };
}
*/

// Fonction de création d'un produit
function CreateItem (ID,name,imageUrl,description,lense,price){
    this._id = ID,
    this.name = name,
    this.imageUrl = imageUrl,
    this.description = description,
    this.lense = lense,
    this.price = price
}

// Ajout du produit au tableau 
function addElement (id,name,imageUrl,description,lense,qty,price){

    let tr = document.createElement("tr");
    tr.id = id;
    tr.setAttribute("class","Item");

    let td1 = document.createElement("td");
    td1.setAttribute("class","name align-middle");

    td1.appendChild(document.createTextNode(name));
    tr.appendChild(td1);

    let td2 = document.createElement("td");
    td2.setAttribute("class","imageUrl align-middle");

    let pict = document.createElement("img");
        pict.setAttribute("src",imageUrl);
        pict.setAttribute("width","256");
        pict.setAttribute("height","auto");
        pict.setAttribute("alt","Photo du produit");
        pict.setAttribute("class","img-thumbnail");
    
    td2.appendChild(pict);
    tr.appendChild(td2);
    
    let td3 = document.createElement("td");
    td3.setAttribute("class","description align-middle");
    td3.appendChild(document.createTextNode(description));
    tr.appendChild(td3);

    let td4 = document.createElement("td");
    td4.setAttribute("class","lense align-middle");
    td4.appendChild(document.createTextNode(lense));

    tr.appendChild(td4);

    let td5 = document.createElement("td");
    td5.setAttribute("class","Qty align-middle");
    
    td5.appendChild(document.createTextNode(qty));
    
    tr.appendChild(td5);

    let td6 = document.createElement("td");
    td6.setAttribute("class","price align-middle");

    td6.appendChild(document.createTextNode(price));
    tr.appendChild(td6);

    document.getElementById("ProductList").append(tr);
}

// Mise à jour du prix
function Total (price){
    let Total = document.getElementById("Total").innerHTML;
    Total = price * Qty + Number(document.getElementById("Total").innerHTML);
    document.getElementById("Total").innerHTML = Total;
}

// JSON.pase (récupération des objets retourné par le serveur)
Dataparse = JSON.parse(localStorage.getItem("POST-response"));

// Affichage de l'order ID & des informations de livraison
let OrderID = document.getElementById("orderID").innerHTML = Dataparse.orderId;
let firstName = document.getElementById("firstName").innerHTML = localStorage.getItem("myFirstName");
let lastName = document.getElementById("lastName").innerHTML = localStorage.getItem("myLastName");
let address = document.getElementById("address").innerHTML = localStorage.getItem("myAddress");
let city = document.getElementById("city").innerHTML = localStorage.getItem("myCity");
let email = document.getElementById("email").innerHTML = localStorage.getItem("myEmail");

// Récupération des informations terminée
Working.style.display="none";
// Validation.style.visibility="show";