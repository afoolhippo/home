const games = {

  floor1: {
    id: "floor1",

    title: "🍭 1F キッズゲーム",

    desc:
      "みんなでワイワイ遊べる、にぎやかなゲームフロア。",

    className: "floor-1",

    featured: "FISHING BOY",

    items: [

      {
        title: "ポキポキきゅうり",
        image: "pokipoki.png",
        url: "https://afoolhippo.github.io/game4/",
        tag: "反射神経"
      },

      {
        title: "はみがきしようぜ",
        image: "hamigaki.png",
        url: "https://afoolhippo.github.io/game8/",
        tag: "退治"
      },

      {
        title: "みんなでそっか！",
        image: "sokka.png",
        url: "https://afoolhippo.github.io/game2/",
        tag: "音ゲー"
      },

      {
        title: "苗字苗字yeah",
        image: "myouji.png",
        url: "https://afoolhippo.github.io/game9/",
        tag: "カルタ"
      },

      {
        title: "BABY BABY BAMBOO",
        image: "bamboo.png",
        url: "https://afoolhippo.github.io/game5/",
        tag: "早押し"
      },

      {
        title: "サルトリイバラ",
        image: "sarutori.png",
        url: "https://afoolhippo.github.io/game10/",
        tag: "迷路"
      },

      {
        title: "FISHING BOY",
        image: "fish.png",
        url: "https://afoolhippo.github.io/game7/",
        tag: "釣り"
      }

    ]
  },

  floor2: {
    id: "floor2",

    title: "🌇 2F 放課後ゲーム",

    desc:
      "夕焼け、寄り道、放課後。ちょっと不思議なゲームコーナー。",

    className: "floor-2",

    featured: "バカなカバの大冒険",

    items: [

      {
        title: "バカなカバの大冒険",
        image: "baka-kaba.png",
        url: "https://afoolhippo.github.io/hippogame/",
        tag: "RPG"
      }

    ]
  },

  food: {
    id: "food",

    title: "🍜 フードコート",

    desc:
      "うどん、ジュース、コーヒー。お腹がすいたらこちらへ。",

    className: "floor-food",

    featured: "箱太郎伝説",

    items: [

      {
        title: "がめ煮ソウル",
        image: "gameni-soul.png",
        url: "https://afoolhippo.github.io/game3/",
        tag: "具材集め"
      },

      {
        title: "箱太郎伝説",
        image: "hakotarou.png",
        url: "https://afoolhippo.github.io/game19/",
        tag: "うどんづくり"
      }

    ]
  },

  drink: {
    id: "drink",

    title: "🥤 ドリンクバー",

    desc:
      "のみもの系ゲームはこちら。飲みすぎ注意の休憩コーナー。",

    className: "floor-drink",

    featured: "タポタポオレンジ",

    items: [

      {
        title: "テトリスコーヒー",
        image: "tetris.png",
        url: "https://afoolhippo.github.io/game12/",
        tag: "パズル"
      },

      {
        title: "タポタポオレンジ",
        image: "orange.png",
        url: "https://afoolhippo.github.io/game11/",
        tag: "我慢"
      },

      {
        title: "二日酔いロード",
        image: "futsukayoi-road.png",
        url: "https://afoolhippo.github.io/game6/",
        tag: "回避"
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

    <div class="game-tag">
      ${game.tag}
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

  const featuredGame =
    section.items.find(
      game => game.title === section.featured
    );

  if (featuredGame) {

    const featured =
      createGameCard(featuredGame);

    featured.classList.add(
      "featured-card"
    );

    const wrap =
      document.createElement("div");

    wrap.className =
      "featured-wrap";

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

  grid.className =
    "game-grid";

  section.items
    .filter(
      game =>
        game.title !== section.featured
    )
    .forEach(game => {

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

  const randomIndex =
    Math.floor(
      Math.random() * allGames.length
    );

  window.location.href =
    allGames[randomIndex].url;
}

randomBtn.addEventListener(
  "click",
  playRandomGame
);

renderFloors();