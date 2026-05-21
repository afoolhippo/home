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
*/
const GAME_OPTIONS = [
  {
    id: "game8",
    title: "はみがきしようぜ",
    icon: "🪥"
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
      game.title;

    option.textContent =
      game.title;

    gameSelect.appendChild(option);
  });

  gameSelect.addEventListener(
    "change",
    () => {
      loadRanking(gameSelect.value);
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

async function loadRanking(gameTitle) {
  rankingList.innerHTML = `
    <div class="loading-card">
      記録を読み込み中...
    </div>
  `;

  const currentGame =
    GAME_OPTIONS.find(
      game => game.title === gameTitle
    );

  rankingTitle.textContent =
    `${currentGame?.icon ?? "🏆"} ${gameTitle} ランキング`;

  const { data, error } = await kabaDb
    .from("kaba_scores")
    .select("*")
    .eq("game_title", gameTitle)
    .order("score", { ascending: false })
    .limit(30);

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

  rankingList.innerHTML =
    data.map((record, index) => {
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
  loadRanking(GAME_OPTIONS[0].title);
}