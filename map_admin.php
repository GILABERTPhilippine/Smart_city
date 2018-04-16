<?php

//Connexion BDD
include('db/connect.php');

// if(!empty($_POST['getCat'])){

$categorie =$_POST['getCat'];
//Afficher les points d'intérêt entrés par les utilisateurs
$getAllByCat=$connect->query("SELECT lati, longi, comments, picture_loc FROM t_signalements INNER JOIN t_photos ON t_photos.id_photos=t_signalements.id_photos INNER JOIN t_commentaires ON t_commentaires.id_comments=t_signalements.id_comments WHERE id_cat='".$categorie."';") or exit("Erreur sur getAllByCat ({$connect->errno}): {$connect->error}");

//Requete sans affichage commentaires ni photo
//SELECT lati, longi FROM t_signalements

//Itération sur les lignes du tableau
while($row = $getAllByCat->fetch_array()) {

    $lat[] = $row['lati'];
    $lon[] = $row['longi'];    
    $com[] = $row['comments'];
    $loc[] = $row['picture_loc'];    

}

$result = array_map(function ($latitude, $longitude, $commentaire, $image) {
    return [
        'latitude' => $latitude,
        'longitude' => $longitude,
        'commentaire' => $commentaire,
        'image' => $image,

    ];
}, $lat, $lon, $com, $loc);

//Mettre tous les résultats dans un objet au format JSON
echo json_encode($result);

//Evolution : Permettre de filtrer sur le statut
?>