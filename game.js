const games = [

  {
    title: "バカなカバの大冒険",

    description:
      "なつかしくて、ふしぎなところ。",

    image:
      "images/baka-kaba.png",

    url:
      "https://afoolhippo.github.io/hippogame/"
  },

  {
    title: "がめ煮ソウル",

    description:
      "具材をあつめて、うまみを高めろ。",

    image:
      "images/gameni-soul.png",

    url:
      "https://afoolhippo.github.io/game3/"
  },

  {
    title: "みんなでそっか！",

    description:
      "タイミングよく、みんなでそっか。",

    image:
      "images/sokka.png",

    url:
      "https://afoolhippo.github.io/game2/"
  }
{
  title: "ポキポキきゅうり",

  description:
    "きゅうりをベストタイミングでポキッ！",

  image:
    "images/pokipoki.png",

  url:
    "https://afoolhippo.github.io/game4/"
},
];

let currentIndex = 0;

const titleScreen =
  document.getElementById("titleScreen");

const selectScreen =
  document.getElementById("selectScreen");

const coverTrack =
  document.getElementById("coverTrack");

const prevButton =
  document.getElementById("prevButton");

const nextButton =
  document.getElementById("nextButton");

const playButton =
  document.getElementById("playButton");

const gameTitle =
  document.getElementById("gameTitle");

const gameDescription =
  document.getElementById("gameDescription");

/* SOUND */

const enterSound =
  new Audio("sounds/enter.mp3");

const selectSound =
  new Audio("sounds/select1.mp3");

const decideSound =
  new Audio("sounds/select2.mp3");

function playSound(sound) {

  sound.currentTime = 0;

  sound.play().catch(() => {});
}

/* POSITION */

function getRelativePosition(index) {

  const total = games.length;

  let diff = index - currentIndex;

  if (diff > total / 2) {
    diff -= total;
  }

  if (diff < -total / 2) {
    diff += total;
  }

  return diff;
}

/* RENDER */

function renderCovers() {

  coverTrack.innerHTML = "";

  games.forEach((game, index) => {

    const diff =
      getRelativePosition(index);

    const cover =
      document.createElement("button");

    cover.classList.add("cover");

    if (diff === 0) {

      cover.classList.add("active");

    } else if (diff === -1) {

      cover.classList.add("left");

    } else if (diff === 1) {

      cover.classList.add("right");

    } else if (diff === -2) {

      cover.classList.add("far-left");

    } else if (diff === 2) {

      cover.classList.add("far-right");

    } else {

      cover.classList.add("hidden-cover");
    }

    cover.innerHTML =
      `<img src="${game.image}" alt="${game.title}">`;

    cover.addEventListener(
      "click",
      () => {

        if (index === currentIndex) {

          playSound(decideSound);

          pulsePlayButton();

        } else {

          currentIndex = index;

          playSound(selectSound);

          updateScreen();
        }
      }
    );

    coverTrack.appendChild(cover);
  });
}

/* INFO */

function updateInfo() {

  const game = games[currentIndex];

  gameTitle.textContent =
    game.title;

  gameDescription.textContent =
    game.description;
}

function updateScreen() {

  renderCovers();

  updateInfo();
}

/* MOVE */

function nextGame() {

  currentIndex =
    (currentIndex + 1)
    % games.length;

  playSound(selectSound);

  updateScreen();
}

function prevGame() {

  currentIndex =
    (currentIndex - 1 + games.length)
    % games.length;

  playSound(selectSound);

  updateScreen();
}

/* START */

function startPortal() {

  playSound(enterSound);

  titleScreen.classList.add("hidden");

  selectScreen.classList.remove("hidden");

  updateScreen();
}

/* PLAY */

function pulsePlayButton() {

  playButton.classList.remove("pulse");

  void playButton.offsetWidth;

  playButton.classList.add("pulse");
}

function playGame() {

  const game = games[currentIndex];

  playSound(decideSound);

  if (
    game.url &&
    game.url !== "#"
  ) {

    setTimeout(() => {

      window.location.href =
        game.url;

    }, 220);
  }
}

/* EVENT */

titleScreen.addEventListener(
  "click",
  startPortal
);

prevButton.addEventListener(
  "click",
  prevGame
);

nextButton.addEventListener(
  "click",
  nextGame
);

playButton.addEventListener(
  "click",
  playGame
);

/* KEYBOARD */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      !titleScreen.classList.contains("hidden")
    ) {

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {

        startPortal();
      }

      return;
    }

    if (
      event.key === "ArrowRight"
    ) {

      nextGame();
    }

    if (
      event.key === "ArrowLeft"
    ) {

      prevGame();
    }

    if (
      event.key === "Enter" ||
      event.key === " "
    ) {

      playGame();
    }
  }
);

/* SWIPE */

let touchStartX = 0;

selectScreen.addEventListener(
  "touchstart",
  (event) => {

    touchStartX =
      event.touches[0].clientX;
  }
);

selectScreen.addEventListener(
  "touchend",
  (event) => {

    const touchEndX =
      event.changedTouches[0].clientX;

    const diff =
      touchEndX - touchStartX;

    if (Math.abs(diff) < 40) {
      return;
    }

    if (diff < 0) {

      nextGame();

    } else {

      prevGame();
    }
  }
);