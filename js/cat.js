$(document).ready(function(){

    //Récupération de la laltitude depuis le sessionstorage

    var lat = sessionStorage.getItem("lat");
    console.log(lat);

    //Récupération de la longitude depuis le sessionstorage

    var lon = sessionStorage.getItem("lon");
    console.log(lon);

    // Récupération de la catégorie dans le sessionstorage

    var categorie;
    var catValue;

    $(".cat").on("click", function (){

        //Catégorie format texte
        categorie = $(this).children().val();
        //Catégorie format chiffre
        catValue = $(this).data('catvalue');
        console.log("this data : ",$(this).data('catvalue'));
        console.log("this children val: ",$(this).children().val());
        console.log("categorie :",categorie);
        console.log("catValue :",catValue);

        //Stockage des valeurs dans le sessionstorage
        sessionStorage.setItem("categorie",categorie);
        sessionStorage.setItem("catValue",catValue);

        // console.log("sessionStorage : ",sessionStorage);
    });

});