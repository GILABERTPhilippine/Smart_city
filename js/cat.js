$(document).ready(function(){

    var lat = sessionStorage.getItem("lat");
    console.log(lat);

    var lon = sessionStorage.getItem("lon");
    console.log(lon);

    // sessionStorage.removeItem("couleur");
    // sessionStorage.clear();

    // Récupérer la catégorie dans le localstorage

    var categorie;

    $(".cat").on("click", function (){
        categorie = $(this).children().val();
        // console.log("this : ",$(this).children().val());
        console.log("categorie :",categorie);
        sessionStorage.setItem("categorie",categorie);
        // console.log("sessionStorage : ",sessionStorage);
    });

});