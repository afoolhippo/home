const SEARCH_GENRES = Object.freeze([
  "アクション",
  "反射神経",
  "タイミング",
  "回避",
  "対戦",
  "落ち物",
  "横スクロール",
  "パズル",
  "クイズ・観察",
  "音ゲー",
  "ADV",
  "RPG風"
]);

if (!Array.isArray(window.GAME_CATALOG)) {
  throw new Error(
    "GAME_CATALOGを読み込めません。game-catalog.jsをsearch.jsより先に読み込んでください。"
  );
}

const publishedGames = window.GAME_CATALOG.filter(
  game => game.status === "公開済"
);

const genreButtons =
  document.getElementById("genreButtons");

const showAllBtn =
  document.getElementById("showAllBtn");

const resultSection =
  document.getElementById("resultSection");

const resultTitle =
  document.getElementById("resultTitle");

const resultGrid =
  document.getElementById("resultGrid");

function escapeHtml(text) {
  return String(text ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function clearActiveButtons() {
  document
    .querySelectorAll(".genre-btn, .show-all-btn")
    .forEach(button => {
      button.classList.remove("active");
      button.setAttribute("aria-pressed", "false");
    });
}

function activateButton(button) {
  clearActiveButtons();
  button.classList.add("active");
  button.setAttribute("aria-pressed", "true");
}

function createResultCard(game) {
  const card = document.createElement("a");

  card.className = "result-card";
  card.href = game.url;
  card.setAttribute("aria-label", `${game.title}で遊ぶ`);

  card.innerHTML = `
    <img
      src="${escapeHtml(game.image)}"
      alt="${escapeHtml(game.title)}"
      loading="lazy"
    >
  `;

  return card;
}

function showResults(games, title) {
  resultTitle.textContent = `${title}（${games.length}本）`;
  resultGrid.innerHTML = "";

  if (games.length === 0) {
    resultGrid.innerHTML = `
      <p class="empty-result">
        このジャンルのゲームは<br>
        まだ準備中です
      </p>
    `;
  } else {
    games.forEach(game => {
      resultGrid.appendChild(createResultCard(game));
    });
  }

  resultSection.classList.remove("hidden");
  resultSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function selectGenre(genre, button) {
  activateButton(button);

  const matchingGames = publishedGames.filter(
    game => game.genre === genre
  );

  showResults(matchingGames, genre);
}

function setupGenreButtons() {
  SEARCH_GENRES.forEach(genre => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "genre-btn";
    button.textContent = genre;
    button.setAttribute("aria-pressed", "false");

    button.addEventListener("click", () => {
      selectGenre(genre, button);
    });

    genreButtons.appendChild(button);
  });
}

showAllBtn.addEventListener("click", () => {
  activateButton(showAllBtn);
  showResults(publishedGames, "すべてのゲーム");
});

setupGenreButtons();
