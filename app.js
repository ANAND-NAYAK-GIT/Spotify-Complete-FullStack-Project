// const songs = [
//   {
//     id: 1,
//     title: "Esha nagula katta",
//     artist: "Anirudh",
//     cover: "card6img.jpeg", // reuse your existing image assets
//     src: "songs/track1.mp3", // path to actual audio file
//     duration: 3.12,
//   },
//   {
//     id: 2,
//     title: "Thassadiya",
//     artist: "Samantha",
//     cover: "card2img.jpeg",
//     src: "songs/track2.mp3",
//     duration: 3.12,
//   },
//   {
//     id: 3,
//     title: "Singari",
//     artist: "Anirudh",
//     cover: "card3img.jpeg", // reuse your existing image assets
//     src: "songs/track3.mp3", // path to actual audio file
//     duration: 3.12,
//   },
//   {
//     id: 4,
//     title: "Pilichina",
//     artist: "Mahesh babu",
//     cover: "card4img.jpeg",
//     src: "songs/track4.mp3",
//     duration: 3.12,
//   },
// ];

let audio = document.querySelector("#audio");
let currentIndex = 0; // matches your current loadSong(songs[0]) call
let id;

// Initial setup  --> starting stage
function loadSong(song) {
  // 1. Point the actual <audio> element at this track's file
  audio.src = song.src;

  // 2. Update the album art image in the player bar
  document.querySelector(".album-icon").src = song.cover;

  // 3. Update the song title text
  document.querySelector(".singer p:first-child").textContent = song.title;
  // 4. Update the artist name text
  document.querySelector(".singer p:last-child").textContent = song.artist;
}

async function fetchSongs() {
  try {
    const response = await fetch("http://localhost:8080/songs");
    const data = await response.json();
    return data;
  } catch (err) {
    let error = "Some Error";
    return error;
  }
}

// Step 8 --> Manually control the volume in the app
document.querySelector(".volm").addEventListener("input", function (e) {
  audio.volume = e.target.value / 100;
});

// Step 7 --> play next song if the current song ends
audio.addEventListener("ended", function () {
  if (currentIndex != songs.length - 1) nextsong.click();
});

// Step 6 --> change the song based on next and previous button
let nextsong = document.querySelector("#nextsong");
nextsong.addEventListener("click", function () {
  if (currentIndex < songs.length) currentIndex = currentIndex + 1;
  loadSong(songs[currentIndex]);
  playsong(audio);
});

let previoussong = document.querySelector("#previoussong");
previoussong.addEventListener("click", function () {
  if (currentIndex > 0) currentIndex = currentIndex - 1;
  loadSong(songs[currentIndex]);
  playsong(audio);
});

// Step 5
document.querySelector(".progress-bar").addEventListener("input", function (e) {
  let present_time = e.target.value;
  audio.currentTime = (present_time / 100) * audio.duration;
});

// Step 4
audio.addEventListener("loadedmetadata", function () {
  document.querySelector(".tot-time").textContent = formatTime(audio.duration);
});

// Step 3
function timings(playpause, song) {
  if (playpause) {
    document.querySelector("#playorpause").src = "pause.png";
    id = setInterval(() => {
      let timecovered = formatTime(song.currentTime);
      document.querySelector(".curr-time").textContent = timecovered;
      // document.querySelector(".progress-bar").setAttribute("min", timecovered);
      document.querySelector(".progress-bar").value =
        (audio.currentTime / audio.duration) * 100;
    }, 1000);
  } else {
    document.querySelector("#playorpause").src = "player_icon3.png";
    clearInterval(id);
  }
}

// Step 2
function playsong(song) {
  song.play();
  timings(true, song);
}
function pausesong(song) {
  song.pause();
  timings(false, song);
}

// Step 1
let playericon = document.querySelector("#playorpause");
playericon.addEventListener("click", function () {
  if (audio.paused) {
    playsong(audio);
  } else {
    pausesong(audio);
  }
});

// Step 3 - a --> calculated the time of the song played
function formatTime(time) {
  // const currentTime = Math.floor(audio.currentTime);
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const formattedTime = `${minutes}:${String(seconds).padStart(2, "0")}`;

  return formattedTime;
}

let songs = fetchSongs();
songs
  .then((data) => {
    songs = data;
    let cardcontainer = document.querySelector(".card-container");
    songs.forEach((song, index) => {
      let songcard = document.createElement("div");
      songcard.setAttribute("class", "card");
      let songimg = document.createElement("img");
      songimg.setAttribute("class", "card-img");
      let songtitle = document.createElement("p");
      let songartist = document.createElement("p");

      songimg.setAttribute("src", song.cover);
      songtitle.textContent = song.title;
      songartist.textContent = song.artist;

      songcard.appendChild(songimg);
      songcard.appendChild(songtitle);
      songcard.appendChild(songartist);
      cardcontainer.appendChild(songcard);

      songcard.addEventListener("click", function () {
        currentIndex = index;
        loadSong(songs[index]);
        playsong(audio);
      });
    });
    loadSong(data[currentIndex]);
  })
  .catch((error) => {
    console.log(error);
  });
