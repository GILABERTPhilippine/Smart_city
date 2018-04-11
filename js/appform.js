

    
    function handleFiles(files) {
        for (var i = 0; i < files.length; i++) {
            console.log(files.length)
            var file = files[i];
            var imageType = /^image\//;
    
            if (!imageType.test(file.type)) {
                continue;
            }
            var img = document.createElement("img");
            img.classList.add("miniature");
            img.file = file;
            document.getElementById("preview").appendChild(img); // En admettant que "preview" est l'élément div qui contiendra le contenu affiché. 
    
            var reader = new FileReader();
            reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
            reader.readAsDataURL(file);
    
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
    
    $(document).ready(function(){
    //Récupération de la catégorie depuis le sessionstorage
    
    var cat = sessionStorage.getItem("categorie");
    console.log(cat);
    $("#title").text(cat);
    
    var lat = sessionStorage.getItem("lat");
    console.log(lat);
    
    var lon = sessionStorage.getItem("lon");
    console.log(lon);

            //Obtenir le nombre d'enregistrements
            Object.size = function(obj) {
                var size = 0, key;
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) size++;
                }
                return size;
            };
    
    //Obtenir les nouvelles valeurs dans le tableau (objet)
    // var getUserMarkers = JSON.parse(localStorage.getItem("userMarkers"));  
    
    // var userMarkers = {
    //     'obj1':{'lat' : "43.1", 'lon' : "1.6, 'cat' : 1},
    //     'obj2':{'lat' : 43.2, 'lon' : 1.6, 'cat' : 1},
    //     'obj3':{'lat' : 43.3, 'lon' : 1.6, 'cat' : 1},
    //     'obj4':{'lat' : 43.4, 'lon' : 1.6, 'cat' : 1},
    //     'obj5':{'lat' : 43.5, 'lon' : 1.6, 'cat' : 1},
    //     };


    console.log(localStorage.getItem("userMarkers")==null);
    if (localStorage.getItem("userMarkers")==null){
        // Initialiser l'objet dans le localstorage
        var userMarkers = {"obj1":{"lat":lat,"lon":lon,"cat":cat}};
        localStorage.setItem("userMarkers",JSON.stringify(userMarkers));
        getUserMarkers = JSON.parse(localStorage.getItem("userMarkers"));
        console.log("getUserMarkers if : ",getUserMarkers);
    }
    else{

    getUserMarkers = JSON.parse(localStorage.getItem("userMarkers"));
    console.log("getUserMarkers else : ",getUserMarkers );

    
    //Nombre d'enregistrements dans l'objet
    var objSize = Object.size(getUserMarkers);
    
    console.log("size : ",Object.size(getUserMarkers));
    
    // ajouter la nouvelle ligne au tableau
    var objetNumber = objSize+1;
    var objet = 'obj'+objetNumber;
    console.log("objet:",objet);
    newEntry = {"lat" :lat,"lon":lon,"cat" :cat};
    console.log(newEntry);
    getUserMarkers[objet]= newEntry;
    
    //Stocker a nouveau le tableau dans var userMarkers
    setUserMarkers = localStorage.setItem("userMarkers", JSON.stringify(getUserMarkers));
    }
    
    console.log("getUserMarkers",getUserMarkers);
    
    
    });