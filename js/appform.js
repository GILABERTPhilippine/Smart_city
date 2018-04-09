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