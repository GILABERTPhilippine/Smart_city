<?php

//Connexion BDD
include('db/connect.php');

$categorie =$_POST['getCat'];
//Afficher les points d'intérêt entrés par les utilisateurs
$getAllByCat=$connect->query("SELECT lati, longi, comments, picture_loc FROM t_signalements INNER JOIN t_photos ON t_photos.id_photos=t_signalements.id_photos INNER JOIN t_commentaires ON t_commentaires.id_comments=t_signalements.id_comments WHERE id_cat='".$categorie."';") or exit("Erreur sur getAllByCat ({$connect->errno}): {$connect->error}");

//Evolution : Afficher les points toutes catégories confondues (créer une nouvelle requête)

//Itération sur les lignes du tableau
while($row = $getAllByCat->fetch_array()) {
//Création des tableaux associatifs recevant les valeurs de chaque itération
    $lat[] = $row['lati'];
    $lon[] = $row['longi'];    
    $com[] = $row['comments'];
    $loc[] = $row['picture_loc'];    

}

//Création d'une fonction associant chaque tableau à une clé 
$result = array_map(function ($latitude, $longitude, $commentaire, $image) {
    return [
        //Création d'un tableau à 4 clés
        'latitude' => $latitude,
        'longitude' => $longitude,
        'commentaire' => $commentaire,
        'image' => $image,

    ];
}, $lat, $lon, $com, $loc);//Association de chaque clé à une valeur issue du résultat de la requête

//Mettre tous les résultats dans un objet au format JSON
echo json_encode($result);

//Evolution : Permettre de filtrer sur le statut
?>