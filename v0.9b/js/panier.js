/* Fichier JavaScript */

// On crée l'objet XMLHttpRequest()
let xhr = new XMLHttpRequest();

// Variables
ID="";
productID=[];
Lense = "";
Qty = 0;
order="";

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

    // Récupération des informations dans la console
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

    if(Cart.innerHTML != "0"){
        hideEmpty();
        ShowCleanCart();
    
        // masquer l'élément
        function hideEmpty(){
            let emptyCart = document.getElementById("emptyCart");
            emptyCart.style.display="none";
        }

        // Afficher l'élément
        function ShowCleanCart(){
            let cleanCart = document.getElementById("clean");
            cleanCart.style.visibility="visible";
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

        if(Cart.innerHTML != "0"){
            hideElement();
        
            // masquer l'élément
            function hideElement(){
                let emptyCart = document.getElementById("emptyCart");
                console.log(emptyCart);
                emptyCart.style.display="none";
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

//  alert(this._id +" \n "+ this.name +" \n "+ this.imageUrl +" \n "+ this.description +" \n "+ this.lense1 + " \n " + this.lense2 +" \n "+ this.price); // DEBUG
}

// Ajout du produit au tableau 
function addElement (id,name,imageUrl,description,lense,qty,price){

    let tr = document.createElement("tr");
    tr.id = id;
    tr.setAttribute("class","Item align-middle");

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

// Vider mon panier
let clear = document.getElementById("clean");
clear.addEventListener("click", function(){
    localStorage.clear();
    document.location.reload();
});

// Verification des informations entrées par l'utilisateur, avant validation

// Récupération des éléments
let nom="", prenom="", adresse="", ville="", email="", validation="", Cart="";
let NF="", PF="", AF="", VF="", EF="";

nom = document.getElementById("nom");
prenom = document.getElementById("prenom");
adresse = document.getElementById("adress");
ville = document.getElementById("city");
email = document.getElementById("email");
validation = document.getElementById("validation");
Cart = document.getElementById("Total");

NF = document.getElementById("ErrorNom");
PF = document.getElementById("ErrorPrenom");
AF = document.getElementById("ErrorAdress");
VF = document.getElementById("ErrorCity");
EF = document.getElementById("ErrorMail");

// Regex de verification nom, prenom, ville, email

npv = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?/;
mail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
adr = /([0-9a-zA-Z,\.]*) ?([0-9]) ?([a-zA-Z]*)/;

// Evenements

nom.addEventListener("input",function(){
    NF.textContent = "";
});

prenom.addEventListener("input",function(){
    PF.textContent = "";
});

adresse.addEventListener("input",function(){
    AF.textContent = "";
});

ville.addEventListener("input",function(){
    VF.textContent = "";
});

email.addEventListener("input",function(){
    EF.textContent = "";
});

validation.addEventListener('click',f_valid);


// Valider la commande
function f_valid(e){                                // Création de la fonction associé
    if(Cart.innerHTML != "0"){

        // Verification des données

        if (nom.validity.valueMissing) {
            e.preventDefault();                         // blocage de l'envoie du formulaire
            NF.textContent = "Nom manquant";            // Affichage d'un message d'erreur
            NF.style.color = "red";
        }
        else if(npv.test(nom.value) == false) {
            e.preventDefault();
            NF.textContent = "Format incorrect";
            NF.style.color = "orange";
        }
        else{                                           // préparation des données
            NF.textContent="";
            let myName = nom.value;
            localStorage.setItem("myLastName",myName);
        }

        if (prenom.validity.valueMissing) {
            e.preventDefault();                         
            PF.textContent = "Prénom manquant";
            PF.style.color = "red";
        }
        else if(npv.test(prenom.value) == false) {
            e.preventDefault();
            PF.textContent = "Format incorrect";
            PF.style.color = "orange";
        }
        else{
            PF.textContent="";
            let myFistName = prenom.value;
            localStorage.setItem("myFirstName",myFistName);
        }

        if (adresse.validity.valueMissing) {
            e.preventDefault();                         
            AF.textContent = "Adresse manquante";
            AF.style.color = "red";
        }
        else if(adr.test(adresse.value) == false) {
            e.preventDefault();
            AF.textContent = "Format incorrect";
            AF.style.color = "orange";
        }
        else{
            AF.textContent="";
            let myAdress = adresse.value;
            localStorage.setItem("myAddress",myAdress);
            
        }

        if (ville.validity.valueMissing) {
            e.preventDefault();                         
            VF.textContent = "Ville manquante";
            VF.style.color = "red";
        }
        else if(npv.test(ville.value) == false) {
            e.preventDefault();
            VF.textContent = "Format incorrect";
            VF.style.color = "orange";
        }
        else{
            VF.textContent="";
            let myCity = ville.value;
            localStorage.setItem("myCity",myCity);
        }

        if (email.validity.valueMissing) {
            e.preventDefault();                         
            EF.textContent = "E-Mail manquant";
            EF.style.color = "red";
        }
        else if(mail.test(email.value) == false) {
            e.preventDefault();
            EF.textContent = "Format incorrect";
            EF.style.color = "orange";
        }
        else{
            EF.textContent="";
            let myEmail = email.value;
            localStorage.setItem("myEmail",myEmail);
        }

        if(nom.value != "" && prenom.value != "" && adresse.value != "" && ville.value != "" && email.value != ""){
            // Envoie du formulaire POST
            document.forms["commander"].addEventListener("submit",sendData(e));
        }
        
    }
    else
    {
        alert("Votre panier est vide!");
    }

}

function sendData (e){
    e.preventDefault();
    // Création de l'objet Contact
    function createContact (firstName,lastName,address,city,mail){

        let contact = {
            "firstName" : firstName,
            "lastName" : lastName,
            "address" : address,
            "city" : city,
            "email" : mail
        }

        return contact;
    }

    let contact = createContact(nom.value,prenom.value,adresse.value,ville.value,email.value);

    // Création de l'objet array

    let products = [];
    for (let i = 0; i < productID.length; i++) {
        products.push(productID[i][0]);
    }

    console.log(products);

    order = {
        "contact" : contact,
        "products" : products
    };
    
    // Requête serveur AJAX (POST)
    
    /*
    // Promesse
    function Send(xhr){
        return new Promise ((resolve, reject) => {
            // On initialise notre requête avec open()
            xhr.open("POST","http://localhost:3000/api/cameras/order", true);
            // Option requise pour la methode POST envoie JSON
            xhr.setRequestHeader("Content-Type","application/json");
            xhr.send(JSON.stringify(order));
            
            xhr.onload = () => resolve(xhr.status);
            xhr.onerror = () => reject(xhr.status);
        })
    }

    Send(xhr).then(() => {
        // Si le status HTTP est 201, on affiche la réponse
        console.log(xhr.status);
        console.log(xhr.response);
        // Récupération des données dans LocalStorage
        localStorage.setItem("POST-response",xhr.responseText);
        location.href="validate.html";

    }).catch((xhr) =>{
        alert("La requête à échoué");
    })
    */

    let xhr = new XMLHttpRequest();                                                     // On crée l'objet XMLHttpRequest()
    xhr.open("POST","http://localhost:3000/api/cameras/order", true);                   // On initialise notre requête avec open()
    xhr.setRequestHeader("Content-Type","application/json");                            // Option requise pour la methode POST envoie JSON
    xhr.send(JSON.stringify(order));                                                    // On envoie la requête

    xhr.onerror = function(){
        alert("La requête à échoué");
    };

    xhr.onload = function(){
        // Si le status HTTP n'est pas 201
        if (xhr.status != 201){
            // On affiche le status et le message correspondant
            alert("Erreur " + xhr.status + " : " + xhr.statusText);
        }
        else{
            // Si le status HTTP est 201, on affiche la réponse
            console.log(xhr.response);                                                  // Récupération des informations dans la console
            localStorage.setItem("POST-response",xhr.responseText);                     // Récupération des données dans LocalStorage
            location.href="validate.html";
        }
    }
    
}