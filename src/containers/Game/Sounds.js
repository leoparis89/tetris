class Sound {
  constructor(url) {
    this.audio = new Audio(url);
  }

  play() {
    this.audio.play();
    this.audio.load();
  }
}

const move = new Sound('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');

export default {move};
