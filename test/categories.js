// $(document).ready(function () {

console.log("ahhhu");

var titre = $("#titre").text();


$(".carreCat").click(function () {
    var texte = $("#texte").text();


    titre = texte;

    console.log(titre);


});
// console.log(titre);

// $(".carreCat").click(function () {

//     var btncarreCat = $(this).data("recupCat");
//     console.log(recupCat);
//     var recupValue = $(".carreCat").val();

//     $.ajax({
//         url: "formulaire.html",
//         method: "GET",
//         dataType: "html",
//         data: {
//             action: btncarreCat,
//             aenvoyer: recupValue
//         },
//         success: function (arg) {
//             if (btncarreCat) {
//                 $("#cat1").html(arg);
//                 $("#texte").val("");
//             }
//         }
//     });

// });

// get();

// $(".carreCat").click(function () {
//     $.get("formulaire.html", function (data) {
//         $("#titre").show(recupCat);
//     });
// });
// });