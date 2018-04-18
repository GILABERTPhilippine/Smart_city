# Smart_city

#Adresse temporaire de test du projet

https://k0d3.alwaysdata.net/smart_city/

#Arborescence du projet :

/db : contient le script de connexion à la base de données
Modifier les informations de connexion correspondantes lors du déploiement serveur

/doc : Cahier des charges, Maquette, diagramme d'activité, dictionnaire de requêtes SQL , script de création de la base de données

/images : images de l'interface utilisateur/admin

/js : scripts JavaScript du projet

 - appform : script du formulaire d'import des données
 - cat : script de récupération des catégories de notifications
 - leaflet : script propre à l'API leaflet
 - map_admin : script de l'interface administrateur
 - map: script d'affichage de la carte de l'interface utilisateur
 
/markers : fichiers svg propres à chaque catégorie de marqueurs sur la carte

/request : script php d'import des données en base et affichage du message de prise en compte de la contribution utilisateur
Important : Modifier le chemin absolu de la variable $dossier (ligne 34) et les doits en écriture sur le dossier 'uploads' lors du déploiement serveur

/test : historique des fichiers de tests lors des développements

/uploads : dossier de stockage des images utilisateurs

categories.html : page de sélection des catégories des contributions
filtre.html : page d'affichage de la carte utilisateur + géolocalisation
formulaire.html : formulaire d'import des données + photo
index.html : page d'accueil du site
map_admin.html : page de l'interface utilisateur
Important : Entrer directement le nom de la page pour accéder à l'interface administrateur
map_admin.php : script php de récupération des points d'intérêt de tous les utilisateurs par catégorie
