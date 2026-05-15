const games = {

  floor1: {
    id: "floor1",

    title: "🍭 1F キッズゲーム",

    desc:
      "はじめてでも遊びやすい、<br>明るくてにぎやかなゲームコーナー。",

    className: "floor-1",

    items: [

      {
        title: "ポキポキきゅうり",
        image: "pokipoki.png",
        url: "https://afoolhippo.github.io/game4/"
      },

      {
        title: "はみがきしようぜ",
        image: "hamigaki.png",
        url: "https://afoolhippo.github.io/game8/"
      },

      {
        title: "みんなでそっか！",
        image: "sokka.png",
        url: "https://afoolhippo.github.io/game2/"
      },

      {
        title: "苗字苗字yeah",
        image: "myouji.png",
        url: "https://afoolhippo.github.io/game9/"
      },

      {
        title: "BABY BABY BAMBOO",
        image: "bamboo.png",
        url: "https://afoolhippo.github.io/game5/"
      },

      {
        title: "がめ煮ソウル",
        image: "gameni-soul.png",
        url: "https://afoolhippo.github.io/game3/"
      },

      {
        title: "サルトリイバラ",
        image: "sarutori.png",
        url: "https://afoolhippo.github.io/game10/"
      },

      {
        title: "FISHING BOY",
        image: "fish.png",
        url: "https://afoolhippo.github.io/game7/"
      }

    ]
  },

  floor2: {
    id: "floor2",

    title: "🌇 2F 放課後ゲーム",

    desc:
      "夕方、寄り道、ちょっと変。<br>中学生気分でのぞくゲームフロア。",

    className: "floor-2",

    items: [

      {
        title: "バカなカバの大冒険",
        image: "baka-kaba.png",
        url: "https://afoolhippo.github.io/hippogame/"
      }

    ]
  },

  basement: {
    id: "basement",

    title: "🌀 実験部屋",

    desc:
      "まだ開発中。<br>いつか変な試作ゲームが置かれるかも。",

    className: "floor-b1",

    items: []
  },

  drink: {
    id: "drink",

    title: "🥤 ドリンクバー",

    desc:
      "のみもの系ゲームはこちら。<br>飲みすぎ注意の休憩コーナー。",

    className: "floor-drink",

    items: [

      {
        title: "テトリスコーヒー",
        image: "tetris.png",
        url: "https://afoolhippo.github.io/game12/"
      },

      {
        title: "タポタポオレンジ",
        image: "orange.png",
        url: "https://afoolhippo.github.io/game11/"
      },

      {
        title: "二日酔いロード",
        image: "futsukayoi-road.png",
        url: "https://afoolhippo.github.io/game6/"
      }

    ]
  }

};

const gameArea =
  document.getElementById("gameArea");

const randomBtn =
  document.getElementById("randomBtn");

function createGameCard(game) {

  const card =
    document.createElement("a");

  card.className =
    "game-card";

  card.href =
    game.url;

  card.innerHTML = `
    <img src="${game.image}" alt="${game.title}">

    <div class="game-title">
      ${game.title}
    </div>
  `;

  return card;
}

function createFloor(section) {

  const floor =
    document.createElement("section");

  floor.className =
    `floor ${section.className}`;

  floor.id =
    section.id;

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

  if (section.items.length === 0) {

    const comingSoon =
      document.createElement("div");

    comingSoon.className =
      "coming-soon";

    comingSoon.textContent =
      "COMING SOON";

    floor.appendChild(comingSoon);

    return floor;
  }

  const grid =
    document.createElement("div");

  grid.className =
    "game-grid";

  section.items.forEach(game => {

    grid.appendChild(
      createGameCard(game)
    );

  });

  floor.appendChild(grid);

  return floor;
}

function renderFloors() {

  gameArea.innerHTML = "";

  Object.values(games)
    .forEach(section => {

      gameArea.appendChild(
        createFloor(section)
      );

    });

}

function getAllGames() {

  return Object.values(games)
    .flatMap(section => section.items);

}

function playRandomGame() {

  const allGames =
    getAllGames();

  if (allGames.length === 0) {
    return;
  }

  const randomIndex =
    Math.floor(
      Math.random() * allGames.length
    );

  window.location.href =
    allGames[randomIndex].url;
}

if (randomBtn) {

  randomBtn.addEventListener(
    "click",
    playRandomGame
  );

}

renderFloors();