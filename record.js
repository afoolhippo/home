const SUPABASE_URL =
  "https://gmncxnybsovlallxgnkd.supabase.co";

const SUPABASE_ANON_KEY =
  "sb_publishable_ly3h5OhL8HDSHhYdmJq_Fw_9pG3mhla";

const kabaDb =
  supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );

const recordList =
  document.getElementById("recordList");

function escapeHtml(text) {

  return String(text ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(dateString) {

  const date =
    new Date(dateString);

  return `
    ${date.getFullYear()}
    /
    ${String(date.getMonth() + 1).padStart(2, "0")}
    /
    ${String(date.getDate()).padStart(2, "0")}
    ${String(date.getHours()).padStart(2, "0")}
    :
    ${String(date.getMinutes()).padStart(2, "0")}
  `.replace(/\s+/g, " ");
}

async function loadRecords() {

  const { data, error } =
    await kabaDb
      .from("kaba_scores")
      .select("*")
      .order(
        "created_at",
        { ascending: false }
      )
      .limit(100);

  if (error) {

    console.error(error);

    recordList.innerHTML = `
      <div class="loading-card">
        記録を読み込めませんでした
      </div>
    `;

    return;
  }

  if (!data || data.length === 0) {

    recordList.innerHTML = `
      <div class="loading-card">
        まだ記録がありません
      </div>
    `;

    return;
  }

  recordList.innerHTML =
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

        <div class="record-date">
          ${formatDate(record.created_at)}
        </div>

      </div>

    `).join("");
}

loadRecords();