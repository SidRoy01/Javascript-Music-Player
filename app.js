const bulleya = new Audio("./song/Sultan - Bulleya.mp3");
const tereHawale = new Audio("./song/Tere Hawaale.mp3");
const ashiqui2 = new Audio("./song/Tum Hi Ho.mp3");

const preBtn = document.getElementById("previous");
const playBtn = document.getElementById("pause");
const nextBtn = document.getElementById("next");
const songName = document.getElementById("song-name");
const albumName = document.getElementById("albumname");
const artistName = document.getElementById("artist-name");
const progress = document.getElementById("progress");
const albumArt = document.getElementById("albumart");
const currentTimeEle = document.getElementById("current-time");
const totalDuration = document.getElementById("total-duration");

const songs = [
  {
    ele: bulleya,
    audioName: "Bulleya",
    albumname: "PLAYING FROM ALBUM Sultan",
  },
  {
    ele: tereHawale,
    audioName: "Tere Hawaale",
    albumname: "PLAYING FROM ALBUM Lal Singh Chadda",
  },
  {
    ele: ashiqui2,
    audioName: "Tum Hi Ho",
    albumname: "PLAYING FROM ALBUM Ashiqui 2",
  },
];

const songImages = [
  "img/Bulleya.jpg",
  "img/Tere Hawaale.jpg",
  "img/Tum Hi Ho.jpg",
];

let current = 0;
let currentSong = songs[current].ele;

songName.innerText = songs[current].audioName;
albumName.innerText = songs[current].albumname;
albumArt.src = songImages[current];

currentSong.onloadedmetadata = function () {
  progress.max = currentSong.duration;
  progress.value = currentSong.currentTime;
};

if (currentSong.play()) {
  setInterval(() => {
    progress.value = currentSong.currentTime;
  }, 500);
}
progress.onchange = function () {
  currentSong.play();
  currentSong.currentTime = progress.value;
  playBtn.className = "fa-solid fa-circle-pause";
};

const updateSong = (act) => {
  currentSong.pause();
  currentSong.currentTime = 0;
  if (act === "next") {
    current = (current + 1) % songs.length;
  } else if (act === "previous") {
    current = (current - 1 + songs.length) % songs.length;
  }
  currentSong = songs[current].ele;
  songName.innerText = songs[current].audioName;
  albumName.innerText = songs[current].albumname;
  albumArt.src = songImages[current];
};

const playPauseSong = () => {
  if (currentSong.paused) {
    currentSong.play();
    playBtn.className = "fa-solid fa-circle-pause";
    albumArt.classList.add("animation");
  } else {
    currentSong.pause();
    playBtn.className = "fa-solid fa-circle-play";
    albumArt.classList.remove("animation");
  }
};

preBtn.addEventListener("click", () => {
  updateSong("previous");
  playPauseSong();
});

nextBtn.addEventListener("click", () => {
  updateSong("next");
  playPauseSong();
});

playBtn.addEventListener("click", () => {
  playPauseSong();
});

for (const song of songs) {
  song.ele.addEventListener("ended", () => {
    updateSong("next");
    playPauseSong();
  });
}
