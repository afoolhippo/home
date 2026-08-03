const SUPABASE_URL =
  "https://gmncxnybsovlallxgnkd.supabase.co";

const SUPABASE_ANON_KEY =
  "sb_publishable_ly3h5OhL8HDSHhYdmJq_Fw_9pG3mhla";

const kabaDb =
  supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );

/*
  今後ゲームを増やす時は、
  この配列に追加するだけでOK。

  id は Supabase の game_id と一致させる。
  title は画面表示用。
*/
const GAME_OPTIONS = [
  {
    id: "all",
    title: "すべてのゲーム",
    icon: "🕒",
    mode: "timeline"
  },
  {
    id: "game2",
    title: "みんなでそっか！",
    icon: "🕺",
    mode: "ranking"
  },
　{
    id: "game3",
    title: "がめ煮ソウル",
    icon: "🍲",
    mode: "ranking"
  },
　{
    id: "game4",
    title: "ポキポキきゅうり",
    icon: "🥒",
    mode: "ranking"
  }, 
　{
    id: "game5",
    title: "BABY BABY BAMBOO",
    icon: "🎋",
    mode: "ranking"
  }, 
　{
    id: "game9",
    title: "苗字苗字yeah",
    icon: "🏷️",
    mode: "ranking"
  }, 
  {
    id: "game8",
    title: "はみがきしようぜ！",
    icon: "🪥",
    mode: "ranking"
  },
  {
    id: "game13",
    title: "ジャニーメリージュリー",
    icon: "🎰",
    mode: "ranking"
  },
  {
    id: "game16",
    title: "石炭掘って",
    icon: "⛏",
    mode: "ranking"
  },
  {
    id: "game18",
    title: "庭師deカット",
    icon: "🌳",
    mode: "ranking"
  },
  {
    id: "game21",
    title: "UFOを見た！",
    icon: "🛸",
    mode: "ranking"
  },
  {
    id: "game29",
    title: "Wifiないと生きていけない",
    icon: "📶",
    mode: "ranking"
  },
  {
    id: "game_hakotarou",
    title: "箱太郎伝説",
    icon: "🍜",
    mode: "ranking"
  }
];

const gameSelect =
  document.getElementById("gameSelect");

const rankingTitle =
  document.getElementById("rankingTitle");

const rankingList =
  document.getElementById("rankingList");

function escapeHtml(text) {
  return String(text ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setupGameSelect() {
  gameSelect.innerHTML = "";

  GAME_OPTIONS.forEach(game => {
    const option =
      document.createElement("option");

    option.value =
      game.id;

    option.textContent =
      game.title;

    gameSelect.appendChild(option);
  });

  gameSelect.addEventListener(
    "change",
    () => {
      loadRecords(gameSelect.value);
    }
  );
}

function getRankMark(index) {
  if (index === 0) return "🥇";
  if (index === 1) return "🥈";
  if (index === 2) return "🥉";

  return `${index + 1}位`;
}

function formatDate(value) {
  if (!value) return "";

  const date =
    new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const y =
    date.getFullYear();

  const m =
    date.getMonth() + 1;

  const d =
    date.getDate();

  const hh =
    String(date.getHours()).padStart(2, "0");

  const mm =
    String(date.getMinutes()).padStart(2, "0");

  return `${y}.${m}.${d} ${hh}:${mm}`;
}

async function loadRecords(gameId) {
  rankingList.innerHTML = `
    <div class="loading-card">
      記録を読み込み中...
    </div>
  `;

  const currentGame =
    GAME_OPTIONS.find(
      game => game.id === gameId
    );

  if (!currentGame) {
    rankingList.innerHTML = `
      <div class="empty-card">
        ゲーム情報が見つかりません。
      </div>
    `;
    return;
  }

  if (currentGame.mode === "timeline") {
    rankingTitle.textContent =
      `${currentGame.icon} 最近の記録`;
  } else {
    rankingTitle.textContent =
      `${currentGame.icon} ${currentGame.title} ランキング`;
  }

  let query =
    kabaDb
      .from("kaba_scores")
      .select("*");

  if (currentGame.mode === "timeline") {
    query =
      query
        .order("created_at", { ascending: false })
        .limit(50);
  } else {
    query =
      query
        .eq("game_id", currentGame.id)
        .order("score", { ascending: false })
        .limit(30);
  }

  const { data, error } =
    await query;

  if (error) {
    console.error(error);

    rankingList.innerHTML = `
      <div class="empty-card">
        記録を読み込めませんでした。<br>
        Supabaseの設定を確認してください。
      </div>
    `;

    return;
  }

  if (!data || data.length === 0) {
    rankingList.innerHTML = `
      <div class="empty-card">
        まだ記録がありません。<br>
        最初の記録をねらおう！
      </div>
    `;

    return;
  }

  if (currentGame.mode === "timeline") {
    renderTimeline(data);
  } else {
    renderRanking(data);
  }
}

function renderTimeline(records) {
  rankingList.innerHTML =
    records.map(record => `
      <article class="rank-card">
        <div class="rank-head">
          <div class="rank-place">
            🕒
          </div>

          <div class="rank-score">
            ${escapeHtml(record.score)}てん
          </div>
        </div>

        <div class="rank-name">
          ${escapeHtml(record.rank_title)}
        </div>

        <div class="rank-title-text">
          ${escapeHtml(record.game_title)}
          /
          ${escapeHtml(record.nickname)}
        </div>

        <div class="rank-date">
          ${escapeHtml(formatDate(record.created_at))}
        </div>
      </article>
    `).join("");
}

function renderRanking(records) {
  rankingList.innerHTML =
    records.map((record, index) => {
      const rankClass =
        index < 3
          ? `rank-${index + 1}`
          : "";

      return `
        <article class="rank-card ${rankClass}">
          <div class="rank-head">
            <div class="rank-place">
              ${getRankMark(index)}
            </div>

            <div class="rank-score">
              ${escapeHtml(record.score)}てん
            </div>
          </div>

          <div class="rank-name">
            ${escapeHtml(record.nickname)}
          </div>

          <div class="rank-title-text">
            ${escapeHtml(record.rank_title)}
          </div>

          <div class="rank-date">
            ${escapeHtml(formatDate(record.created_at))}
          </div>
        </article>
      `;
    }).join("");
}

setupGameSelect();

if (GAME_OPTIONS.length > 0) {
  loadRecords(GAME_OPTIONS[0].id);
}