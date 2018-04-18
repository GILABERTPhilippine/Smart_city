function handleFiles(files) {

    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var imageType = /^image\//;

        // Routine de verification de la taille du fichier

        if (file.size > 20000000) {
            removePhoto();
            $("#erreurTaille").addClass("alert alert-danger mx-auto mt-3").text("Fichier trop volumineux. Veuillez réduire la résolution de votre photo.");
            continue;

            // Routine de verification du type de fichier

        }

        if (!imageType.test(file.type)) {
            $("#erreurTaille").addClass("alert alert-danger mx-auto mt-3").text("Ce fichier n'est pas une image");
            continue;
        }

        // Création de l'élément qui contiendra la miniature

        var img = document.createElement("img");
        img.classList.add("miniature");
        img.file = file;
        document.getElementById("preview").appendChild(img); // En admettant que "preview" est l'élément div qui contiendra le contenu affiché. 

        var reader = new FileReader();
        reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
        reader.readAsDataURL(file);
        $("#erreurTaille").empty();
        $("#erreurTaille").removeClass("alert alert-danger mx-auto mt-3");
        $('#cadrePhoto').children().hide();
        $('#supprimer').html("<label class='suppButton'><i class='fas fa-times-circle fa-3x'></i><input type='button' onchange='removePhoto()'>");
        $("#supprimer").show();


    }
}

$('#supprimer').on("click", removePhoto);

function removePhoto() {
    // Une même image ne s'affichera pas si elle est rechargée une seconde fois.
    $("#preview").children().remove();
    $("#supprimer").children().hide();
    $('#cadrePhoto').children().show();
}

//Si $(document).ready en début de script, la fonction handleFiles() ne fonctionne plus

$(document).ready(function() {
    //Récupération de la catégorie depuis le sessionstorage

    //Valeur catégorie à envoyer en base
    var cat = sessionStorage.getItem("catValue");
    console.log("catValue", cat);

    //Valeur catégorie à afficher en titre de page
    var categorie = sessionStorage.getItem("categorie");
    console.log("categorie", categorie);
    $("#title").text(categorie);

    //Récupération de la latitude depuis le sessionstorage
    var lat = sessionStorage.getItem("lat");
    console.log("lat", lat);

    //Récupération de la longitude depuis le sessionstorage
    var lon = sessionStorage.getItem("lon");
    console.log("lon", lon);

    //Affichage (masqué) des valeurs à envoyer en base dans un input de type hidden

    $("#latitude").val(lat);
    $("#longitude").val(lon);
    $("#categorie").val(cat);

    //Obtenir le nombre d'enregistrements / la taille d'un objet
    Object.size = function(obj) {
        var size = 0,
            key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    //Stocker les valeurs de cat, lat, lon dans un JSON

    console.log(localStorage.getItem("userMarkers") == null);

    $("#envoi").on('click', function() {
        console.log("lat envoyée", lat);
        console.log("lon envoyée", lon);
        console.log("cat envoyée", cat);

        //Vérification de la présence de l'objet userMarkers dans le locastorage 

        if (localStorage.getItem("userMarkers") == null) {
            // Initialiser la première ligne de l'objet dans une variable
            var userMarkers = { "obj1": { "lat": lat, "lon": lon, "cat": categorie } };
            //Stockage de l'objet dans le localstorage
            localStorage.setItem("userMarkers", JSON.stringify(userMarkers));
            //Vérification de la présence de l'objet (affichage console)
            getUserMarkers = JSON.parse(localStorage.getItem("userMarkers"));
            console.log("getUserMarkers if : ", getUserMarkers);
        } else {
            //L'objet existe déjà dans le localstorage
            //Récupération de l'objet userMarkers
            getUserMarkers = JSON.parse(localStorage.getItem("userMarkers"));
            console.log("getUserMarkers else : ", getUserMarkers);

            //Calcul du nombre d'enregistrements dans l'objet
            var objSize = Object.size(getUserMarkers);
            console.log("size : ", Object.size(getUserMarkers));

            //Ajouter une nouvelle ligne au tableau:
            //Nombre de lignes
            var objetNumber = objSize + 1;
            //Concaténation du nom de la clé
            var objet = 'obj' + objetNumber;
            console.log("objet:", objet);
            //Création de la nouvelle ligne (valeur associée à la clé)
            newEntry = { "lat": lat, "lon": lon, "cat": categorie };
            console.log(newEntry);
            //Ajout de la ligne (valeur) dans la dernière clé de l'objet userMarkers
            getUserMarkers[objet] = newEntry;
            //Stocker le nouveau tableau dans l'objet userMarkers du localStorage
            setUserMarkers = localStorage.setItem("userMarkers", JSON.stringify(getUserMarkers));
        }
    })

    // console.log("getUserMarkers",getUserMarkers);


});