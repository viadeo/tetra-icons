// -----------------------------------------------------------------------------
// Dépendances
// -----------------------------------------------------------------------------

var gulp = require('gulp')
  , runSequence = require('run-sequence')
  , del = require('del')
  , sass = require('gulp-sass')
  , iconfont = require('gulp-iconfont')
  , consolidate = require('gulp-consolidate')
  , autoprefixer = require('gulp-autoprefixer')
  , runTimestamp = Math.round(Date.now()/1000);

const FONT = {
  name: 'viadeoicons',
  className: 'vicon',
  path: '../fonts/'
};

const LIB = {
  root: 'lib/',
  svg: 'lib/icons/**/*.svg',
  scss: 'lib/scss/**/*.scss',
  less: 'lib/scss/**/*.less',
  html: 'lib/templates/*.html'
};

const DIST = {
  root: 'dist/',
  fonts: 'dist/fonts',
  css: 'dist/css',
  scss: 'dist/scss',
  less: 'dist/less',
  html: 'dist'
};

// -----------------------------------------------------------------------------
// Iconfont
// -----------------------------------------------------------------------------

gulp.task('iconfont', function () {

  const IconfontOptions = {
    fontName: FONT.name
    , centerHorizontally: true
    , normalize: true
    , appendUnicode: true
    , timestamp: runTimestamp // recommended to get consistent builds when watching files
  };

  gulp.src(LIB.svg)
    .pipe(iconfont(IconfontOptions))
    .on('glyphs', function (glyphs) {
      const templateParams = {
          glyphs: glyphs
        , fontName: FONT.name
        , fontPath: FONT.path
        , className: FONT.className
        , timestamp: Math.round(Date.now()/1000)
      };
      gulp.src('lib/scss/templates/*.scss')
        .pipe(consolidate('lodash', templateParams))
        .pipe(gulp.dest(LIB.root+'scss'))
        .pipe(gulp.dest(DIST.scss));

        gulp.src('lib/less/templates/*.less')
          .pipe(consolidate('lodash', templateParams))
          .pipe(gulp.dest(DIST.less));

      gulp.src(LIB.html)
        .pipe(consolidate('lodash', templateParams))
        .pipe(gulp.dest(DIST.root));
    })
    .pipe(gulp.dest(DIST.fonts));
});


// -----------------------------------------------------------------------------
// Compilation SASS
// -----------------------------------------------------------------------------

gulp.task('sass', function () {

  const AUTOPREFIXER_BROWSERS = [
    'ie >= 9',
    'ie_mob >= 10',
    'last 2 Firefox versions',
    'last 2 Chrome versions',
    'last 5 Safari versions',
    'last 5 Opera versions',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

  // Localisation des fichiers SASS
  gulp.src(LIB.scss)
    // Exécution de SASS pour compilation
    .pipe(sass({indentWidth: 2, outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest(DIST.css));
});

gulp.task('clean', function () {
  return del([DIST.root+'*']);
});

gulp.task('watch', function (cb) {
  // Watch files for changes & reload
  gulp.watch(LIB.scss, ['sass']);
  gulp.watch([LIB.svg, LIB.html], ['iconfont']);
});

// -----------------------------------------------------------------------------
// Default
// -----------------------------------------------------------------------------

gulp.task('default', function (cb) {
  runSequence(
    'clean',
    'iconfont',
    'watch',
    cb
  );
});
