"use strict";

const gulp = require("gulp");
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const htmlmin = require("gulp-htmlmin");
const rigger = require('gulp-rigger');
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const minify = require('gulp-cssmin');
const notify = require("gulp-notify");
const rename = require('gulp-rename');
const terser = require('gulp-terser');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const rimraf = require('rimraf');
const sync = require("browser-sync").create(),
reload = sync.reload;


/* Path */
const sourcePath = 'source/';
const buildPath = 'build/';

var path = {
  build: {
      html: buildPath,
      js: buildPath + "js/",
      css: buildPath + "css/",
      img: buildPath + "img/",
      fonts: buildPath + "fonts/"
  },
  src: {
      html: sourcePath + "*.html",
      js: sourcePath + 'assets/js/*.js',
      style:  sourcePath + 'assets/sass/style.scss',
      img: sourcePath + 'assets/img/*.*',
      webp: sourcePath + 'assets/img/*.{jpg,png}',
      svg: sourcePath + 'assets/img/icon-*.svg',
      fonts: sourcePath + 'assets/fonts/**/*.*'
  },
  watch: {
      html: sourcePath + '/**/*.html',
      js: sourcePath + 'assets/js/**/*.js',
      style: sourcePath + 'assets/style/**/*.scss',
      img: sourcePath + 'assets/img/**/*.*',
      fonts: sourcePath + 'assets/fonts/**/*.*'
  },
  clean: "./" + buildPath
};

/* Server */

const server = (done) => {
  sync.init({
    server: {
      baseDir: "./" + buildPath
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}


/* HTML */

const html = () => {
  return gulp.src(path.src.html)
    .pipe(plumber())
    .pipe(posthtml([
      include()
    ]))
    .pipe(rigger())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(buildPath))
    .pipe(reload({stream: true}));
}


/* Styles */

const styles = () => {
  return gulp.src(path.src.style)
    .pipe(plumber(
      {
      errorHandler : function(err) {
          notify.onError({
              title:    "SCSS Error",
              message:  "Error: <%= error.message %>"
          })(err);
          this.emit('end');
      }
    }
    ))
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(
        {
          grid: true
        }
      )
    ]))
    .pipe(gulp.dest(path.build.css))
    .pipe(sourcemap.write("."))
    .pipe(minify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path.build.css))
    .pipe(sync.stream());
}


/* JS */

const js = () => {
  return gulp.src(path.src.js)
    .pipe(plumber({
      errorHandler : function(err) {
        notify.onError({
            title:    "JS Error",
            message:  "Error: <%= error.message %>"
        })(err);
        this.emit('end');
      }
    }))
    // .pipe(concat('main.js'))
    .pipe(terser())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path.build.js))
}


/* Image optimization */

const imageMin = () => {
  return gulp.src(path.src.img)
    // .pipe(imagemin([
    //   imagemin.gifsicle({interlaced: true}),
    //   imagemin.mozjpeg({quality: 95, progressive: true}),
    //   imagemin.optipng({optimizationLevel: 5}),
    //   imagemin.svgo({
    //       plugins: [
    //           { removeViewBox: true },
    //           { cleanupIDs: false }
    //       ]
    //   })
    // ]))
    .pipe(imagemin({
      interlaced: true,
      optimizationLevel: 5,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
      verbose: true
    }))
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({stream: true}));
}


/* Webp making */

const webP = () => {
  return gulp.src(path.src.webp)
    .pipe(webp({quality: 85}))
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({stream: true}));
}



/* Sprite making*/

const sprite = () => {
  return gulp.src(path.src.svg)
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest(path.build.img));
}


/* Fonts */

const fonts = () => {
  return gulp.src(path.src.fonts)
  .pipe(gulp.dest(path.build.fonts))
  .pipe(reload({stream: true}));
}


/* Clean */

const clean = (cb) => {
  rimraf(path.clean, cb);
}

/* Copy file */

// const copy = () => {
//   return gulp.src([
//     "source/assets/fonts/**/*.{woff, woff2}",
//     // "source/assets/img/**",
//     // "source/assets/js/**",
//     "source/assets/*.html"
//   ], {
//     base: "source"
//   })
//   .pipe(gulp.dest(buildPath));
// }


/* Exports Tasks */
exports.server = server;
exports.html = html;
exports.styles = styles;
exports.js = js;
exports.imageMin = imageMin;
exports.webP = webP;
exports.sprite = sprite;
exports.fonts = fonts;
exports.clean = clean;
// exports.copy = copy;


/* Build */

const build = gulp.series(
  // copy,
  html,
  js,
  // imageMin,
  // webP,
  // sprite,
  // fonts
);

exports.build = build;

/* Watcher */

const watcher = () => {
  gulp.watch(sourcePath + "assets/sass/**/*.scss", gulp.series("styles"));
  gulp.watch(sourcePath + "assets/js/**/*.js", gulp.series("js"));
  gulp.watch("source/*.html", gulp.series("build")).on("change", sync.reload);
}


exports.default = gulp.series(
  build, styles, server, watcher
);


