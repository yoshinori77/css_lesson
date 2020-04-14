// [common] gulp本体
const gulp = require('gulp');
// [common] エラーが原因でタスクが強制停止することを防止
const plumber = require('gulp-plumber');
// [common] デスクトップ通知用モジュール
const notify = require("gulp-notify");
// [common] ファイルをリネームすることができるプラグイン
const rename = require('gulp-rename');
// [common] Gulpで文字列置換
const replace = require('gulp-replace');
// [sass] gulp sass
const sass = require('gulp-sass');
// [sass] Sassで分割したファイルimport
const sassGlob = require('gulp-sass-glob');
// [css] POSTCSS本体
const gulpPostcss = require('gulp-postcss');
// [css] POST CSSの並び替えプラグイン
const cssDeclarationSorter = require('css-declaration-sorter');
// [css] CSSベンダープレフィックス追加
const autoprefixer = require('autoprefixer');
// [css] css内のキャッシュ対策用　（なんだか2回目のgulpで動かない、、。）
// const cachebuster = require('postcss-cachebuster');
// [js] JSを min化
// const uglify = require('gulp-uglify');
// [css] CSS用ソースマップ作成
const gulpSourcemaps = require('gulp-sourcemaps');
// [css]CSSの先頭に@charset "UTF-8";を追加
const header = require('gulp-header');
//
const paths = {
  root: '',
  html: {
    src: './**/*.html',
    dest: '.',
  },
  styles: {
    src: '_scss/**/*.scss',
    dest: 'assets/css',
    map: './map',
  },
  scripts: {
    // src: './src/js/**/*.js',
    // jsx: './src/js/**/*.jsx',
    // dest: './assets/js',
    // map: '/assets/js',
    // core: 'src/js/core/**/*.js',
    // app: 'src/js/app/**/*.js',
  },
  images: {
    src: 'assets/img/**/*.{jpg,jpeg,png,svg,gif}',
    dest: 'assets/img',
  },
  watch: {
    sass: './_scss/**/*.scss',
  },
};

// browser sync
function browserSyncFunc(done) {
  // 今後育てる予定
  // mamp を使って PHPのプレビューも実装
}

// sass
function sassFunc() {
  return gulp
    .src(paths.styles.src, {})
    .pipe(gulpSourcemaps.init())
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    //分割ファイルを結合
    .pipe(sassGlob())
    .pipe(replace(/@charset "UTF-8";/g, ''))
    .pipe(header('@charset "UTF-8";\n\n'))
    //sassの展開
    .pipe(sass({
      // CSS output style (nested | expanded | compact | compressed)
      outputStyle: 'compressed',
      // 
      // indentWidth: 1,
      //(tab | space)
      // indentType: 'space',
    }))
    .pipe(gulpPostcss(
      [
        
        cssDeclarationSorter({
          //「sass」の後に指定
          order: 'alphabetically'
          // alphobetically アルファベット順に
          // smacss SMACSSが定義するレイアウトに最も重要な順に
          // concentric-css Concentric CSSが提唱するボックスモデルの外側から内側の順に
        }),
        autoprefixer({
          // grid: true 
        })

      ]
    ))
    .pipe(
      rename({
        suffix: '.min',
      })
    )
    .pipe(gulpSourcemaps.write(paths.styles.map))
    .pipe(gulp.dest(paths.styles.dest), {})
}

// js
function jsFunc() {
  // 今後育てる予定
  // JSの圧縮　コードチェックなど
}

// img
function imgFunc() {
  // 今後育てる予定
  // 画像圧縮　最適化など
}



// watch
function watchFunc(done) {
  gulp.watch(paths.watch.sass, gulp.parallel(sassFunc));
  done();
}

// scripts tasks
gulp.task('default',
  gulp.parallel(
    // browserSyncFunc, watchFunc, cssFunc, jsFunc, imgFunc
    watchFunc, sassFunc
  )
);