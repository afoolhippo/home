const FLOOR_CONFIG = {
  floor1: {
    id: "floor1",
    title: "🍭 1F キッズゲーム",
    desc: "かんたん操作で気軽に遊べる、<br>みんなのゲームフロア。",
    className: "floor-1",
    floorName: "キッズゲーム"
  },

  floor2: {
    id: "floor2",
    title: "🌇 2F 放課後ゲーム",
    desc: "ちょっと難しくて歯ごたえあり。<br>学生も大人も楽しめる放課後フロア。",
    className: "floor-2",
    floorName: "放課後ゲーム"
  },

  food: {
    id: "food",
    title: "🍜 フードコート",
    desc: "うどんやがめ煮など。<br>お腹がすいたらこちらへ。",
    className: "floor-food",
    floorName: "フードコート"
  },

  drink: {
    id: "drink",
    title: "🥤 ドリンクバー",
    desc: "のみもの系はこちら。<br>飲みすぎ注意の休憩コーナー。",
    className: "floor-drink",
    floorName: "ドリンクバー"
  },

  experiment: {
    id: "experiment",
    title: "🧪 実験場",
    desc: "ちょっと変な試作ゲームはこちら。",
    className: "floor-experiment",
    floorName: "実験場"
  }
};

if (!Array.isArray(window.GAME_CATALOG)) {
  throw new Error(
    "GAME_CATALOGを読み込めません。game-catalog.jsをgame.jsより先に読み込んでください。"
  );
}

const publishedGames = window.GAME_CATALOG.filter(
  game => game.status === "公開済"
);

const games = Object.fromEntries(
  Object.entries(FLOOR_CONFIG).map(
    ([floorKey, floorConfig]) => {
      const items = publishedGames
        .filter(
          game => game.floor === floorConfig.floorName
        )
        .map(game => ({
          title: game.title,
          image: game.image,
          url: game.url,
          tag: game.genre
        }));

      return [
        floorKey,
        {
          id: floorConfig.id,
          title: floorConfig.title,
          desc: floorConfig.desc,
          className: floorConfig.className,
          items
        }
      ];
    }
  )
);

const gameArea = document.getElementById("gameArea");
const topRandomBtn = document.getElementById("topRandomBtn");

const managerSpeech =
  document.getElementById("managerSpeech");

const managerGameCard =
  document.getElementById("managerGameCard");

const managerGameImage =
  document.getElementById("managerGameImage");



const managerPlayBtn =
  document.getElementById("managerPlayBtn");

const managerChangeBtn =
  document.getElementById("managerChangeBtn");

const menuBtn = document.getElementById("menuBtn");
const closeMenuBtn = document.getElementById("closeMenuBtn");
const menuOverlay = document.getElementById("menuOverlay");
const menuBoardBtn = document.getElementById("menuBoardBtn");

const recentRecordList =
  document.getElementById("recentRecordList");

const boardModal =
  document.getElementById("boardModal");

const closeBoardBtn =
  document.getElementById("closeBoardBtn");

const sendBoardBtn =
  document.getElementById("sendBoardBtn");

const boardMessageList =
  document.getElementById("boardMessageList");

const boardName =
  document.getElementById("boardName");

const boardMessage =
  document.getElementById("boardMessage");

