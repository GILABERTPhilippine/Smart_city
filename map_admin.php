<?php

//Connexion BDD
include('db/connect.php');

// if(!empty($_POST['getCat'])){

$categorie =$_GET['getCat'];
//Afficher les points d'intérêt entrés par les utilisateurs
$getAllByCat=$connect->query("SELECT lati, longi FROM t_signalements WHERE id_cat='".$categorie."';") or exit("Erreur sur getAllByCat ({$connect->errno}): {$connect->error}");

//Création des variables lat, lon de type tableau
$lat = array();
$lon = array();

//Itération sur les lignes du tableau
while($row = $getAllByCat->fetch_array()) {

    $lat[] = $row['lati'];
    $lon[] = $row['longi'];    
}

$result = array_map(function ($latitude, $longitude) {
    return [
        'latitude' => $latitude,
        'longitude' => $longitude,
    ];
}, $lat, $lon);

//Mettre tous les résultats dans un objet au format JSON
echo json_encode($result);

//Evolution : Permettre de filtrer sur le statut