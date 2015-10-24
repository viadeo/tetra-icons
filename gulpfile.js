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
  html: 'lib/templates/*.html'
};

const DIST = {
  root: 'dist/',
  fonts: 'dist/fonts',
  css: 'dist/css',
  scss: 'dist/scss',
  html: 'dist'
};

// -----------------------------------------------------------------------------
// Iconfont
// -----------------------------------------------------------------------------

gulp.task('iconfont', function () {

  // Localisation des fichiers SVG
  gulp.src(LIB.svg)
    // Appel du module générant la police d'icône
    .pipe(iconfont({
    // Nom de la police
    fontName: FONT.name
    // Calcule des dimensions du glyphe et centrage
    , centerHorizontally: true
    // Normalisation des icônes par mise à l'échelle
    // par rapport à la taille de l'icône la plus grande
    , normalize: true
    // Assigne un unicode à chaque icône pour les utiliser dans du CSS
    , appendUnicode: true
    , timestamp: runTimestamp // recommended to get consistent builds when watching files
    // If some font glyphs aren't converted properly you should append the normalize:true option and a fontHeight greater than 1000 (fontHeight: 1001).
    // , fontHeight: 1001
    }))

    // Appel du module générant le CSS
    .on('glyphs', function (glyphs) {
      // Localisation du template SASS
      gulp.src('lib/scss/templates/_viadeoicons.scss')
        // Appel du moteur de template
        .pipe(consolidate('lodash', {
          // Code points présent dans la propriété CSS "content"
          glyphs: glyphs
          // Nom de la police
        , fontName: FONT.name
        // Chemin des fichiers de police
        , fontPath: FONT.path
        // Nom de la classe principale, commune à tous les icônes
        , className: FONT.className
        }))
        // Destination du fichier SASS qui sera ensuite générer en CSS
        .pipe(gulp.dest(LIB.root+'scss'))
        .pipe(gulp.dest(DIST.scss));

        // Localisation du template HTML
        gulp.src(LIB.html)
          // Appel du moteur de template
          .pipe(consolidate('lodash', {
            glyphs: glyphs
          , className: FONT.className
          }))
          .pipe(gulp.dest(DIST.root));

    })

    // Destination des fichiers de police
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
