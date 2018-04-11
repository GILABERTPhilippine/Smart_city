$(document).ready(function () {
    var map;

    function init() {
        map = new L.Map('map');
        L.tileLayer('https://api.mapbox.com/styles/v1/julienchenel/cjfdz2p2fa5g92sq0dzgxf95o/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoianVsaWVuY2hlbmVsIiwiYSI6ImNqZmR6MGhvYjJiOGo0YXFoejFobXJqaGIifQ.SZ2HjrSNVhc7hCyXZlDv9A', {
            attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            maxZoom: 18
        }).addTo(map);
        map.attributionControl.setPrefix(''); // Don't show the 'Powered by Leaflet' text.

        // map view before we get the location
        map.setView(new L.LatLng(43.116312, 1.612136), 13);
    }

    init();
    getLocationLeaflet();

    function onLocationFound(e) {
        var radius = e.accuracy / 2;
        var location = e.latlng
        L.marker(location).addTo(map)
        L.circle(location, radius).addTo(map);
    }

    function onLocationError(e) {
        alert(e.message);
    }

    function getLocationLeaflet() {
        map.on('locationfound', onLocationFound);
        map.on('locationerror', onLocationError);

        map.locate({
            setView: true,
            maxZoom: 16
        });
    }

    // Ajouter un marker manuelle et un pop attribuer à ce marker
    // var marker = L.marker([43.11, 1.61]).addTo(map);
    // marker.bindPopup("<b>Etat résolu</b>").openPopup();


    //Récupération des points gps entrés par l'utilisateur depuis le localstorage
    var getUserMarkers = JSON.parse(localStorage.getItem("userMarkers"));
    console.log(getUserMarkers);

    //Obtenir la taille d'un objet
    Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
    };
    
    //Obtenir le nombre de paires clés/valeurs stockées dans l'objet getUserMarkers
    var objSize = Object.size(getUserMarkers);
    console.log("size : ",Object.size(getUserMarkers));

    var userMarkersKey = Object.keys(getUserMarkers);
    console.log(userMarkersKey);
    var userMarkersValue = Object.values(getUserMarkers);
    console.log(userMarkersValue);

    //Itération sur clés/valeurs de l'objet et contruction des coordonnnées gps
    //Limite le nombre d'itération au nombre de clés/valeurs déjà stockées via objSize

  

function createMarkers(){
  //Création du tableau contenant les différentes coordonnées utilisateur
  var markers = [];

    for(var i = 0; i <= objSize-1;i++){
        //récupération de la clé à chaque itération
        var key = userMarkersKey[i];
        //récupération de la valeur à chaque itération
        var values = userMarkersValue[i];
        console.log("clé", key);
        console.log("valeurs", values);
        console.log("latitude",values.lat);
        console.log("longitude",values.lon);
        console.log("categorie",values.cat);
        //Récupération des valeurs correspondant aux clés, lat,lon et cat
        var latitude = values.lat;
        var longitude = values.lon;
        var categorie = values.cat;
        //Ajout du point sur la carte
        markers = L.marker([latitude, longitude]).addTo(map).bindPopup("<b>"+categorie+"</b>").openPopup();
        }
}

createMarkers();

    var lat = 43.116312;
    var lon = 1.61;

    console.log(lat);
    console.log(lon);

    sessionStorage.setItem("lat",lat);
    sessionStorage.setItem("lon",lon);
    
});