

    
    function handleFiles(files) {
    for (var i = 0; i < files.length; i++) {
        console.log(files.length)
        var file = files[i];
        var imageType = /^image\//;

        if (!imageType.test(file.type)) {
            continue;
        }
        var img = document.createElement("img");
        img.classList.add("miniature");
        img.file = file;
        document.getElementById("preview").appendChild(img); // En admettant que "preview" est l'élément div qui contiendra le contenu affiché. 

        var reader = new FileReader();
        reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
        reader.readAsDataURL(file);

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

// $(document).ready(function(){
//Récupération de la catégorie depuis le sessionstorage

var cat = sessionStorage.getItem("categorie");
console.log(cat);
$("#title").text(cat);

var lat = sessionStorage.getItem("lat");
console.log(lat);

var lon = sessionStorage.getItem("lon");
console.log(lon);


//Stocker le point gps dans un objet userMarkers

var userMarkers = {
    'obj1':{'lat' : "43.1", 'lon' : "1.6", 'cat' : "1"},
    'obj2':{'lat' : '43.2', 'lon' : '1.6', 'cat' : '1'},
    'obj3':{'lat' : 43.3, 'lon' : 1.6, 'cat' : 1},
    'obj4':{'lat' : 43.4, 'lon' : 1.6, 'cat' : 1},
    'obj5':{'lat' : 43.5, 'lon' : 1.6, 'cat' : 1},
    };


//Get the size of an object
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

var objSize = Object.size(userMarkers);

console.log("size : ",Object.size(userMarkers));

var userMarkersKey = Object.keys(userMarkers);
// console.log(userMarkersKey);
var userMarkersValue = Object.values(userMarkers);
// console.log(userMarkersValue);


// Itération sur clés/valeurs de l'objet et contruction des coordonnnées gps

for(var i = 0; i <= objSize-1;i++){
    var key = userMarkersKey[i];
    var values = userMarkersValue[i];
    console.log("clé", key);
    console.log("valeurs", values);
    console.log("latitude",values.lat);
    console.log("longitude",values.lon);
    console.log("categorie",values.cat);
    var latitude = values.lat;
    var longitude = values.lon;
// var marker = L.marker([latitude, longitude]);



}

// console.log("objet",userMarkers.obj1.lat);


localStorage.setItem("userMarkers", JSON.stringify(userMarkers));

var getUserMarkers = JSON.parse(localStorage.getItem("userMarkers"));

console.log("getUserMarkers",getUserMarkers);

//ecrire les nouvelles valeurs dans le tableau (objet)

var userMarkers = JSON.parse(localStorage.getItem("userMarkers"));

// ajouter la nouvelle ligne au tableau
var objetNumber = objSize+1;
var objet = 'obj'+objetNumber;
console.log("objet:",objet);
newEntry = {'lat' :lat,'lon':lon,'cat' :cat};
console.log(newEntry);
userMarkers[objet]= newEntry;

//Stocker a nouveau le tableau dans var userMarkers
localStorage.setItem("userMarkers", JSON.stringify(userMarkers));

var getUserMarkers = JSON.parse(localStorage.getItem("userMarkers"));

console.log("getUserMarkers + newEntry",getUserMarkers);//Regler pb affichage dans l'objet en sortie

//###############################tests#######################
//Créer les marqueurs
//Utiliser boucle for et ajouter les valeurs aux marqueurs avec :
// var latitude = userMarkers.Key.lat;
// var longitude = userMarkers.Key.lon;
// var marker = L.marker([latitude, longitude]);
// console.log(marker);


var userLat =[43];
var userLon =[43];


localStorage.setItem("userLat", JSON.stringify(userLat));
localStorage.setItem("userLon", JSON.stringify(userLon));

var storedLat = JSON.parse(localStorage.getItem("userLat"));
var storedLon = JSON.parse(localStorage.getItem("userLon"));

console.log("storedLat :",storedLat);
console.log("storedLon :",storedLon);

latitude = storedLat[0];
longitude = storedLon[0];

console.log("latitude :",latitude);
console.log("longitude :",longitude);



// });