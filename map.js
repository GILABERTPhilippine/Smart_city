// Voilà une esquisse de la page affichant la map et permettant de géolocaliser une personne
// reste à trouver le moyen d'afficher: récupérer les coordonnées GPS avec la méthode leaflet 
// voir http://leafletjs.com/reference-1.3.0.html
// la méthode "latlng" le permet mais je n'y arrive pas encore. Voir le code à la fin du fichier

// Pour la capture de la caméra, pas de code sur cette page voir la 
// source : https://www.html5rocks.com/en/tutorials/getusermedia/intro/ pour plus d'info


// Parametrage de l'api https://www.mapbox.com/studio/styles/julienchenel/cjfdz2p2fa5g92sq0dzgxf95o/

var map = L.map('map').fitWorld();

L.tileLayer('https://api.mapbox.com/styles/v1/julienchenel/cjfdz2p2fa5g92sq0dzgxf95o/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoianVsaWVuY2hlbmVsIiwiYSI6ImNqZmR6MGhvYjJiOGo0YXFoejFobXJqaGIifQ.SZ2HjrSNVhc7hCyXZlDv9A', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18
}).addTo(map);

// Localisation de l'utilisateur et paramètrage du zoom de la carte

map.locate({setView: true, maxZoom: 40});


// Positionnement du marqueur et du cercle de l'utilisateur sur la carte

function onLocationFound(e) {
    var radius = e.accuracy / 2;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);

// Message d'erreur en cas d'échec

function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);

//Affichage des coordonnées (NON FONCTIONNEL):


console.log("<center> Coordinates : </center>" +"<br>" +latlng.lat + "; " + latlng.lng + "</br>"+"<a id="+e.latlng.lat+"_"+e.latlng.lng+"></a>"+ "<br><center><input type='button' value='Delete this marker' class='marker-delete-button' onclick='SupOne()'/></center></br>");
 
 
 
function SupOne() {
    tempMarker=this
    tab.removeLayer(tempMarker);
}