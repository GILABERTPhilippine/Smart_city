-- Afficher sur la carte les points d'intérêt non résolus:

SELECT lati, longi 
FROM t_signalements 
INNER JOIN t_statut ON t_signalements.id_statut = t_statut.id_statut 
WHERE type_statut NOT LIKE 'résolu';

-- Afficher les points d'intérêt non résolus par catégorie (insérer une variable PHP à la place de 'Dégradations urbaines')

SELECT lati, longi 
FROM t_signalements 
INNER JOIN t_statut ON t_signalements.id_statut = t_statut.id_statut
INNER JOIN t_categories ON t_signalements.id_cat = t_categories.id_cat
WHERE type_statut NOT LIKE 'résolu' AND type_cat='Dégradations urbaines';

-- Récupérer le dernier identifiant unique de la table photos

SELECT MAX(id_photos) FROM t_photos;

-- Récupérer le dernier identifiant unique de la table commentaires

SELECT MAX(id_comments) FROM t_commentaires;

-- Récupérer le dernier identifiant unique de la table utilisateurs

SELECT MAX(id_user) FROM t_utilisateurs;

-- Entrer un nouveau signalement

INSERT INTO t_signalements (date_s, lati, longi, id_user, id_cat, id_statut, id_comments, id_photos)
VALUES ($lati, $longi,$id_user, $id_cat, $id_statut, $id_comments, $id_photos);

-- Entrer une nouvelle photo

INSERT INTO t_photos (id_photos, picture_loc)
VALUES ($id_photo, "path/'".$photo_name."'");

-- Entrer un nouveau commentaire

INSERT INTO t_commentaires (id_comments, comments)
VALUES ($id_comments, $comments);

-- Entrer un nouvel utilisateur

INSERT INTO t_utilisateurs (id_user, nom, prenom,email)
VALUES ($id_user, $nom, $prenom, $email);