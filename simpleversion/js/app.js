//_________________________________________BEGIN setup

var audioContext = new AudioContext();
var recorder = undefined;
var recordedAudio = undefined;
var playbackTime = undefined;
var recordTime = undefined;
var recordingPlaybackTime = undefined;
var newBuffer = undefined;

function startUserMedia(stream) {
    var input = audioContext.createMediaStreamSource(stream);
    recorder = new Recorder(input);
}

navigator.getUserMedia({ audio: true }, startUserMedia, function(e) {});

//________________________________________END setup


//___________________________________________________________BEGIN primary song loading
var primarySong = audioFileLoader("media/primary_song.mp3");
//___________________________________________________________END primary songloading



function createDownloadLink() {
    // recorder && recorder.exportWAV(function(blob) {

    //     console.log(blob.size);
    //     var url = URL.createObjectURL(blob);
    //     console.log(blob);
    //     var li = document.createElement('li');
    //     var au = document.createElement('audio');
    //     var hf = document.createElement('a');

    //     au.controls = true;
    //     au.src = url;
    //     hf.href = url;
    //     hf.download = new Date().toISOString() + '.wav';
    //     hf.innerHTML = hf.download;
    //     li.appendChild(au);
    //     li.appendChild(hf);
    //     recordingslist.appendChild(li);
    // });

    recorder.getBuffer(function getBufferCallback(buffers) {
        console.log(buffers);
        recordedAudio = audioContext.createBufferSource();
        newBuffer = audioContext.createBuffer(2, buffers[0].length, audioContext.sampleRate);
        newBuffer.getChannelData(0).set(buffers[0]);
        newBuffer.getChannelData(1).set(buffers[1]);
        recordedAudio.buffer = newBuffer;
        recordedAudio.connect(audioContext.destination);
    })
}



//__________________________________________BEGIN user interface


$(function() {


    $("#playStop").on("click", function() {
        var text = $(this).text();


        if (text !== "stop <<") {
            text = "stop <<";
            $(this).text(text)

            console.log("Playback time is " + playbackTime);
            primarySong.play()
            console.log(audioContext.currentTime);

            if (recordedAudio) {
                recordedAudio = audioContext.createBufferSource();
                recordedAudio.buffer = newBuffer;
                recordedAudio.connect(audioContext.destination);
                recordedAudio.start(recordingPlaybackTime + audioContext.currentTime);
            }
            playbackTime = audioContext.currentTime

        } else {

            text = "play song";
            $(this).text(text)
            primarySong.stop()

        }
    });



    $(".record-button").on("click", function() {

        console.log($(this).text());
        if ($(this).text() !== "stop recording") {
            $(this).text("stop recording")
            console.log("TRUE");
            recorder && recorder.record();
            recordTime = audioContext.currentTime;
            recordingPlaybackTime = recordTime - playbackTime;
            console.log("record time is: " + recordTime);
            console.log("recording playback time is: " + recordingPlaybackTime);

        }else{
              $(this).text("start recording")
            recorder && recorder.stop();

            createDownloadLink();
            recorder.clear();

        }

      


    });




});



//__________________________________________END user interface