function escapeHtml(text) {
  return String(text ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function createGameCard(game) {
  const card = document.createElement("a");

  card.className = "game-card";
  card.href = game.url;
  card.setAttribute(
    "aria-label",
    `${game.title}で遊ぶ`
  );

  card.innerHTML = `
    <img
      src="${escapeHtml(game.image)}"
      alt="${escapeHtml(game.title)}"
      loading="lazy"
    >
  `;

  return card;
}

function createFloor(section) {
  const floor = document.createElement("section");

  floor.className = `floor ${section.className}`;
  floor.id = section.id;

  floor.innerHTML = `
    <div class="floor-header">
      <h2 class="floor-title">
        ${section.title}
      </h2>

      <p class="floor-desc">
        ${section.desc}
      </p>
    </div>
  `;

  const grid = document.createElement("div");
  grid.className = "game-grid";

  section.items.forEach(game => {
    grid.appendChild(createGameCard(game));
  });

  floor.appendChild(grid);

  return floor;
}

function renderFloors() {
  gameArea.innerHTML = "";

  Object.values(games).forEach(section => {
    gameArea.appendChild(createFloor(section));
  });
}

function getAllGames() {
  return Object.values(games)
    .flatMap(section => section.items);
}

const managerComments = [
  "今日はこれで遊んでいきませんか？",
  "気軽に1ゲーム、いかがですか？",
  "こちら、最近のお気に入りです。",
  "短い時間でも楽しめますよ。",
  "まずはこちらからどうぞ。",
  "これ、意外と奥が深いんです。",
  "こっそりおすすめしておきます。",
  "今日はこの台が気になりますね。",
  "店長の独断で選びました。",
  "どんなゲームか、試してみませんか？"
];

const TYPEWRITER_DELAY = 45;
const TYPEWRITER_START_DELAY = 100;
const MANAGER_FADE_DELAY = 220;

let currentManagerGame = null;
let typewriterTimer = null;
let typewriterStartTimer = null;
let isManagerSwitching = false;

function getRandomItem(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  const index = Math.floor(Math.random() * items.length);
  return items[index];
}

function clearTypewriter() {
  if (typewriterTimer !== null) {
    window.clearTimeout(typewriterTimer);
    typewriterTimer = null;
  }

  if (typewriterStartTimer !== null) {
    window.clearTimeout(typewriterStartTimer);
    typewriterStartTimer = null;
  }
}

function typeManagerComment(text, instant = false) {
  if (!managerSpeech) return;

  clearTypewriter();

  if (instant) {
    managerSpeech.textContent = text;
    return;
  }

  managerSpeech.textContent = "";
  let index = 0;

  typewriterStartTimer = window.setTimeout(() => {
    function typeNextCharacter() {
      managerSpeech.textContent = text.slice(0, index + 1);
      index += 1;

      if (index < text.length) {
        typewriterTimer = window.setTimeout(
          typeNextCharacter,
          TYPEWRITER_DELAY
        );
      } else {
        typewriterTimer = null;
      }
    }

    typeNextCharacter();
  }, TYPEWRITER_START_DELAY);
}

function applyManagerRecommendation(
  nextGame,
  comment,
  instantText = false
) {
  currentManagerGame = nextGame;

  typeManagerComment(comment, instantText);

  if (managerGameImage) {
    managerGameImage.src = nextGame.image;
    managerGameImage.alt = nextGame.title;
  }

  if (managerGameCard) {
    managerGameCard.href = nextGame.url;
    managerGameCard.setAttribute(
      "aria-label",
      `${nextGame.title}を遊ぶ`
    );
  }

  if (managerPlayBtn) {
    managerPlayBtn.href = nextGame.url;
  }
}

function getNextManagerGame() {
  const allGames = getAllGames();

  if (allGames.length === 0) {
    return null;
  }

  let nextGame = getRandomItem(allGames);

  if (allGames.length > 1 && currentManagerGame) {
    while (nextGame.url === currentManagerGame.url) {
      nextGame = getRandomItem(allGames);
    }
  }

  return nextGame;
}

function showManagerRecommendation(withAnimation = false) {
  const nextGame = getNextManagerGame();

  if (!nextGame) return;

  const nextComment = getRandomItem(managerComments);

  if (!withAnimation) {
    applyManagerRecommendation(nextGame, nextComment, true);
    return;
  }

  if (isManagerSwitching) return;

  isManagerSwitching = true;
  clearTypewriter();

  if (managerChangeBtn) {
    managerChangeBtn.disabled = true;
  }

  managerGameCard?.classList.add("is-switching");

  window.setTimeout(() => {
    applyManagerRecommendation(nextGame, nextComment, false);

    requestAnimationFrame(() => {
      managerGameCard?.classList.remove("is-switching");
      isManagerSwitching = false;

      if (managerChangeBtn) {
        managerChangeBtn.disabled = false;
      }
    });
  }, MANAGER_FADE_DELAY);
}

function playRandomGame() {
  const allGames = getAllGames();

  if (allGames.length === 0) return;

  const randomIndex =
    Math.floor(Math.random() * allGames.length);

  window.location.href = allGames[randomIndex].url;
}

async function loadRecentRecords() {
  if (!recentRecordList) return;

  const { data, error } = await kabaDb
    .from("kaba_scores")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    console.error(error);

    recentRecordList.innerHTML = `
      <div class="record-card">
        記録を読み込めませんでした
      </div>
    `;
    return;
  }

  if (!data || data.length === 0) {
    recentRecordList.innerHTML = `
      <div class="record-card">
        まだ記録がありません
      </div>
    `;
    return;
  }

  recentRecordList.innerHTML =
    data.map(record => `
      <div class="record-card">
        <div class="record-rank">
          ${escapeHtml(record.rank_title)}
        </div>

        <div class="record-meta">
          ${escapeHtml(record.game_title)}
          /
          ${escapeHtml(record.nickname)}
        </div>

        <div class="record-score">
          ${escapeHtml(record.score)}てん
        </div>
      </div>
    `).join("");
}

async function loadBoardMessages() {
  if (!boardMessageList) return;

  boardMessageList.innerHTML =
    "読み込み中...";

  const { data, error } =
    await kabaDb
      .from("kaba_messages")
      .select("*")
      .order("created_at", {
        ascending: false
      })
      .limit(10);

  if (error) {
    console.error(error);

    boardMessageList.innerHTML =
      "読み込み失敗";

    return;
  }

  if (!data || data.length === 0) {
    boardMessageList.innerHTML =
      "まだ書き込みがありません";

    return;
  }

  boardMessageList.innerHTML =
    data.map(item => `
      <div class="board-message-card">

        <div class="board-message-name">
          ${escapeHtml(item.nickname || "名無しカバ")}
        </div>

        <div class="board-message-date">
          ${
            new Date(item.created_at)
              .toLocaleDateString("ja-JP")
          }
        </div>

        <div>
          ${escapeHtml(item.message)}
        </div>

      </div>
    `).join("");
}

function openMenu() {
  if (!menuOverlay) return;

  menuOverlay.classList.remove("hidden");
}

function closeMenu() {
  if (!menuOverlay) return;

  menuOverlay.classList.add("hidden");
}

function openBoard() {
  if (!boardModal) return;

  boardModal.classList.remove("hidden");
  loadBoardMessages();
}

function closeBoard() {
  if (!boardModal) return;

  boardModal.classList.add("hidden");
}

if (menuBtn) {
  menuBtn.addEventListener("click", openMenu);
}

if (closeMenuBtn) {
  closeMenuBtn.addEventListener("click", closeMenu);
}

if (menuOverlay) {
  menuOverlay.addEventListener("click", event => {
    if (event.target === menuOverlay) {
      closeMenu();
    }
  });
}

document
  .querySelectorAll(".menu-link")
  .forEach(link => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

if (menuBoardBtn) {
  menuBoardBtn.addEventListener("click", event => {
    event.preventDefault();
    closeMenu();
    openBoard();
  });
}

if (topRandomBtn) {
  topRandomBtn.addEventListener("click", playRandomGame);
}

if (managerChangeBtn) {
  managerChangeBtn.addEventListener(
    "click",
    () => showManagerRecommendation(true)
  );
}

if (closeBoardBtn) {
  closeBoardBtn.addEventListener("click", closeBoard);
}

if (sendBoardBtn) {
  sendBoardBtn.addEventListener("click", async () => {
    const nickname =
      boardName.value.trim();

    const message =
      boardMessage.value.trim();

    if (!message) {
      alert("ひとことを書いてください");
      return;
    }

    sendBoardBtn.disabled = true;

    const { error } =
      await kabaDb
        .from("kaba_messages")
        .insert([
          {
            nickname,
            message
          }
        ]);

    sendBoardBtn.disabled = false;

    if (error) {
      console.error(error);
      alert("投稿失敗");
      return;
    }

    boardMessage.value = "";
    loadBoardMessages();
  });
}

renderFloors();
showManagerRecommendation();
loadRecentRecords();
