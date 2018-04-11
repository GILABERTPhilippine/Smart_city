   function handleFiles(files) {
       for (var i = 0; i < files.length; i++) {
           var file = files[i];
           var imageType = /^image\//;

           if (file.size > 1000000) {
               removePhoto();
               $("#erreurTaille").addClass("alert alert-danger mx-auto mt-3").text("Fichier trop volumineux. Veuillez réduire la résolution de votre photo.");
               continue;
           }
           if (!imageType.test(file.type)) {
               $("#erreurTaille").addClass("alert alert-danger mx-auto mt-3").text("Ce fichier n'est pas une image");
               continue;
           }
           var img = document.createElement("img");
           img.classList.add("miniature");
           img.file = file;
           document.getElementById("preview").appendChild(img); // En admettant que "preview" est l'élément div qui contiendra le contenu affiché. 

           var reader = new FileReader();
           reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
           reader.readAsDataURL(file);
           $("#erreurTaille").empty();
           $("#erreurTaille").removeClass("alert alert-danger mx-auto mt-3");
           $('#cadrePhoto').children().hide();
           $('#supprimer').html("<label class='suppButton'><i class='fas fa-times-circle fa-3x'></i><input type='button' onchange='removePhoto()'>");
           $("#supprimer").show();


       }
   }

   $('#supprimer').on("click", removePhoto);

   function removePhoto() {
       // Une même image ne s'affichera pas si elle est rechargée une seconde fois.
       $("#preview").children().remove();
       $("#supprimer").children().hide();
       $('#cadrePhoto').children().show();
   }

   //Récupération de la catégorie depuis le sessionstorage

   var cat = sessionStorage.getItem("categorie");
   console.log(cat);
   $("#title").text(cat);

   function envoiFormulaire() {

       $('#myModal').on('hidden.bs.modal', function(e) {
           // do something...
       })
   }