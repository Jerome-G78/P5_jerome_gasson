Plan De Test
------------
[INDEX]

Action      > Récupération de la liste des produits au format JSON
Attendu     > xhr.status = 200
Resultat    > OK

Action      > Listing des produits via une boucle for & création des objets
Attendu     > Function CreateItem / créer un objet pour chaque produit
                Function addElement / ajouter les produits dans le tableau
Resultat    > OK

Action      > Lors du click sur "Détails..." d'un élément de le liste
Attendu     > Fixer la variable "ID" de LocalStorage au produit
                redirrection vers la page "produit.html"
Resultat    > OK

[PRODUITS]

Action      > Lors du chargement de la page
Attendu     > Récupération de l'ID produit dans la variable ID
Resultat    > OK

Action      > Listing du produit via une boucle for & création de l'objet; ainsi que l'ajout des options de personnalisation
Attendu     > Function CreateItem / créer un objet pour le produit selectionné avec ses options de personnalisation
                Function addElement / ajouter le produit dans le tableau
Resultat    > OK

Action      > Choix de l'option de personnalisation
Attendu     > Lense = element.value / Récupération de la valeur de l'élément séléctionné par l'utilisateur & attribution de cette valeur a la variable Lense de LocalStorage
Resultat    > OK

Action      > Ajouter au pannier & affichage du message de confirmation
Attendu     > Modification des variables du local Storage : id+"-Cart-qty" / id+"-Cart-lense" / id+"-Cart-ID" et affichage du message de succès : Produit ajouté!
Resultat    > OK

[PANIER]

Action      > Création de l'objet, listing du produit depuis le panier via une boucle for & une condition de présence dans le panier / Ajout des _id dans un tableau
Attendu     > (xhr.response[i]._id+"-Cart-qty") !=null) / Affichage des éléments du panier
                productID[productID.length] = new Array (xhr.response[i]._id) / Ajout des ID's au tableau productID[]
                fixer les variables Lense & Qty aux valeurs de LocalStorage id+"-Cart-lense et id+"-Cart-qty"
                AddElement / Ajout du produit au tableau
                Total / Calcul du prix (actualisation)
Resultat    > OK

Action      > Si le panier n'est pas vide, alors masquer la ligne d'information & afficher l'option permettant de vider celui-ci
Attendu     > emptyCart.style.display="none"; / masquer la ligne d'information
                cleanCart.style.display="inline-block"; / afficher l'option permettant de vider le panier
Resultat    > OK

Action      > Cliquer sur le bouton "Vider le panier"
Attendu     > localStorage.clear(); / Vider LocalStorage
                document.location.reload(); / Recharger la page
Resultat    > OK

[Formulaire]

Action      > Cliquer sur le bouton "Confirmer ma commande"
Attendu     > Verfification des divers champs 

    Action      > Tester l'existance du nom
    Attendu     > boolean (true/false)  / si false : afficher un message d'erreur.
    Resultat    > OK

        Action      > Tester la chaine renseigné via REGEX
        Attendu     > boolean (true/false) / si false : afficher un message d'avertissement.
        Resultat    > OK

            Action      > Si données verifiés et valide
            Attendu     > fixer la chaine myLastName de LocalStorage a la chaine renseigné par l'utilisateur
            Resultat    > OK
    
    Action      > Tester l'existance du prénom
    Attendu     > boolean (true/false)  / si false : afficher un message d'erreur.
    Resultat    > OK

        Action      > Tester la chaine renseigné via REGEX
        Attendu     > boolean (true/false) / si false : afficher un message d'avertissement.
        Resultat    > OK

            Action      > Si données verifiés et valide
            Attendu     > fixer la chaine myFirstName de LocalStorage a la chaine renseigné par l'utilisateur
            Resultat    > OK
    
    Action      > Tester l'existance de l'adresse
    Attendu     > boolean (true/false)  / si false : afficher un message d'erreur.
    Resultat    > OK

        Action      > Tester la chaine renseigné via REGEX
        Attendu     > boolean (true/false) / si false : afficher un message d'avertissement.
        Resultat    > OK

            Action      > Si données verifiés et valide
            Attendu     > fixer la chaine myAddress de LocalStorage a la chaine renseigné par l'utilisateur
            Resultat    > OK

    Action      > Tester l'existance de la ville
    Attendu     > boolean (true/false)  / si false : afficher un message d'erreur.
    Resultat    > OK

        Action      > Tester la chaine renseigné via REGEX
        Attendu     > boolean (true/false) / si false : afficher un message d'avertissement.
        Resultat    > OK

            Action      > Si données verifiés et valide
            Attendu     > fixer la chaine myCity de LocalStorage a la chaine renseigné par l'utilisateur
            Resultat    > OK
    
    Action      > Tester l'existance de l'adresse e-mail
    Attendu     > boolean (true/false)  / si false : afficher un message d'erreur.
    Resultat    > OK

        Action      > Tester la chaine renseigné via REGEX
        Attendu     > boolean (true/false) / si false : afficher un message d'avertissement.
        Resultat    > OK

            Action      > Si données verifiés et valide
            Attendu     > fixer la chaine myEmail de LocalStorage a la chaine renseigné par l'utilisateur
            Resultat    > OK

Resultat    > OK

Action > Tout les tests sont bons
Attendu > appel de function sendData 
            création de l'objet Contact
            création de l'objet Array
            envoie du formulaire et du tableau (objets) a l'API via la methode POST
Resultat > OK

Action > Récéption de la réponse serveur
Attendu > récupère l'orderId de la commande et le place dans la variable du LocalStorage
            redirrection vers validate.html
Resultat > OK

[VALIDATE]

Action      > Affichage d'un message de traitement de commande
Attendu     > Affichage de la DIV Working
Resultat    > OK

Action      > Création des objets, listing des produits de la commande via une boucle for
Attendu     > Affichage du tableau récapitulatif
Resultat    > OK

Action      > traitement de l'orderId
Attendu     > remplacement du contenue du span orderID par la chaine de la variable orderID de LocalStorage
Resultat    > OK

Action      > traitement de firstName
Attendu     > remplacement du contenue du span firstName par la chaine de la variable myFirstName de LocalStorage
Resultat    > OK

Action      > traitement de lastName
Attendu     > remplacement du contenue du span lastName par la chaine de la variable myLastName de LocalStorage
Resultat    > OK

Action      > traitement de address
Attendu     > remplacement du contenue du span address par la chaine de la variable myAddress de LocalStorage
Resultat    > OK

Action      > traitement de city
Attendu     > remplacement du contenue du span city par la chaine de la variable myCity de LocalStorage
Resultat    > OK

Action      > traitement de email
Attendu     > remplacement du contenue du span email par la chaine de la variable myEmail de LocalStorage
Resultat    > OK

Action      > Masquer le message de traitement de commande & afficher le résultat de traitement
Attendu     > Masquer de la DIV Working
                Afficher la DIV Validation
Resultat    > OK
----------------
