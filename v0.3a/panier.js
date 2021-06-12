/* Fichier JavaScript */

// Verification des informations entrées par l'utilisateur, avant validation

// Récupération des éléments
let nom="", prenom="", adresse="", ville="", email="", validation="";
let NF="", PF="", AF="", VF="", EF="";

nom = document.getElementById("nom");
prenom = document.getElementById("prenom");
adresse = document.getElementById("adress");
ville = document.getElementById("city");
email = document.getElementById("email");
validation = document.getElementById("validation");

NF = document.getElementById("ErrorNom");
PF = document.getElementById("ErrorPrenom");
AF = document.getElementById("ErrorAdress");
VF = document.getElementById("ErrorCity");
EF = document.getElementById("ErrorMail");

// Regex de verification nom, prenom, ville, email

npv = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?/;
mail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
adr = /([0-9a-zA-Z,\.]*) ?([0-9]) ?([a-zA-Z]*)/;

// Fonction
validation.addEventListener('click',f_valid);

function f_valid(e){                                // Création de la fonction associé
    if (nom.validity.valueMissing) {
        e.preventDefault();                         // blocage de l'envoie du formulaire
        NF.textContent = "Nom manquant";            // Affichage d'un message d'erreur
        NF.style.color = "red";
    }
    else if(npv.test(nom.value) == false) {
        e.preventDefault();
        NF.textContent = "Format incorrect";
        NF.style.color="orange";
    }

    else if (prenom.validity.valueMissing) {
        e.preventDefault();                         
        PF.textContent = "Prénom manquant";
        PF.style.color = "red";
    }

    else if(npv.test(prenom.value) == false) {
        e.preventDefault();
        PF.textContent = "Format incorrect";
        PF.style.color="orange";
    }

    else if (adresse.validity.valueMissing) {
        e.preventDefault();                         
        AF.textContent = "Adresse manquante";
        AF.style.color = "red";
    }

    else if(adr.test(adresse.value) == false) {
        e.preventDefault();
        AF.textContent = "Format incorrect";
        AF.style.color="orange";
    }

    else if (ville.validity.valueMissing) {
        e.preventDefault();                         
        VF.textContent = "Ville manquante";
        VF.style.color = "red";
    }

    else if(npv.test(ville.value) == false) {
        e.preventDefault();
        VF.textContent = "Format incorrect";
        VF.style.color="orange";
    }

    else if (email.validity.valueMissing) {
        e.preventDefault();                         
        EF.textContent = "E-Mail manquant";
        EF.style.color = "red";
    }

    else if(mail.test(email.value) == false) {
        e.preventDefault();
        EF.textContent = "Format incorrect";
        EF.style.color="orange";
    }

    else{
        // Envoie du formulaire
    }
}
