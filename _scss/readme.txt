■scssディレクトリ構造（ベース）
_scss
├ _foundation …基盤となる各種設定を記述したscssを格納
｜ ├ _reset.scss …ブラウザ準拠の標準styleをresetする記述を集約
｜ ├ _include.scss …fontやライブラリ（_libs）などのインクルードを記述
｜ ├ _variables.scss …よく使用するstyleを変数化し、ここに集約
｜ └ _mixin.scss …よく使用するstyleを関数化（mixin）し、ここに集約
├ _common …サイト共通のmoduleを格納 （※1）
｜ ├ _base.scss …サイト全体に共通するstyleを記述（ヘッダー、フッター等）
｜ └ _content.scss …コンテンツ部分の共通styleを記述（ページtitle、ブロック構成など）
├ _block …ページ固有のmoduleを格納 （※2）
｜ ├ _news.scss …NEWSページ固有のmoduleを記述（例）
｜ ├ _modal.scss …modal用のmoduleを記述（例）
｜ └ _hogehoge.scss …上の例のように、固有のmoduleがあるhoge分だけscssを作成する
├ _libs …ライブラリのscssを使用する場合はここに格納
└ style.scss …コンパイル用。各種scssをimport （※3）


SASS - SCSS構造設計・記法

※1 サイト規模が小さくコンパクトに済む場合は、_base.scssに集約する。
※2 サイト規模が小さくコンパクトに済む場合は、_top.scss、_page.scssのように、top以外のmodulesはひとまとめにして管理コストを減らしても良い。scss内にコメントアウトで各moduleのindexを付けること。
※3 読み込む順は「_foundation」「_libs」「_common」「_block」とする。