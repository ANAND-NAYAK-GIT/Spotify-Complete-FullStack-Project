const express = require("express");
const app = express();
let port = 8080;
const cors = require("cors");
app.use(cors());

const songs = [
  {
    id: 1,
    title: "Esha nagula katta",
    artist: "Anirudh",
    cover: "card6img.jpeg", // reuse your existing image assets
    src: "songs/track1.mp3", // path to actual audio file
    duration: 3.12,
  },
  {
    id: 2,
    title: "Thassadiya",
    artist: "Samantha",
    cover: "card2img.jpeg",
    src: "songs/track2.mp3",
    duration: 3.12,
  },
  {
    id: 3,
    title: "Singari",
    artist: "Anirudh",
    cover: "card3img.jpeg", // reuse your existing image assets
    src: "songs/track3.mp3", // path to actual audio file
    duration: 3.12,
  },
  {
    id: 4,
    title: "Pilichina",
    artist: "Mahesh babu",
    cover: "card4img.jpeg",
    src: "songs/track4.mp3",
    duration: 3.12,
  },
];

app.get("/songs", (req, res) => {
  const { artist } = req.query;
  if (artist) {
    let artist_songs = songs.filter(
      (p) =>
        artist.toLocaleLowerCase() === String(p.artist).toLocaleLowerCase(),
    );
    if (artist_songs) {
      res.json(artist_songs);
    } else {
      res.json("");
    }
  } else {
    res.json(songs);
  }
});

app.get("/songs/:id", (req, res) => {
  const { id } = req.params;
  let post = songs.find((p) => id === String(p.id));
  if (post) {
    res.json(post);
  } else {
    return res.status(404).json({
      error: "No song found",
    });
  }
});

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
