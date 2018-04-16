$(document).ready(function () {
    console.log("ready");

    //Variables de la carte

    var map, lat, lon, markers;

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

    //Initialisation de la map
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

    //Obtenir le nombre d'enregistrements / la taille d'un objet
    Object.size = function (obj) {
        var size = 0,
            key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    //Affichage des catégories dans la carte
    $(".displayMarker").on("click", function () {
        console.log("clic");

        //A modifier : Condition pour effacer les marqueurs dejà présents sur la carte 

        if (markers){
            map.removeLayer(markers);
        }

        var categorieTxt = $(this).val();
        $("#title").text(categorieTxt);
        console.log(categorieTxt);
        var categorie = $(this).data('categorie');
        console.log(categorie);

        $.ajax({
            url: 'map_admin.php',
            method: 'POST',
            dataType: 'json',
            //getCat est récupéré dans le $_POST php et categorie correspond à la variable js
            data: {
                getCat: categorie
            },
            success: function (resultat, statut) {

                //Recupérer le tableau latitude et le tableau longitude
                console.log("resultat", resultat);
                console.log("statut", statut);

                //Récupération des points gps entrés par l'utilisateur depuis l'objet retourné par ajax

                // Calcul du nombre de points à afficher
                var resultatSize = Object.size(resultat);
                console.log("size : ", Object.size(resultat));

                // var resultatKey = Object.keys(resultat);
                // console.log("resultatKey",resultatKey);
                var resultatValue = Object.values(resultat);
                console.log("resultatValue",resultatValue);

                //Création et affichage des points de relevés utilisateur
                createMarkers(resultatValue,resultatSize);
                //Itération sur les clés/valeurs de l'objet et contruction des coordonnnées gps
                //Limite le nombre d'itération au nombre de clés/valeurs déjà stockées via objSize
                //addTo(map) pour n'afficher que les markers de la catégorie correspondante

                function createMarkers(userMarkersValue,objSize) {
                    // Supprimer les marqueurs déjà affichés sur la carte
                    console.log(markers);
                                     
                    for (var i = 0; i <= objSize - 1; i++) {
                        //récupération de la valeur à chaque itération
                        var values = userMarkersValue[i];
                        console.log("valeurs", values);
                        console.log("latitude", values.latitude);
                        console.log("longitude", values.longitude);
                        console.log("commentaire", values.commentaire);
                        console.log("image", values.image);




                        //Récupération des valeurs correspondant aux clés, lat,lon et cat
                        var latitude = values.latitude;
                        var longitude = values.longitude;
                        var commentaire = values.commentaire;
                        var image = values.image;

                        


                        // Ajout des points sur la carte avec la couleur de la catégorie
                        switch (categorie) {

                            //Dégradations urbaines

                            case 1:
                                //Création d'un point de relevé et affichage sur la carte avec la couleur correspondante (ex : markerBleuF)
                                markers = L.marker([latitude, longitude], {
                                    icon: markerBleuF
                                }).addTo(map).bindPopup(  "<a target='_blank' href='"+image+"'/>Afficher la photo<a><br>" + commentaire);
                                break;

                                //Propreté de la ville

                            case 2:
                                markers = L.marker([latitude, longitude], {
                                    icon: markerBleu
                                }).addTo(map).bindPopup(  "<a target='_blank' href='"+image+"'/>Afficher la photo<a><br>" + commentaire);
                                break;
                                
                                //Voirie / chaussée

                            case 3:
                                markers = L.marker([latitude, longitude], {
                                    icon: markerRouge
                                }).addTo(map).bindPopup(  "<a target='_blank' href='"+image+"'/>Afficher la photo<a><br>" + commentaire);
                                break;
                                
                                //Eclairage public

                            case 4:
                                markers = L.marker([latitude, longitude], {
                                    icon: markerOrange
                                }).addTo(map).bindPopup( "<a target='_blank' href='"+image+"'/>Afficher la photo<a><br>" + commentaire);
                                break;

                                //Encombrants

                            case 5:
                                markers = L.marker([latitude, longitude], {
                                    icon: markerViolet
                                }).addTo(map).bindPopup( "<a target='_blank' href='"+image+"'/>Afficher la photo<a><br>" + commentaire);
                                break;

                                //Autres

                            case 6:
                                markers = L.marker([latitude, longitude], {
                                    icon: markerVert
                                }).addTo(map).bindPopup(  "<a target='_blank' href='"+image+"'/>Afficher la photo<a><br>" + commentaire);
                                break;

                                //Catégorie non présente en base

                            case 7:
                                markers = L.marker([latitude, longitude], {
                                    icon: markerGris
                                }).addTo(map).bindPopup(  "<a target='_blank' href='"+image+"'/>Afficher la photo<a><br>" + commentaire);
                                break;

                                //Catégorie non présente en base


                            case 8:
                                markers = L.marker([latitude, longitude], {
                                    icon: markerNoir
                                }).addTo(map).bindPopup(  "<a target='_blank' href='"+image+"'/>Afficher la photo<a><br>" + commentaire);
                                break;

                            default:
                                markers = L.marker([latitude, longitude]).addTo(map);
                        }

                    }
                }
            },
            error: function (resultat, statut, erreur) {
                console.log("error", resultat, statut, erreur);
            }
        })
    });
});