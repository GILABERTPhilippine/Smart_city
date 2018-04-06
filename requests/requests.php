<?php

//Connexion BDD

include('../db/connect.php');

//Utiliser la fonction datetinme de php pour récupérer le timestamp en format "AAAA-MM-JJ HH:mm:ss" nom de la variable php : $date_s =

// Récupération des inputs utilisateurs

$id_roles="3"; //utilisateur anonyme
$nom = $_POST['nom'];
$prenom = $_POST['prenom'];
$email = $_POST['email'];
$comments = $_POST['comments'];
$photo = $_POST['photo'];

//Récupérer les données suivantes:

$lati = $_POST[''];//loc utilisateur
$longi = $_POST[''];//loc utilisateur
$id_cat = $_POST[''];//catégorie cliquée par l'utiliateur

// Création des variables de la requête d'insertion "nouvel utilisateur" si les champs sont remplis

if(!empty($nom)){
    $colNom = ",nom";
    $valNom = ",'".$nom."'";
}

if(!empty($prenom)){
    $colPrenom = ",prenom";
    $valPrenom = ",'".$prenom."'";
}

if(!empty($email)){
    $colEmail = ",email";
    $valEmail = ",'".$email."'";          
}

// Création des variables de la requete d'insertion d'un nouveau commentaire si les champs sont remplis

if(!empty($comments)){
    $colComments = ",comments";
    $valComments = ",'".$comments."'";          
}

// Création des variables de la requete d'insertion d'une nouvelle photo si les champs sont remplis
//To do

//Création de la requete d'insertion d'un nouveau signalement
//To do : récupérer le dernier id signalement
//Si photo, récup le dernier id_photo
//Si commentaire : Récupérer le dernier id_comments
//Si utilisateur : Récupérer le dernier id_user
//Insérer les données dans la able t_signalements

// Envoi de la requête "nouvel utilisateur" en base


if(!empty($email)||!empty($prenom)||!empty($nom)){

    $getIdUser=$connect->query("SELECT MAX(id_user) AS 'id_user' FROM t_utilisateurs;") or exit("Error code ({$connect->errno}): {$connect->error}");
    $fetchIdUser= $getIdUser->fetch_array();
    
    $id_user=$fetchIdUser[0]+1;
    $colUser = "id_user,";
    $valUser = "'".$id_user."',";

    $insertUser=$connect->query("INSERT INTO t_utilisateurs (".$colUser ."id_roles".$colNom.$colPrenom.$colEmail.") VALUES (".$valUser."'".$id_roles."'".$valNom.$valPrenom.$valEmail.");") or exit("Error code ({$connect->errno}): {$connect->error}");
}


// Requête nouveau commentaire

//Faire d'abord la requete d'insertion d'un nouveau signalement (besoin d'un id signalement pour insérer un commentaire)


if(!empty($comments)){

    $getIdComments=$connect->query("SELECT MAX(id_comments) AS 'id_comments' FROM t_commentaires;") or exit("Error code ({$connect->errno}): {$connect->error}");
    $fetchIdComments= $getIdComments->fetch_array();
    
    $id_comments=$fetchIdComments[0]+1;
    $colIdComments = "id_comments";
    $valIdComments = "'".$id_comments."'";

$insertComment=$connect->query("INSERT INTO t_commentaires (".$colIdComments.$colComments.") VALUES (".$valIdComments.$valComments.");") or exit("Error code ({$connect->errno}): {$connect->error}");
}

//Requête photo

//Si une photo est sélectionnée
// insérer l'id_photo, l'id signalement et picture_loc (comment générer ce chemin? nom dossier/nom_image.extension)
//Comment enregistrer un fichier sur un serveur

//Debug : Vérification récupération du POST
echo " id_user :".$id_user.",id_roles : ".$id_roles.", nom : ".$nom.", prenom : ".$prenom.", mail :".$email.", commentaire :".$comments;


//Fonction query

// function sql($query){
//     $insert=$connect->query($query) or exit("Error code ({$connect->errno}): {$connect->error}");
// }

?>