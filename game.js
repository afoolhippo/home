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
    url: "https://afoolhippo.github.io/game3/"
  },
  {
    title: "みんなでそっか！",
    description: "タイミングよく、みんなでそっか。",
    image: "images/sokka.png",
    url: "https://afoolhippo.github.io/game2/"
  },
  {
    title: "ポキポキきゅうり",
    description: "きゅうりをベストタイミングでポキッ！",
    image: "images/pokipoki.png",
    url: "https://afoolhippo.github.io/game4/"
  },
    title: "BABY BABY BAMBOO",
    description: "タケノコが成長する前に収穫しよう！",
    image: "images/bamboo.png",
    url: "https://afoolhippo.github.io/game5/"
  }
];

let currentIndex = 0;
let virtualIndex = 0;
let velocity = 0;
let animationId = null;

let isDragging = false;
let dragStartX = 0;
let dragLastX = 0;
let dragLastTime = 0;
let dragMoved = false;

const titleScreen = document.getElementById("titleScreen");
const selectScreen = document.getElementById("selectScreen");
const coverTrack = document.getElementById("coverTrack");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const playButton = document.getElementById("playButton");
const gameTitle = document.getElementById("gameTitle");
const gameDescription = document.getElementById("gameDescription");
const positionDots = document.getElementById("positionDots");

/* SOUND */

const enterSound = new Audio("sounds/enter.mp3");
const selectSound = new Audio("sounds/select1.mp3");
const decideSound = new Audio("sounds/select2.mp3");

