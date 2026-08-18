# カバゲーセン 運用README

このREADMEは、カバゲーセンへ新しいゲームを追加・公開するときの運用手順をまとめたものです。

## 1. 基本方針

ゲーム情報は、次の2つで管理します。

| 管理対象 | 役割 |
|---|---|
| Excelのゲーム台帳 | 全ゲームの管理元。未公開・制作中を含む正式な一覧 |
| `assets/js/game-catalog.js` | Webサイトが実際に読み込むゲーム情報 |

原則として、Excel台帳を先に更新し、その内容を`game-catalog.js`へ反映します。

`game-catalog.js`へ手動で追加しても問題ありません。ただし、Excelへ後から書き戻さないと内容がずれるため、緊急時以外は「Excel → game-catalog.js」の順番にします。

## 2. 現在の主なファイル構成

```text
home/
├─ index.html
├─ search.html
├─ record.html
├─ README.md
│
└─ assets/
   ├─ css/
   │  ├─ home.css
   │  ├─ search.css
   │  └─ record.css
   │
   ├─ images/
   │  ├─ games/
   │  │  └─ game○○.png
   │  └─ site/
   │     ├─ main-visual.png
   │     ├─ manager.png
   │     ├─ profile.png
   │     └─ search-machine.png
   │
   └─ js/
      ├─ game-catalog.js
      ├─ supabase-client.js
      ├─ home.js
      ├─ search.js
      └─ record.js
```

コードファイルをChatGPTから受け取るときは、ダウンロードしやすいように末尾へ`.txt`を付けます。

例：

```text
game-catalog.js.txt → 配置時は game-catalog.js
home.css.txt        → 配置時は home.css
index.html.txt      → 配置時は index.html
README.md.txt       → 配置時は README.md
```

## 3. 使用できる分類

### フロア

`floor`には、次のいずれかを完全一致で入力します。

```text
キッズゲーム
放課後ゲーム
フードコート
ドリンクバー
実験場
```

### ジャンル

`genre`には、次のいずれかを完全一致で入力します。

```text
アクション
反射神経
タイミング
回避
対戦
落ち物
横スクロール
パズル
クイズ・観察
音ゲー
ADV
RPG風
```

表記が異なると、フロア一覧やゲーム検索機へ正しく表示されません。

## 4. `game-catalog.js`の1ゲーム分の形式

ランキングなし：

```js
{
  no: 30,
  title: "ゲーム名",
  status: "未公開",
  floor: "キッズゲーム",
  genre: "アクション",
  url: "https://afoolhippo.github.io/game30/",
  image: "./assets/images/games/game30.png",
  rankingEnabled: false,
  supabaseId: null
}
```

ランキングあり：

```js
{
  no: 30,
  title: "ゲーム名",
  status: "未公開",
  floor: "キッズゲーム",
  genre: "アクション",
  url: "https://afoolhippo.github.io/game30/",
  image: "./assets/images/games/game30.png",
  rankingEnabled: true,
  supabaseId: "game30"
}
```

### 各項目の意味

| 項目 | 内容 |
|---|---|
| `no` | 管理番号。既存のゲーム番号を使い、欠番を詰めない |
| `title` | サイトに表示する正式なゲーム名 |
| `status` | `未公開`または`公開済` |
| `floor` | 5フロアのいずれか |
| `genre` | 12ジャンルのいずれか |
| `url` | 公開先のGitHub Pages URL |
| `image` | トップ用タイトル画像のパス |
| `rankingEnabled` | ランキングを使う場合は`true` |
| `supabaseId` | ゲームがSupabaseへ送る`game_id`。ランキングなしは`null` |

`no`やフォルダ名は、途中に欠番があっても振り直しません。既存のGitHub URLを優先します。

## 5. 未公開ゲームを先に登録する方法

未公開ゲームも`game-catalog.js`へ登録できます。

```js
status: "未公開"
```

と設定したゲームは、次の場所には表示されません。

- トップページのフロア一覧
- 店長おすすめ
- ランダム
- ゲーム検索機
- ランキングのゲーム選択肢

このため、公開準備中のゲームを先に登録しても問題ありません。

ただし、JavaScriptの構文エラーはサイト全体へ影響します。追加後は必ず動作確認します。

## 6. 新しいゲームを追加するときの推奨手順

### 準備段階

1. Excel台帳へゲーム情報を入力する
2. ゲームのGitHubフォルダ名とURLを確定する
3. フロアとジャンルを決める
4. ランキングの有無を決める
5. タイトル画像を`5:4`で用意する
6. `game-catalog.js`へ`status: "未公開"`で追加する

### 公開段階

1. ゲーム本体をGitHub Pagesへアップロードする
2. ゲームのURLを直接開き、遊べることを確認する
3. タイトル画像を次へ配置する

```text
assets/images/games/game○○.png
```

4. `game-catalog.js`のURL・画像パス・分類を再確認する
5. ランキングありの場合は、ゲーム本体から送る`game_id`と`supabaseId`が一致するか確認する
6. 最後に次の1行を変更する

```js
status: "未公開"
```

変更後：

```js
status: "公開済"
```

7. `index.html`のお知らせを更新する
8. GitHubへ反映して動作確認する

ゲーム本体より先に`公開済`へ変更すると、まだ遊べないリンクがトップに表示されます。`公開済`への変更は最後に行います。

## 7. `game-catalog.js`へ手動追加する方法

`assets/js/game-catalog.js`を開き、配列末尾の次の部分を探します。

```js
]);

window.GAME_CATALOG = GAME_CATALOG;
```

