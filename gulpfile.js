const gulp = require("gulp");
const sass = require("gulp-sass");
const csso = require("gulp-csso");
const fileinclude = require("gulp-file-include");
const browserSync = require("browser-sync");

function style(done) {
  gulp
    .src("./src/scss/style.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(csso())
    .pipe(gulp.dest("./src/css"))
    .pipe(browserSync.reload({ stream: true }));
  done();
}

function watch() {
  gulp.watch("./src/scss/**/*", style);
}
function serve() {
  browserSync.init({
    server: {
      baseDir: "./src",
    },
  });
}

gulp.task("default", gulp.parallel(serve, style, watch));
