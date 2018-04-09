const constraints = {
    video: true
};


(function() {
    const button = document.querySelector('#screenshot-button');
    const img = document.querySelector('#screenshot-img');
    const video = document.querySelector('#screenshot-video');

    const canvas = document.createElement('canvas');

    button.onclick = video.onclick = function() {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, 300, 220);
        // Other browsers will fall back to image/png
        img.src = canvas.toDataURL('image/webp');
        // $('#cadrePhoto2').children().hide();
        // $('#cadrePhoto2').html("<img id='screenshot-img'>")
    };

    function handleSuccess(stream) {
        video.srcObject = stream;
    }

    function handleError(error) {
        console.error('navigator.getUserMedia error: ', error);
    }

    var hdConstraints = {
        video: {
            width: {
                min: 640
            },
            height: {
                min: 480
            }
        }
    };

    navigator.mediaDevices.getUserMedia(hdConstraints).
    then(handleSuccess).catch(handleError);
})();