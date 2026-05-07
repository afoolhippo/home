const games = [
  {
    title: "バカなカバの大冒険",
    description: "なつかしくて、ふしぎなところ。",
    image: "images/baka-kaba.png",
    url: "https://afoolhippo.github.io/hippogame/"
  },
  {
    title: "がめ煮ソウル",
    description: "具材をあつめて、うまみを高めろ。",
    image: "images/gameni-soul.png",
    url: "#"
  },
  {
    title: "そっか！",
    description: "タイミングよく、みんなでそっか。",
    image: "images/sokka.png",
    url: "#"
  }
];

let currentIndex = 0;

const titleScreen = document.getElementById("titleScreen");
const gameSelect = document.getElementById("gameSelect");
const startButton = document.getElementById("startButton");

const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const playButton = document.getElementById("playButton");

const gameImage = document.getElementById("gameImage");
const gameTitle = document.getElementById("gameTitle");
const gameDescription = document.getElementById("gameDescription");

function updateGame() {
  const game = games[currentIndex];

  gameImage.src = game.image;
  gameImage.alt = game.title;
  gameTitle.textContent = game.title;
  gameDescription.textContent = game.description;
}

function nextGame() {
  currentIndex = (currentIndex + 1) % games.length;
  updateGame();
}

function prevGame() {
  currentIndex = (currentIndex - 1 + games.length) % games.length;
  updateGame();
}

function startPortal() {
  titleScreen.classList.add("hidden");
  gameSelect.classList.remove("hidden");
  updateGame();
}

function playGame() {
  const game = games[currentIndex];

  if (game.url && game.url !== "#") {
    window.location.href = game.url;
  }
}

startButton.addEventListener("click", startPortal);
nextButton.addEventListener("click", nextGame);
prevButton.addEventListener("click", prevGame);
playButton.addEventListener("click", playGame);

document.addEventListener("keydown", (event) => {
  if (!titleScreen.classList.contains("hidden")) {
    if (event.key === "Enter" || event.key === " ") {
      startPortal();
    }
    return;
  }

  if (event.key === "ArrowRight") {
    nextGame();
  }

  if (event.key === "ArrowLeft") {
    prevGame();
  }

  if (event.key === "Enter" || event.key === " ") {
    playGame();
  }

  if (event.key === "Escape") {
    gameSelect.classList.add("hidden");
    titleScreen.classList.remove("hidden");
  }
});