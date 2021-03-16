# Quiz Projection Supporter Advanced

オフライン早押しクイズ大会での問題フォロー業務補助アプリ  
（2021年新バージョン）

## これはなに？

Quiz Projection Supporter Advancedは、
オフラインで開催される早押しクイズ大会で観客に対して問題文と解答を投影する専用の画面を提供し、
問題フォロー業務を補助するアプリです。

旧バージョンは[こちら](https://github.com/nano-nano/quiz_projection_supporter) ※アーカイブです

## 主な機能

本プログラムには次の機能があります。

 - 問題文・解答・別解を表示する投影画面と、それを制御するメイン画面を提供します
 - 投影する問題を指定フォーマットのExcelファイル（パスワード付きも含む）から取り込んで使用できます
 - ボタンでの表示候補送り/戻しや、問題に指定されたIDを利用した表示候補選択ができます
 - 投影画面のフォントサイズ・色・問題文と解答の境界位置を自由に設定することができます

## 使い方

（準備中。Wikiに掲載予定）

## ライセンス

プログラム本体については [MIT License](https://github.com/tcnksm/tool/blob/master/LICENCE) です。

サンプル問題データ（quiz_sample_from_STU.xlsx）については、
学生向けクイズ大会「STU XX」実行委員会 https://www.stu-vwx-union.com/ より許可を得て収録したものであり、
改変ならびに再配布はできません。

## 作者

Nano-Nano
[@nano2_aloerina](https://twitter.com/nano2_aloerina)

---

## 開発者向け情報

### 開発ツールのバージョン

- Yarn: v1.22.4
- node.js: v14.15.3
- npm: v6.14.9
- Vue CLI: v4.5.11

- Vue CLI Plugin Electron Builder: v2.0.0-rc.6
- Electron: v11.3.0

### 各種コマンド

``` bash
# 依存関係のインストール
$ yarn install

# 開発用モードで起動
$ yarn electron:serve

# リリース用ビルド
$ yarn electron:build
```