var btCamera = $('#cadrePhoto').html();

function handleFiles(files) {
    for (var i = 0; i < files.length; i++) {
        console.log("files.length")
        var file = files[i];
        var imageType = /^image\//;

        if (!imageType.test(file.type)) {
            continue;
        }
        console.log(btCamera);
        var img = document.createElement("img");
        img.classList.add("miniature");
        img.file = file;
        document.getElementById("preview").appendChild(img); // En admettant que "preview" est l'élément div qui contiendra le contenu affiché. 

        var reader = new FileReader();
        reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
        reader.readAsDataURL(file);

        $('#cadrePhoto').remove();
        $('#supprimer').html("<label class='suppButton mx-auto'><i class='fas fa-times-circle fa-3x mx-auto'></i><input type='button' onchange='removePhoto()'>");
        $("#supprimer").show()

    }
}

$('#supprimer').on("click", removePhoto);

function removePhoto() {
    $(".miniature").remove();
    $("#supprimer").hide();
    $("#cadrePhoto2").html(btCamera);
}