$(document).ready(function(){

    var lat = sessionStorage.getItem("lat");
    console.log(lat);

    var lon = sessionStorage.getItem("lon");
    console.log(lon);

    // sessionStorage.removeItem("couleur");
    // sessionStorage.clear();

    // Récupérer la catégorie dans le localstorage

    var categorie;
    var catValue;

    $(".cat").on("click", function (){
        categorie = $(this).children().val();
        catValue = $(this).data('catvalue');
        console.log("this data : ",$(this).data('catvalue'));
        console.log("this children val: ",$(this).children().val());
        console.log("categorie :",categorie);
        console.log("catValue :",catValue);

        sessionStorage.setItem("categorie",categorie);
        sessionStorage.setItem("catValue",catValue);

        // console.log("sessionStorage : ",sessionStorage);
    });

});