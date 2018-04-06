$('#input').on("change", handleFiles);

function handleFiles() {
    for (var i = 0; i < this.files.length; i++) {
        var file = this.files[i];
        var imageType = /^image\//;
        if (!imageType.test(file.type)) {
            continue;
        }
        var img = document.createElement("img");
        img.classList.add("miniature");
        img.file = file;
        document.getElementById("photo").appendChild(img);
        var reader = new FileReader();
        reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
        reader.readAsDataURL(file);
        var btPhoto = $("#cadreBouton").html();
        $('#cadreBouton').remove();
        $('#validerBouton').html(btPhoto);
        $('#SuppBouton').html("<button id='croix' type='button' onclick='supprimer()'><i class='far fa-times-circle'></i></button>");
    }
};
// function sendFiles() {
//     var imgs = document.querySelectorAll(".miniature");

//     for (var i = 0; i < imgs.length; i++) {
//         new FileUpload(imgs[i], imgs[i].file);
//     }
// }

// function FileUpload(img, file) {
//     var reader = new FileReader();
//     this.ctrl = createThrobber(img);
//     var xhr = new XMLHttpRequest();
//     this.xhr = xhr;

//     var self = this;
//     this.xhr.upload.addEventListener("progress", function(e) {
//         if (e.lengthComputable) {
//             var percentage = Math.round((e.loaded * 100) / e.total);
//             self.ctrl.update(percentage);
//         }
//     }, false);

//     xhr.upload.addEventListener("load", function(e) {
//         self.ctrl.update(100);
//         var canvas = self.ctrl.ctx.canvas;
//         canvas.parentNode.removeChild(canvas);
//     }, false);
//     xhr.open("POST", "http://demos.hacks.mozilla.org/paul/demos/resources/webservices/devnull.php");
//     xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');
//     reader.onload = function(evt) {
//         xhr.sendAsBinary(evt.target.result);
//     };
//     reader.readAsBinaryString(file);
// }