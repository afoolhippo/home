/**
 * カバゲーセン共通ゲーム台帳（公開済みゲーム）
 *
 * トップページ・ゲーム検索機・ランキングページから共通で利用する。
 * ゲームの追加・公開状態・フロア・分類・ランキング設定は、この配列で管理する。
 */
const GAME_CATALOG = Object.freeze([
  {
    no: 1,
    title: "バカなカバの大冒険",
    status: "公開済",
    floor: "放課後ゲーム",
    genre: "RPG風",
    url: "https://afoolhippo.github.io/hippogame/",
    image: "./assets/images/games/game1.png",
    rankingEnabled: false,
    supabaseId: null
  },
  {
    no: 2,
    title: "みんなでそっか！",
    status: "公開済",
    floor: "キッズゲーム",
    genre: "音ゲー",
    url: "https://afoolhippo.github.io/game2/",
    image: "./assets/images/games/game2.png",
    rankingEnabled: true,
    supabaseId: "game2"
  },
  {
    no: 3,
    title: "がめ煮ソウル",
    status: "公開済",
    floor: "フードコート",
    genre: "落ち物",
    url: "https://afoolhippo.github.io/game3/",
    image: "./assets/images/games/game3.png",
    rankingEnabled: true,
    supabaseId: "game3"
  },
  {
    no: 4,
    title: "ポキポキきゅうり",
    status: "公開済",
    floor: "フードコート",
    genre: "タイミング",
    url: "https://afoolhippo.github.io/game4/",
    image: "./assets/images/games/game4.png",
    rankingEnabled: true,
    supabaseId: "game4"
  },
  {
    no: 5,
    title: "BABY BABY BAMBOO",
    status: "公開済",
    floor: "キッズゲーム",
    genre: "反射神経",
    url: "https://afoolhippo.github.io/game5/",
    image: "./assets/images/games/game5.png",
    rankingEnabled: true,
    supabaseId: "game5"
  },
  {
    no: 6,
    title: "二日酔いロード",
    status: "公開済",
    floor: "ドリンクバー",
    genre: "アクション",
    url: "https://afoolhippo.github.io/game6/",
    image: "./assets/images/games/game6.png",
    rankingEnabled: false,
    supabaseId: null
  },
  {
    no: 7,
    title: "FISHING BOY",
    status: "公開済",
    floor: "キッズゲーム",
    genre: "クイズ・観察",
    url: "https://afoolhippo.github.io/game7/",
    image: "./assets/images/games/game7.png",
    rankingEnabled: false,
    supabaseId: null
  },
  {
    no: 8,
    title: "はみがきしようぜ！",
    status: "公開済",
    floor: "キッズゲーム",
    genre: "アクション",
    url: "https://afoolhippo.github.io/game8/",
    image: "./assets/images/games/game8.png",
    rankingEnabled: true,
    supabaseId: "game8"
  },
  {
    no: 9,
    title: "苗字苗字yeah",
    status: "公開済",
    floor: "キッズゲーム",
    genre: "クイズ・観察",
    url: "https://afoolhippo.github.io/game9/",
    image: "./assets/images/games/game9.png",
    rankingEnabled: true,
    supabaseId: "game9"
  },
  {
    no: 10,
    title: "サルトリイバラ",
    status: "公開済",
    floor: "キッズゲーム",
    genre: "横スクロール",
    url: "https://afoolhippo.github.io/game10/",
    image: "./assets/images/games/game10.png",
    rankingEnabled: false,
    supabaseId: null
  },
  {
    no: 11,
    title: "タポタポオレンジ",
    status: "公開済",
    floor: "ドリンクバー",
    genre: "タイミング",
    url: "https://afoolhippo.github.io/game11/",
    image: "./assets/images/games/game11.png",
    rankingEnabled: false,
    supabaseId: null
  },
  {
    no: 12,
    title: "テトリスコーヒー",
    status: "公開済",
    floor: "ドリンクバー",
    genre: "落ち物",
    url: "https://afoolhippo.github.io/game12/",
    image: "./assets/images/games/game12.png",
    rankingEnabled: true,
    supabaseId: "game12"
  },
  {
    no: 13,
    title: "ジャニーメリージュリー",
    status: "公開済",
    floor: "放課後ゲーム",
    genre: "タイミング",
    url: "https://afoolhippo.github.io/game13/",
    image: "./assets/images/games/game13.png",
    rankingEnabled: true,
    supabaseId: "game13"
  },
  {
    no: 14,
    title: "カバファイト",
    status: "公開済",
    floor: "放課後ゲーム",
    genre: "対戦",
    url: "https://afoolhippo.github.io/game14/",
    image: "./assets/images/games/game14.png",
    rankingEnabled: false,
    supabaseId: null
  },
  {
    no: 15,
    title: "放課後カバメモリアル",
    status: "公開済",
    floor: "放課後ゲーム",
    genre: "ADV",
    url: "https://afoolhippo.github.io/game15/",
    image: "./assets/images/games/game15.png",
    rankingEnabled: false,
    supabaseId: null
  },
  {
    no: 16,
    title: "石炭掘って",
    status: "公開済",
    floor: "キッズゲーム",
    genre: "アクション",
    url: "https://afoolhippo.github.io/game16/",
    image: "./assets/images/games/game16.png",
    rankingEnabled: true,
    supabaseId: "game16"
  },
  {
    no: 17,
    title: "夕暮れメダル",
    status: "公開済",
    floor: "実験場",
    genre: "アクション",
    url: "https://afoolhippo.github.io/game17/",
    image: "./assets/images/games/game17.png",
    rankingEnabled: false,
    supabaseId: null
  },
  {
    no: 18,
    title: "庭師 de カット",
    status: "公開済",
    floor: "キッズゲーム",
    genre: "アクション",
    url: "https://afoolhippo.github.io/game18/",
    image: "./assets/images/games/game18.png",
    rankingEnabled: true,
    supabaseId: "game18"
  },
  {
    no: 19,
    title: "箱太郎伝説",
    status: "公開済",
    floor: "フードコート",
    genre: "アクション",
    url: "https://afoolhippo.github.io/game19/",
    image: "./assets/images/games/game19.png",
    rankingEnabled: true,
    supabaseId: "game_hakotarou"
  },
  {
    no: 21,
    title: "UFOを見た！",
    status: "公開済",
    floor: "キッズゲーム",
    genre: "反射神経",
    url: "https://afoolhippo.github.io/game21/",
    image: "./assets/images/games/game21.png",
    rankingEnabled: true,
    supabaseId: "game21"
  },
  {
    no: 22,
    title: "うぱっち",
    status: "公開済",
    floor: "実験場",
    genre: "クイズ・観察",
    url: "https://afoolhippo.github.io/game22/",
    image: "./assets/images/games/game22.png",
    rankingEnabled: false,
    supabaseId: null
  },
  {
    no: 24,
    title: "セコムボーイ",
    status: "公開済",
    floor: "実験場",
    genre: "アクション",
    url: "https://afoolhippo.github.io/game24/",
    image: "./assets/images/games/game24.png",
    rankingEnabled: false,
    supabaseId: null
  },
  {
    no: 25,
    title: "雨漏り 酒盛り",
    status: "公開済",
    floor: "実験場",
    genre: "音ゲー",
    url: "https://afoolhippo.github.io/game25/",
    image: "./assets/images/games/game25.png",
    rankingEnabled: false,
    supabaseId: null
  },
  {
    no: 26,
    title: "カメカメライフ",
    status: "公開済",
    floor: "実験場",
    genre: "横スクロール",
    url: "https://afoolhippo.github.io/game26/",
    image: "./assets/images/games/game26.png",
    rankingEnabled: false,
    supabaseId: null
  },
  {
    no: 27,
    title: "ホームパーティー",
    status: "公開済",
    floor: "実験場",
    genre: "音ゲー",
    url: "https://afoolhippo.github.io/game27/",
    image: "./assets/images/games/game27.png",
    rankingEnabled: false,
    supabaseId: null
  },
  {
    no: 29,
    title: "Wifiないと生きていけない",
    status: "公開済",
    floor: "キッズゲーム",
    genre: "アクション",
    url: "https://afoolhippo.github.io/game29/",
    image: "./assets/images/games/game29.png",
    rankingEnabled: true,
    supabaseId: "game29"
  }
]);

window.GAME_CATALOG = GAME_CATALOG;
