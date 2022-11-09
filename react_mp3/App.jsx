const songs = [
  {
    name: "Lâu Lâu Nhắc Lại",
    singer: "Hà Nhi",
    path: "./assets/music/song1.mp3",
    image: "./assets/img/img1.jfif",
  },
  {
    name: "Thế Giới Trong Em",
    singer: "Hương Ly",
    path: "./assets/music/song3.mp3",
    image: "./assets/img/img3.jfif",
  },
  {
    name: "Mơ Hồ",
    singer: "Bùi Anh Tuấn",
    path: "./assets/music/song4.mp3",
    image: "./assets/img/img4.jfif",
  },
  {
    name: "Thì Anh Không Biết",
    singer: "Khói",
    path: "./assets/music/song5.mp3",
    image: "./assets/img/img5.jfif",
  },
  {
    name: "Đi Qua Hoa Cúc",
    singer: "Tea",
    path: "./assets/music/song6.mp3",
    image: "./assets/img/img6.jfif",
  },
  {
    name: "Cơn Mưa Tình Yêu",
    singer: "Hà Anh Tuấn",
    path: "./assets/music/song7.mp3",
    image: "./assets/img/img7.jfif",
  },
  {
    name: "Chạm Vào Nỗi Nhớ",
    singer: "Minh Vương MP4",
    path: "./assets/music/song8.mp3",
    image: "./assets/img/img8.jfif",
  },
  {
    name: "Nỗi Đau Xót Xa",
    singer: "Minh Vương MP4",
    path: "./assets/music/song9.mp3",
    image: "./assets/img/img9.jfif",
  },
  {
    name: "Mơ",
    singer: "Vũ Cát Tường",
    path: "./assets/music/song10.mp3",
    image: "./assets/img/img10.jfif",
  },
];

const SongField = ({ song }) => {
  return (
    <div className="song-field">
      <div className="thumbnail">
        <img src={song.image} alt="" />
      </div>
      <div className="song-info">
        <h3 className="song-name">{song.name}</h3>
        <p className="singer">{song.singer}</p>
      </div>
    </div>
  );
};

const Control = ({ song, play, prev, next }) => {
  return (
    <div className="control">
      <div className="control-field">
        <div className="btn btn-repeat">
          <i className="fa-solid fa-rotate-left"></i>
        </div>
        <div className="btn btn-prev" onClick={prev}>
          <i className="fa-regular fa-square-caret-left"></i>
        </div>
        <div className="btn btn-toggle-play" onClick={play}>
          <i className="fa-solid fa-caret-right pause-btn"></i>
        </div>
        <div className="btn btn-next" onClick={next}>
          <i className="fa-regular fa-square-caret-right"></i>
        </div>
        <div className="btn btn-random">
          <i className="fa-solid fa-shuffle"></i>
        </div>
      </div>

      <input
        type="range"
        value="0"
        step="1"
        min="0"
        max="100"
        id="progress"
        className="progress"
      />
      <audio src={song.path} id="audio"></audio>
    </div>
  );
};

const Volume = () => {
  return (
    <div className="volume-field">
      <i className="fa-solid fa-volume-low"></i>
      <input
        type="range"
        value="0"
        step="1"
        min="0"
        max="100"
        id="volume"
        className="volume"
      />
      <i className="fa-solid fa-music"></i>
    </div>
  );
};

const App = () => {
  const [index, setIndex] = React.useState(0);
  const song = songs[index];
  let isPlaying = true;

  const playSong = () => {
    const audio = document.querySelector("audio");
    if (isPlaying) {
      isPlaying = false;
      audio.play();
    } else {
      isPlaying = true;
      audio.pause();
    }
  };

  const nextSong = () => {
    const audio = document.querySelector("audio");
    audio.play();

    if (index == songs.length - 1) {
      setIndex(0);
    } else {
      setIndex((previousCount) => previousCount + 1);
    }
  };

  const prevSong = () => {
    if (index == 0) {
      setIndex(songs.length - 1);
      const audio = document.querySelector("audio");
      audio.play();
    } else {
      setIndex((previousCount) => previousCount - 1);
      const audio = document.querySelector("audio");
      audio.play();
    }
  };

  return (
    <div className="container">
      <SongField song={song} />

      <Control song={song} play={playSong} prev={prevSong} next={nextSong} />

      <Volume />
    </div>
  );
};
const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<App />);
