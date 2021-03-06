$(document).ready(function () {
var map, lat, lon;

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
    console.log(radius);

    var location = e.latlng;
    console.log(location);

    //Récupération latitude utilisateur
    var lat = e.latlng.lat;
    console.log("latitude", lat);

    //Récupération longitude utilisateur
    var lon = e.latlng.lng;
    console.log("longitude",lon);

    //Stockage des valeurs dans le sessionStorage
    sessionStorage.setItem("lat", lat);
    sessionStorage.setItem("lon", lon);

    L.marker(location).addTo(map)
    L.circle(location, radius).addTo(map);
}

console.log("latitude hors function:",lat);
console.log("longitude hors function:",lon);

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

//Récupération des points gps entrés par l'utilisateur depuis le localstorage

//Obtenir le nombre d'enregistrements / la taille d'un objet
Object.size = function (obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
}

    //Attribution des groupes de marqueurs aux catégégories correspondantes

    var degUrb = L.layerGroup();
    var propVille = L.layerGroup();
    var voirie = L.layerGroup();
    var eclairage = L.layerGroup();
    var animaux = L.layerGroup();
    var espVert = L.layerGroup();
    var encombrants = L.layerGroup();
    var autres = L.layerGroup();
    var allCat = L.layerGroup();

    //Atribution d'un label (étiquette) à chaque groupe de marqueur

    var baseLayers = {
        "Dégradations urbaines": degUrb,
        "Propreté de la ville": propVille,
        "Voirie / Chaussée": voirie,
        "Eclairage public": eclairage,
        "Animaux perdus": animaux,
        "Espaces verts": espVert,
        "Encombrants": encombrants,
        "Autres": autres,
        "Toutes les catégories": allCat
    };

    //Ajout du bouton de filtrage ds catégories sur la carte
    L.control.layers(baseLayers).addTo(map);


    // Définition des couleurs des icones par catégorie

    var markerBleu = L.icon({
        className: 'my-icon',
        iconUrl: 'markers/map-marker-bleu.svg',
        iconSize: [38, 95],
    });
    var markerBleuF = L.icon({
        className: 'my-icon',
        iconUrl: 'markers/map-marker-bleuF.svg',
        iconSize: [38, 95],
    });
    var markerGris = L.icon({
        className: 'my-icon',
        iconUrl: 'markers/map-marker-gris.svg',
        iconSize: [38, 95],
    });
    var markerNoir = L.icon({
        className: 'my-icon',
        iconUrl: 'markers/map-marker-noir.svg',
        iconSize: [38, 95],
    });
    var markerOrange = L.icon({
        className: 'my-icon',
        iconUrl: 'markers/map-marker-orange.svg',
        iconSize: [38, 95],
    });
    var markerRouge = L.icon({
        className: 'my-icon',
        iconUrl: 'markers/map-marker-rouge.svg',
        iconSize: [38, 95],
    });
    var markerVert = L.icon({
        className: 'my-icon',
        iconUrl: 'markers/map-marker-vert.svg',
        iconSize: [38, 95],
    });
    var markerViolet = L.icon({
        className: 'my-icon',
        iconUrl: 'markers/map-marker-violet.svg',
        iconSize: [38, 95],
    });


    //Stockage des valeurs dans le sessionStorage
    sessionStorage.setItem("lat", lat);
    sessionStorage.setItem("lon", lon);

    //Obtenir le nombre d'enregistrements / la taille d'un objet
    Object.size = function(obj) {
        var size = 0,
            key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    //Vérification de la présence de l'objet userMarkers dans le locastorage 
    console.log("userMarkers?", localStorage.getItem("userMarkers") == !null);

     //Récupération des points gps entrés par l'utilisateur depuis le localstorages
    var getUserMarkers = JSON.parse(localStorage.getItem("userMarkers"));
    console.log("getUserMarkers if :", getUserMarkers);

    //Obtenir le nombre de paires clés/valeurs stockées dans l'objet getUserMarkers
    var objSize = Object.size(getUserMarkers);
    console.log("size : ", Object.size(getUserMarkers));

    //Stocker lat et lon dans le localstorage
    var userMarkersKey = Object.keys(getUserMarkers);
    console.log(userMarkersKey);
    var userMarkersValue = Object.values(getUserMarkers);
    console.log(userMarkersValue);

    //Création et affichage des points de relevés utilisateur
    createMarkers();

    //Itération sur les clés/valeurs de l'objet et contruction des coordonnnées gps
    //Limite le nombre d'itération au nombre de clés/valeurs déjà stockées via objSize

    function createMarkers() {

        for (var i = 0; i <= objSize - 1; i++) {
            //Récupération de la clé à chaque itération
            var key = userMarkersKey[i];
            //Récupération de la valeur à chaque itération
            var values = userMarkersValue[i];
            console.log("clé", key);
            console.log("valeurs", values);
            console.log("latitude", values.lat);
            console.log("longitude", values.lon);
            console.log("categorie", values.cat);
            //Récupération des valeurs correspondant aux clés, lat,lon et cat
            var latitude = values.lat;
            var longitude = values.lon;
            var categorie = values.cat;


            //Ajout du point sur la carte avec la couleur de la catégorie
            switch (categorie) {

                case 'Dégradations urbaines':
                    //Création d'un point de relevé et affichage sur la carte avec un popup et la couleur correspondante (ex : markerBleuF)
                    markers = L.marker([latitude, longitude], {
                        icon: markerBleuF
                    }).addTo(degUrb).bindPopup("<b>" + categorie + "</b>").openPopup();
                    break;

                case 'Propreté de la ville':
                    markers = L.marker([latitude, longitude], {
                        icon: markerBleu
                    }).addTo(propVille).bindPopup("<b>" + categorie + "</b>").openPopup();
                    break;

                case 'Voierie / Chaussée':
                    markers = L.marker([latitude, longitude], {
                        icon: markerRouge
                    }).addTo(voirie).bindPopup("<b>" + categorie + "</b>").openPopup();
                    break;

                case 'Eclairage public':
                    markers = L.marker([latitude, longitude], {
                        icon: markerOrange
                    }).addTo(eclairage).bindPopup("<b>" + categorie + "</b>").openPopup();
                    break;

                case 'Animaux perdus / errants':
                    markers = L.marker([latitude, longitude], {
                        icon: markerViolet
                    }).addTo(animaux).bindPopup("<b>" + categorie + "</b>").openPopup();
                    break;

                case 'Espaces verts':
                    markers = L.marker([latitude, longitude], {
                        icon: markerVert
                    }).addTo(espVert).bindPopup("<b>" + categorie + "</b>").openPopup();
                    break;

                case 'Encombrants':
                    markers = L.marker([latitude, longitude], {
                        icon: markerGris
                    }).addTo(encombrants).bindPopup("<b>" + categorie + "</b>").openPopup();
                    break;

                case 'Autre':
                    markers = L.marker([latitude, longitude], {
                        icon: markerNoir
                    }).addTo(autres).bindPopup("<b>" + categorie + "</b>").openPopup();
                    break;

                default:
                    markers = L.marker([latitude, longitude]).addTo(map).bindPopup("<b>" + categorie + "</b>").openPopup();
            }

        }
    }

});