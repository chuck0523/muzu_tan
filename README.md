# このレポジトリについて

 Twitter上Botのソースコード置き場.
 Herekuと連動. CircleCIでテスト.

# 機能

## 4択問題

4択問題を定刻ツイート。およびリプライによる回答への正誤判定。
また、空メンションを送ることで、いつでも4択を出題。

## 自動フォロー

英語勉強中ユーザを検索して、フォロー。


## 自動フォローバック

被フォロー時に自動フォローバック。

## 漸次アンフォロー

もはやフォローされていないユーザーを漸次アンフォロー。

# 技術的選択

- Node.js
- [Express](https://expressjs.com/)
- [node-twitter](https://github.com/desmondmorris/node-twitter)
- [google-translate-api](https://github.com/matheuss/google-translate-api)
- [node-cron](https://github.com/kelektiv/node-cron)
- [Jest](https://facebook.github.io/jest/)

# 参考

当Botを作成するにあたり、参考にした技術記事.

- [Node.js(Express) と Heroku で Twitter ボットを作る](http://senan.main.jp/2015/12/25/aws-lambda%E3%81%A7twitter-bot%E3%82%92%E4%BD%9C%E3%82%8B-part1/)
- [AWS LambdaでTwitter Botを作る Part1](http://qiita.com/hkusu/items/75404aefdb5f89be6b6e)
