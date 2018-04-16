<?php

//Connexion BDD
include('../db/connect.php');

//Récupération de la date et heure du signalement: 
$date_s = date("Y-m-d H:i:s");
// $date_s = '2018-04-06 14:58:34';

//Rôle par défaut fixé à "anonyme" (à modifier si évolution vers compte utilisateur)
$id_roles="3";

//Statut par défaut fixé à "transmis"
$id_statut="1";

// Récupération des inputs utilisateurs
$nom = $_POST['nom'];
$prenom = $_POST['prenom'];
$email = $_POST['email'];
$comments = $_POST['comments'];

//########Debug upload de fichiers########

// echo " var_dump = ".var_dump($_FILES);//renvoi le contenu d'un tableau associatif
// echo " print_r = ".print_r($_FILES);//Renvoie true or false

//########Debug upload de fichiers########


if(!empty($_FILES['photo']))
{ 
    //Création du chemin absolu du dossier d'upload
    //RQ: aouter un "/" au debut du chemin pour indiquer la racine et un "/" à la fin pour indiquer que le dossier d'upload est bien un dossier (sinon le nom de dossier et interprété comme un prefixe de type texte à ajouter au nom du fichier récupéré). IMPORTANT : Ajouter les droits en écriture dans le dossier 'uploads' sinon aucune image ne sera téléchargée...
     $dossier = '/var/www/html/Smart_city/uploads/';
     //Création du nom de fichier à copier
     $fichier = basename($_FILES['photo']['name']);
     //Déplacement du fichier temporaire dans le dossier upload avec le nom de fichier correspondant
     //Si la fonction renvoie TRUE, c'est que l'upload s'est déroulé correctement
     if($upload = move_uploaded_file($_FILES['photo']['tmp_name'], $dossier.$fichier)){
        //   echo 'Upload effectué avec succès !';
    //Sinon (la fonction renvoie FALSE).
     }else{ 
        //   echo "Echec de l\'upload ! <br> "
     }
}
       
//Stockage le chemin de stockage de la photo
$photo = "uploads/".$fichier;

//Récupérer les données lat, lon et catégorie

$lati = $_POST['postLat'];//loc utilisateur
$longi = $_POST['postLon'];//loc utilisateur
$id_cat = $_POST['postCat'];//catégorie cliquée par l'utiliateur

// Création des variables de la requête d'insertion d'un "nouvel utilisateur" si les champs sont remplis
if(!empty($nom)){
    //colonne
    $colNom = ",nom";
    //valeur
    $valNom = ",'".$nom."'";
}

if(!empty($prenom)){
    //colonne
    $colPrenom = ",prenom";
    //valeur
    $valPrenom = ",'".$prenom."'";
}

if(!empty($email)){
    //colonne
    $colEmail = ",email";
    //valeur
    $valEmail = ",'".$email."'";          
}

// Création des variables de la requete d'insertion d'un "nouveau commentaire" si les champs sont remplis
if(!empty($comments)){
    //valeur
    $valComments = "'".$comments."'";          
}

// Création des variables de la requete d'insertion d'une "nouvelle photo" si les champs sont remplis
//RQ : $valPhoto correspond à la valeur de la colonne picture_loc en base

if(!empty($photo)){
    $valPhoto = ",'".$photo."'";
}

//Récupération du dernier id signalement

$getIdSignal=$connect->query("SELECT MAX(id_signalements) AS id_signalements FROM t_signalements;") or exit("Erreur sur getIdSignal ({$connect->errno}): {$connect->error}");
$fetchIdSignal= $getIdSignal->fetch_array();

//Création de l'id_signalements suivant (id_signalements +1)
$id_signalements=$fetchIdSignal[0]+1;

//value
$valIdSignal = "'".$id_signalements."'";

// Récupération du dernier id_user
if(!empty($email)||!empty($prenom)||!empty($nom)){

    $getIdUser=$connect->query("SELECT MAX(id_user) AS 'id_user' FROM t_utilisateurs;") or exit("Erreur sur getIdUser ({$connect->errno}): {$connect->error}");
    $fetchIdUser= $getIdUser->fetch_array();

    //Création de l'id_user suivant (id_user +1)    
    $id_user=$fetchIdUser[0]+1;
    $colIdUser = ",id_user";
    $valIdUser = "'".$id_user."'";
}

// Récupération du dernier id_comments
if(!empty($comments)){

    $getIdComments=$connect->query("SELECT MAX(id_comments) AS 'id_comments' FROM t_commentaires;") or exit("Erreur sur getIdComments ({$connect->errno}): {$connect->error}");
    $fetchIdComments= $getIdComments->fetch_array();

    //Création de l'id_comments suivant (id_comments +1)    
    $id_comments=$fetchIdComments[0]+1;
    $colIdComments = ",id_comments";
    $valIdComments = "'".$id_comments."'";
}