最後のゲームと`]);`の間へ、新しいゲーム情報を追加します。

追加前の最後のゲームの閉じかっこには、カンマが必要です。

```js
  },
  {
    no: 30,
    title: "ゲーム名",
    status: "未公開",
    floor: "キッズゲーム",
    genre: "アクション",
    url: "https://afoolhippo.github.io/game30/",
    image: "./assets/images/games/game30.png",
    rankingEnabled: false,
    supabaseId: null
  }
]);
```

### 手動編集時の注意

- 文字列は半角の`"`で囲む
- 各項目の末尾にカンマを付ける
- 1つ前のゲームとの間にもカンマを付ける
- `true`、`false`、`null`は引用符で囲まない
- `公開済`、フロア、ジャンルは決められた表記と完全一致させる
- ゲーム番号を並べ替えたり欠番を詰めたりしない
- 同じ`no`、URL、画像パス、`supabaseId`を重複させない

## 8. ランキングありのゲームを追加するとき

ランキングなしの場合：

```js
rankingEnabled: false,
supabaseId: null
```

ランキングありの場合：

```js
rankingEnabled: true,
supabaseId: "game30"
```

ランキングありにする前に、次を確認します。

1. ゲーム本体がSupabaseへスコアを送信できる
2. 送信する`game_id`と`supabaseId`が完全一致している
3. ニックネーム、スコア、称号、ゲーム名が保存される
4. `record.html`で対象ゲームを選択できる
5. 順位が正しい順で表示される

ランキング処理が未完成の場合は、先にゲームだけ公開し、次の設定にしておきます。

```js
rankingEnabled: false,
supabaseId: null
```

完成後に`true`へ変更できます。

## 9. ゲーム追加のお知らせを更新する方法

現在のお知らせは、`index.html`へ直接記載しています。

`index.html`内で次を検索します。

```html
📢 おしらせ
```

その下にある更新履歴へ、新しいゲームを一番上に追加します。

例：

```html
<span class="news-new">
  NEW!
</span><br>
2026.8.19 新しいゲーム 追加！<br>
2026.8.04 石炭掘って 追加！<br>
2026.8.04 庭師deカット 追加！<br>
```

### お知らせ更新のルール

- 日付は`YYYY.M.D`形式にする
- 新しいお知らせを一番上へ追加する
- ゲーム名は`game-catalog.js`の`title`と合わせる
- 表示は最新5件程度にする
- 6件目以降は削除してよい
- `NEW!`は最新のお知らせの上に1つだけ表示する

お知らせは`game-catalog.js`から自動生成されません。ゲームを公開したときは、`status`の変更と`index.html`の更新をセットで行います。

## 10. 公開後の動作確認

### トップページ

- 新しいゲームが指定フロアへ表示される
- タイトル画像が表示される
- 画像を押すと正しいゲームへ移動する
- 店長おすすめに出ても正しく移動する
- ランダムから選ばれても正しく移動する
- お知らせの日付とゲーム名が正しい

### ゲーム検索機

- 指定ジャンルを押すと新しいゲームが表示される
- 「すべて見る」にも表示される
- 別ジャンルへ誤表示されない

### ランキングありの場合

- ランキング選択肢へゲーム名が追加される
- スコアを投稿できる
- 投稿後にランキングへ反映される

### 共通確認

- PCで`Ctrl + F5`を行う
- スマートフォンではシークレットタブでも確認する
- Chromeの`F12 → Console`に赤いエラーがない
- `Failed to load resource`がない

## 11. よくある不具合

| 症状 | 主な原因 |
|---|---|
| 新しいゲームが表示されない | `status`が`未公開`、または表記違い |
| すべてのゲームが消えた | `game-catalog.js`のカンマ・かっこなどの構文エラー |
| 画像だけ表示されない | ファイル名、階層、大文字小文字の違い |
| 違うフロアに表示される | `floor`の入力違い |
| 検索結果に出ない | `genre`の入力違い |
| ランキングに出ない | `rankingEnabled`または`supabaseId`の設定違い |
| リンク先が404になる | URLまたはGitHubフォルダ名の違い |
| 修正したのに変わらない | GitHub Pagesの反映待ち、ブラウザキャッシュ |

## 12. 問題が起きたときの戻し方

1. 直前に追加したゲーム情報だけを`game-catalog.js`から外す
2. または、そのゲームを次へ戻す

```js
status: "未公開"
```

3. GitHubへ再反映する
4. `Ctrl + F5`で確認する

表示上の問題だけであれば、`未公開`へ戻すことでトップ・検索・ランキングから安全に外せます。

## 13. 毎回の簡易チェックリスト

```text
□ Excel台帳を更新した
□ ゲーム本体のURLを確認した
□ タイトル画像を配置した
□ game-catalog.jsへ追加した
□ フロアとジャンルを確認した
□ ランキング設定を確認した
□ statusを公開済へ変更した
□ index.htmlのお知らせを更新した
□ トップからゲームを開いた
□ 検索ページからゲームを開いた
□ Consoleに赤いエラーがない
```

## 14. おすすめの運用

通常は、次の流れに統一します。

```text
Excel台帳へ登録
↓
game-catalog.jsへ未公開で追加
↓
ゲーム本体と画像を公開
↓
リンク・ランキングを確認
↓
statusを公開済へ変更
↓
index.htmlのお知らせを更新
↓
トップ・検索・ランキングを確認
```

この順番なら、公開前のゲームが誤って表示されにくく、トップページと検索ページの二重入力も発生しません。
