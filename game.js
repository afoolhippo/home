const games = {
  floor1: {
    id: "floor1",
    title: "🍭 1F キッズゲーム",
    desc: "みんなでワイワイ遊べる、<br>にぎやかなゲームフロア。",
    className: "floor-1",
    featured: "ポキポキきゅうり",
    items: [
      {
        title: "ポキポキきゅうり",
        image: "game4.png",
        url: "https://afoolhippo.github.io/game4/",
        tag: "反射神経"
      },
      {
        title: "はみがきしようぜ",
        image: "game8.png",
        url: "https://afoolhippo.github.io/game8/",
        tag: "早押し"
      },
      {
        title: "みんなでそっか！",
        image: "game2.png",
        url: "https://afoolhippo.github.io/game2/",
        tag: "音ゲー"
      },
      {
        title: "苗字苗字yeah",
        image: "game9.png",
        url: "https://afoolhippo.github.io/game9/",
        tag: "カルタ"
      },
      {
        title: "BABY BABY BAMBOO",
        image: "game5.png",
        url: "https://afoolhippo.github.io/game5/",
        tag: "早押し"
      },
      {
        title: "サルトリイバラ",
        image: "game10.png",
        url: "https://afoolhippo.github.io/game10/",
        tag: "トゲ避け"
      },
      {
        title: "FISHING BOY",
        image: "game7.png",
        url: "https://afoolhippo.github.io/game7/",
        tag: "釣り"
      }
    ]
  },

  floor2: {
    id: "floor2",
    title: "🌇 2F 放課後ゲーム",
    desc: "夕焼け、寄り道、放課後。<br>ちょっと不思議なゲームコーナー。",
    className: "floor-2",
    featured: "カバファイト",
    items: [
      {
        title: "バカなカバの大冒険",
        image: "game1.png",
        url: "https://afoolhippo.github.io/hippogame/",
        tag: "ＲＰＧ"
      },
      {
        title: "カバファイト",
        image: "game14.png",
        url: "https://afoolhippo.github.io/game14/",
        tag: "格闘ゲーム"
      }
    ]
  },

  food: {
    id: "food",
    title: "🍜 フードコート",
    desc: "うどんやがめ煮など。<br>お腹がすいたらこちらへ。",
    className: "floor-food",
    featured: "箱太郎伝説",
    items: [
      {
        title: "がめ煮ソウル",
        image: "game3.png",
        url: "https://afoolhippo.github.io/game3/",
        tag: "具材集め"
      },
      {
        title: "箱太郎伝説",
        image: "game19.png",
        url: "https://afoolhippo.github.io/game19/",
        tag: "うどんづくり"
      }
    ]
  },

  drink: {
    id: "drink",
    title: "🥤 ドリンクバー",
    desc: "のみもの系はこちら。<br>飲みすぎ注意の休憩コーナー。",
    className: "floor-drink",
    featured: "二日酔いロード",
    items: [
      {
        title: "テトリスコーヒー",
        image: "game12.png",
        url: "https://afoolhippo.github.io/game12/",
        tag: "謎パズル"
      },
      {
        title: "タポタポオレンジ",
        image: "game11.png",
        url: "https://afoolhippo.github.io/game11/",
        tag: "我慢"
      },
      {
        title: "二日酔いロード",
        image: "game6.png",
        url: "https://afoolhippo.github.io/game6/",
        tag: "電柱回避"
      }
    ]
  }
};

const gameArea = document.getElementById("gameArea");
const topRandomBtn = document.getElementById("topRandomBtn");

const menuBtn = document.getElementById("menuBtn");
const closeMenuBtn = document.getElementById("closeMenuBtn");
const menuOverlay = document.getElementById("menuOverlay");
const menuBoardBtn = document.getElementById("menuBoardBtn");

const SUPABASE_URL =
  "https://gmncxnybsovlallxgnkd.supabase.co";

const SUPABASE_ANON_KEY =
  "sb_publishable_ly3h5OhL8HDSHhYdmJq_Fw_9pG3mhla";

const kabaDb =
  supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );

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

  card.innerHTML = `
    <img src="${game.image}" alt="${game.title}">

    <div class="game-title">
      ${game.title}
    </div>

    <div class="game-tag">
      ${game.tag}
    </div>
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

  const featuredGame =
    section.items.find(
      game => game.title === section.featured
    );

  if (featuredGame) {
    const featured =
      createGameCard(featuredGame);

    featured.classList.add("featured-card");

    const wrap =
      document.createElement("div");

    wrap.className = "featured-wrap";

    wrap.innerHTML = `
      <div class="featured-label">
        おすすめ
      </div>
    `;

    wrap.appendChild(featured);
    floor.appendChild(wrap);
  }

  const grid =
    document.createElement("div");

  grid.className = "game-grid";

  section.items
    .filter(game => game.title !== section.featured)
    .forEach(game => {
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
loadRecentRecords();