// Récupération du dernier id_photos
if(!empty($photo)){

    $getIdPhotos=$connect->query("SELECT MAX(id_photos) AS 'id_photos' FROM t_photos;") or exit("Erreur sur getIdPhotos ({$connect->errno}): {$connect->error}");
    $fetchIdPhotos= $getIdPhotos->fetch_array();

    //Création de l'id_photo suivant (id_photo +1)    
    $id_photos=$fetchIdPhotos[0]+1;
    $colIdPhotos = ",id_photos";
    $valIdPhotos = "'".$id_photos."'";
}


//Requete d'insertion d'un nouveau signalement
$insertSignal=$connect->query("INSERT INTO t_signalements (id_signalements, date_s, lati, longi, id_cat, id_statut) VALUES (".$valIdSignal.",'".$date_s."','".$lati."','".$longi."','".$id_cat."','". $id_statut."');") or exit("Erreur sur insertSignal ({$connect->errno}): {$connect->error}");


//Vérifier que la requête a bien été envoyée
if ($insertSignal){
    $send=true;
} else {
    $send=false;
}

//Requete d'insertion d'un nouvel utilisateur
if(!empty($id_user) && !empty($send==true)){

    $insertUser=$connect->query("INSERT INTO t_utilisateurs (id_roles, id_user".$colNom.$colPrenom.$colEmail.") VALUES ('".$id_roles."',".$valIdUser.$valNom.$valPrenom.$valEmail.");") or exit("Erreur sur insertUser ({$connect->errno}): {$connect->error}");
    
    //Mise à jour de l'id_user dans la table t_signalements
    $updateSignalUser=$connect->query("UPDATE t_signalements SET id_user = ".$valIdUser." WHERE id_signalements =".$valIdSignal.";") or exit("Erreur sur updateSignalUser ({$connect->errno}): {$connect->error}");

}

//Requete d'insertion d'un nouveau commentaire
if(!empty($comments) && !empty($send==true)){

    $insertComment=$connect->query("INSERT INTO t_commentaires (id_signalements,id_comments,comments) VALUES (".$valIdSignal.",".$valIdComments.",".$valComments.");") or exit("Erreur sur insertComment ({$connect->errno}): {$connect->error}");

    //Mise à jour de l'id_comments dans la table t_signalements
    $updateSignalComment=$connect->query("UPDATE t_signalements SET id_comments = ".$valIdComments." WHERE id_signalements =".$valIdSignal.";") or exit("Erreur sur updateSignalComment ({$connect->errno}): {$connect->error}");
}

//Requête d'insertion d'une nouvelle photo

//Si une photo est sélectionnée
if(!empty($photo) && !empty($send==true)){

    $insertPhoto=$connect->query("INSERT INTO t_photos (id_signalements,id_photos, picture_loc ) VALUES (".$valIdSignal.",".$valIdPhotos.$valPhoto.");") or exit("Erreur sur insertPhoto ({$connect->errno}): {$connect->error}");

    //Besoin que id_signalements existe dans t_signalements avant l'insertion

    $updateSignalPhoto=$connect->query("UPDATE t_signalements SET id_photos = ".$valIdPhotos." WHERE id_signalements =".$valIdSignal.";") or exit("Erreur sur updateSignalPhoto ({$connect->errno}): {$connect->error}");
    }

// Redirection vers la carte
// echo "<p>Juju</p>";
// header('Location: ../filtre.html');


//########Partie à Modifier########

//Fonction query à créer

// function sql($query){
//     $insert=$connect->query($query) or exit("Error code ({$connect->errno}): {$connect->error}");
// }


//########Partie à Modifier########

//########Debug affichage des variables pour contrôle résultats########
// echo "<br>id_user :".$id_user."<br> id_roles : ".$id_roles."<br> nom : ".$nom."<br> prenom : ".$prenom."<br> mail :".$email."<br> id_comments :".$id_comments."<br> commentaire :".$comments."<br> id_signalements : ".$id_signalements."<br> valIdSignal : ".$valIdSignal."<br> id_photos : ".$id_photos."<br> send status : ".$send."<br> date :".$date_s;
// echo exec('whoami');
?>

<!DOCTYPE html>
<html>
<head>
    <title>Title</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  </head>
<body>


<div class="row">
  <div class="col-12">
    <div class="card">
      <div class="card-body">
        <h2 class="card-title">Merci pour votre contribution</h2>
        <h4 class="card-text">Les données ont bien été transmises.</h4>
        <a href="../filtre.html"><button type="submit" class="btn btn-success">OK</button></a>
      </div>
    </div>
  </div>



<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</body>
</html>