function playSound(sound) {
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

/* UTILITY */

function wrapIndex(value) {
  const total = games.length;
  return ((value % total) + total) % total;
}

function nearestIndex(value) {
  return wrapIndex(Math.round(value));
}

function getShortestDiff(index, base) {
  const total = games.length;
  const wrappedBase = wrapIndex(base);

  let diff = index - wrappedBase;

  if (diff > total / 2) {
    diff -= total;
  }

  if (diff < -total / 2) {
    diff += total;
  }

  return diff;
}

function setCurrentIndex(index, withSound = false) {
  const next = wrapIndex(index);

  if (next === currentIndex) {
    return;
  }

  currentIndex = next;
  updateInfo();
  updateDots();

  if (withSound) {
    playSound(selectSound);
  }
}

/* RENDER */

function createCovers() {
  coverTrack.innerHTML = "";

  games.forEach((game, index) => {
    const cover = document.createElement("button");

    cover.classList.add("cover");
    cover.dataset.index = index;

    cover.innerHTML =
      `<img src="${game.image}" alt="${game.title}">`;

    cover.addEventListener("click", () => {
      if (dragMoved) {
        return;
      }

      if (index === currentIndex) {
        playSound(decideSound);
        pulsePlayButton();
        return;
      }

      moveToIndex(index);
    });

    coverTrack.appendChild(cover);
  });
}

function renderCovers() {
  const covers = document.querySelectorAll(".cover");

  covers.forEach((cover) => {
    const index = Number(cover.dataset.index);
    const diff = getShortestDiff(index, virtualIndex);
    const absDiff = Math.abs(diff);

    if (absDiff > 2.6) {
      cover.style.opacity = "0";
      cover.style.pointerEvents = "none";
      cover.style.zIndex = "0";
      return;
    }

    const x = diff * 52;
    const scale = Math.max(0.46, 1 - absDiff * 0.28);
    const opacity = Math.max(0.16, 1 - absDiff * 0.42);
    const z = Math.round(100 - absDiff * 20);

    cover.style.opacity = opacity;
    cover.style.pointerEvents = "auto";
    cover.style.zIndex = z;
    cover.style.transform =
      `translateX(${x}%) scale(${scale})`;
  });
}

function renderDots() {
  positionDots.innerHTML = "";

  games.forEach((_, index) => {
    const dot = document.createElement("button");

    dot.classList.add("position-dot");

    if (index === currentIndex) {
      dot.classList.add("active");
    }

    dot.setAttribute("aria-label", `${index + 1}番目のゲームを選択`);

    dot.addEventListener("click", () => {
      moveToIndex(index);
    });

    positionDots.appendChild(dot);
  });
}

/* INFO */

function updateInfo() {
  const game = games[currentIndex];

  gameTitle.textContent = game.title;
  gameDescription.textContent = game.description;
}

function updateDots() {
  const dots = document.querySelectorAll(".position-dot");

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

function updateScreen() {
  renderCovers();
  updateInfo();
  renderDots();
}

/* ANIMATION */

function stopAnimation() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
}

function animateInertia() {
  virtualIndex = wrapIndex(virtualIndex + velocity);

  velocity *= 0.93;

  const snapTarget = Math.round(virtualIndex);
  const snapDiff = snapTarget - virtualIndex;

  if (Math.abs(velocity) < 0.015) {
    virtualIndex = wrapIndex(virtualIndex + snapDiff * 0.18);
  }

  setCurrentIndex(nearestIndex(virtualIndex), false);
  renderCovers();

  if (
    Math.abs(velocity) < 0.002 &&
    Math.abs(snapDiff) < 0.004
  ) {
    virtualIndex = wrapIndex(snapTarget);
    velocity = 0;

    setCurrentIndex(nearestIndex(virtualIndex), true);
    renderCovers();

    animationId = null;
    return;
  }

  animationId = requestAnimationFrame(animateInertia);
}

function startInertia(startVelocity) {
  stopAnimation();

  velocity = Math.max(-0.32, Math.min(0.32, startVelocity));
  animationId = requestAnimationFrame(animateInertia);
}

function animateToIndex(targetIndex) {
  stopAnimation();

  const target = wrapIndex(targetIndex);
  const diff = getShortestDiff(target, virtualIndex);
  const absoluteTarget = virtualIndex + diff;

  function step() {
    const distance = absoluteTarget - virtualIndex;

    virtualIndex = wrapIndex(virtualIndex + distance * 0.22);

    setCurrentIndex(nearestIndex(virtualIndex), false);
    renderCovers();

    if (Math.abs(distance) < 0.004) {
      virtualIndex = target;
      currentIndex = target;

      updateInfo();
      updateDots();
      renderCovers();

      animationId = null;
      playSound(selectSound);
      return;
    }

    animationId = requestAnimationFrame(step);
  }

  animationId = requestAnimationFrame(step);
}

/* MOVE */

function nextGame() {
  moveToIndex(currentIndex + 1);
}

function prevGame() {
  moveToIndex(currentIndex - 1);
}

function moveToIndex(index) {
  animateToIndex(wrapIndex(index));
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

  if (game.url && game.url !== "#") {
    setTimeout(() => {
      window.location.href = game.url;
    }, 220);
  }
}

/* POINTER DRAG */

function dragStart(clientX) {
  stopAnimation();

  isDragging = true;
  dragMoved = false;
  dragStartX = clientX;
  dragLastX = clientX;
  dragLastTime = performance.now();
  velocity = 0;
}

function dragMove(clientX) {
  if (!isDragging) {
    return;
  }

  const now = performance.now();
  const dx = clientX - dragLastX;
  const totalDx = clientX - dragStartX;

  if (Math.abs(totalDx) > 8) {
    dragMoved = true;
  }

  const trackWidth = Math.max(coverTrack.offsetWidth, 1);
  const indexDelta = -dx / (trackWidth * 0.36);

  virtualIndex = wrapIndex(virtualIndex + indexDelta);

  const dt = Math.max(now - dragLastTime, 16);
  velocity = indexDelta * (16 / dt);

  dragLastX = clientX;
  dragLastTime = now;

  setCurrentIndex(nearestIndex(virtualIndex), false);
  renderCovers();
}

function dragEnd() {
  if (!isDragging) {
    return;
  }

  isDragging = false;

  if (!dragMoved) {
    return;
  }

  startInertia(velocity * 1.8);

  setTimeout(() => {
    dragMoved = false;
  }, 120);
}

coverTrack.addEventListener("pointerdown", (event) => {
  coverTrack.setPointerCapture(event.pointerId);
  dragStart(event.clientX);
});

coverTrack.addEventListener("pointermove", (event) => {
  dragMove(event.clientX);
});

coverTrack.addEventListener("pointerup", () => {
  dragEnd();
});

coverTrack.addEventListener("pointercancel", () => {
  dragEnd();
});

/* EVENT */

titleScreen.addEventListener("click", startPortal);
prevButton.addEventListener("click", prevGame);
nextButton.addEventListener("click", nextGame);
playButton.addEventListener("click", playGame);

/* KEYBOARD */

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
});

/* INIT */

createCovers();
updateScreen();