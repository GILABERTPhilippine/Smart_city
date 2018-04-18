#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------

CREATE DATABASE IF NOT EXISTS `smart_city` DEFAULT CHARACTER SET utf8;
USE `smart_city`;

#------------------------------------------------------------
# Table: t_utilisateurs
#------------------------------------------------------------

CREATE TABLE t_utilisateurs(
        id_user  int (11) Auto_increment  NOT NULL ,
        nom      Varchar (50)  ,
        prenom   Varchar (50)  ,
        email    Varchar (50)  ,
        mdp      Varchar (100)  ,
        id_roles Int NOT NULL ,
        PRIMARY KEY (id_user )
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: t_roles
#------------------------------------------------------------

CREATE TABLE t_roles(
        id_roles   int (11) Auto_increment  NOT NULL ,
        type_roles Varchar (25) NOT NULL ,
        PRIMARY KEY (id_roles )
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: t_signalements
#------------------------------------------------------------

CREATE TABLE t_signalements(
        id_signalements int (11) Auto_increment  NOT NULL ,
        date_s          Datetime NOT NULL ,
        lati            Double Precision (9,7) NOT NULL ,
        longi           Double Precision (10,7) NOT NULL ,
        id_user         Int ,
        id_cat          Int NOT NULL ,
        id_statut       Int NOT NULL ,
        id_comments     Int ,
        id_photos       Int ,
        PRIMARY KEY (id_signalements )
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: t_categories
#------------------------------------------------------------

CREATE TABLE t_categories(
        id_cat   int (11) Auto_increment  NOT NULL ,
        type_cat Varchar (25) NOT NULL ,
        PRIMARY KEY (id_cat )
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: t_photos
#------------------------------------------------------------

CREATE TABLE t_photos(
        id_photos       int (11) Auto_increment  NOT NULL ,
        picture_loc     Varchar (250) NOT NULL ,
        id_signalements Int NOT NULL ,
        PRIMARY KEY (id_photos )
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: t_commentaires
#------------------------------------------------------------

CREATE TABLE t_commentaires(
        id_comments     int (11) Auto_increment  NOT NULL ,
        comments        Varchar (500) NOT NULL ,
        id_signalements Int NOT NULL ,
        PRIMARY KEY (id_comments )
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: t_statut
#------------------------------------------------------------

CREATE TABLE t_statut(
        id_statut int (11) Auto_increment  NOT NULL ,
        type_statut Varchar (25) NOT NULL,
        PRIMARY KEY (id_statut )
)ENGINE=InnoDB;

ALTER TABLE t_utilisateurs ADD CONSTRAINT FK_t_utilisateurs_id_roles FOREIGN KEY (id_roles) REFERENCES t_roles(id_roles);
ALTER TABLE t_signalements ADD CONSTRAINT FK_t_signalements_id_user FOREIGN KEY (id_user) REFERENCES t_utilisateurs(id_user);
ALTER TABLE t_signalements ADD CONSTRAINT FK_t_signalements_id_cat FOREIGN KEY (id_cat) REFERENCES t_categories(id_cat);
ALTER TABLE t_signalements ADD CONSTRAINT FK_t_signalements_id_statut FOREIGN KEY (id_statut) REFERENCES t_statut(id_statut);
ALTER TABLE t_signalements ADD CONSTRAINT FK_t_signalements_id_comments FOREIGN KEY (id_comments) REFERENCES t_commentaires(id_comments);
ALTER TABLE t_signalements ADD CONSTRAINT FK_t_signalements_id_photos FOREIGN KEY (id_photos) REFERENCES t_photos(id_photos);
ALTER TABLE t_photos ADD CONSTRAINT FK_t_photos_id_signalements FOREIGN KEY (id_signalements) REFERENCES t_signalements(id_signalements);
ALTER TABLE t_commentaires ADD CONSTRAINT FK_t_commentaires_id_signalements FOREIGN KEY (id_signalements) REFERENCES t_signalements(id_signalements);

INSERT INTO t_statut (type_statut) VALUES ('Transmis'),('Pris en compte'),('En cours de résolution'),('Résolu');
INSERT INTO t_roles (type_roles) VALUES ('Administrateur'),('Contributeur'),('Anonyme');
INSERT INTO t_categories(type_cat) VALUES ('Dégradations urbaines'),('Propreté de la ville'),('Voirie / chaussée'),('Eclairage public'),('Encombrants'),('Autres');
