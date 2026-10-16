console.log("Welcome to Spotify");

// Initialize Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');

let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');

let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Shopping", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" , timestamp:"03:45"},
    { songName: "Tum Hi Aana", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" , timestamp:"03:45"},
    { songName: "Bad Boy", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" , timestamp:"03:45"},
    { songName: "Chod Denge", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" , timestamp:"03:45"},
    { songName: "I am a Rider", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" , timestamp:"03:45"},
    { songName: "Lahanga", filePath: "songs/2.mp3", coverPath: "covers/6.jpg" , timestamp:"03:45"},
    { songName: "Pachtaoge", filePath: "songs/2.mp3", coverPath: "covers/7.jpg" , timestamp:"03:45"},
    { songName: "Shoot Da Order", filePath: "songs/2.mp3", coverPath: "covers/8.jpg", timestamp:"03:45" }
];

// Display song names and covers
songItems.forEach((element, i) => {
    if (songs[i]) {
        // element.getElementsByTagName("img")[0].src = songs[i].coverPath;
        element.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.65)), url("${songs[i].coverPath}")`;
        element.style.backgroundSize = 'cover';
        element.style.backgroundPostion = 'center';
        element.style.backgroundRepeat = 'no-repeat';

        element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
        let timestamp = element.getElementsByClassName("timestamp")[0];
        let songAudio = new Audio(songs[i].filePath);
        songAudio.addEventListener('loadedmetadata', ()=>{
            let minutes = Math.floor(songAudio.duration /60);
            let seconds = Math.floor(songAudio.duration %60);

            timestamp.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
        })

    }
});

// Master play/pause button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();

        masterPlay.src = './pause.png';
        gif.style.opacity = 1;
    } else {
        audioElement.pause();

        masterPlay.src = './play.png';
        gif.style.opacity = 0;
    }
});

// Update progress bar
audioElement.addEventListener('timeupdate', () => {
    if (audioElement.duration) {
        let progress = parseInt(
            (audioElement.currentTime / audioElement.duration) * 100
        );

        myProgressBar.value = progress;
    }
});

// Seekbar functionality
myProgressBar.addEventListener('change', () => {
    if (audioElement.duration) {
        audioElement.currentTime =
            myProgressBar.value * audioElement.duration / 100;
    }
});

// Reset all individual song buttons to play images
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach(element => {
        element.src = './play.png';
        element.alt = 'Play';
    });
};

// Individual song play buttons
Array.from(document.getElementsByClassName('songItemPlay')).forEach(element => {
    element.addEventListener('click', (e) => {
        makeAllPlays();

        songIndex = parseInt(e.currentTarget.id);

        let clickedButton = e.currentTarget;

        // If the current song is already playing, pause it
        if (
            audioElement.src.endsWith(songs[songIndex].filePath) &&
            !audioElement.paused
        ) {
            audioElement.pause();

            clickedButton.src = './play.png';
            masterPlay.src = './play.png';
            gif.style.opacity = 0;

            return;
        }

        // Play selected song
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;

        audioElement.play();

        clickedButton.src = './pause.png';
        clickedButton.alt = 'Pause';

        masterPlay.src = './pause.png';
        gif.style.opacity = 1;
    });
});

// Next button
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;

    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;

    makeAllPlays();
    audioElement.play();

    masterPlay.src = './pause.png';
    gif.style.opacity = 1;
});

// Previous button
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;

    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;

    makeAllPlays();
    audioElement.play();

    masterPlay.src = './pause.png';
    gif.style.opacity = 1;
});
