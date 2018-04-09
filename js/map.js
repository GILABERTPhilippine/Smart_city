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
    var marker = L.marker([43.11, 1.61]).addTo(map);
    marker.bindPopup("<b>Etat résolu</b>").openPopup();

    //Stocker lat et lon dans le localstorage

    var lat = 43.116312;
    var lon = 1.61;

    console.log(lat);
    console.log(lon);

    sessionStorage.setItem("lat",lat);
    sessionStorage.setItem("lon",lon);
    
});