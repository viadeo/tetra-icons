// -----------------------------------------------------------------------------
// Dépendances
// -----------------------------------------------------------------------------

var gulp = require('gulp')
  , sass = require('gulp-sass')
  , iconfont = require('gulp-iconfont')
  , consolidate = require('gulp-consolidate')
  , autoprefixer = require('gulp-autoprefixer')
  , runTimestamp = Math.round(Date.now()/1000);

// -----------------------------------------------------------------------------
// Iconfont
// -----------------------------------------------------------------------------

gulp.task('iconfont', function () {

  // Localisation des fichiers SVG
  gulp.src('icons/**/*.svg')

    // Appel du module générant la police d'icône
    .pipe(iconfont({

      // Nom de la police
      fontName: 'viadeoicons'

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
      gulp.src('scss/templates/_icons.scss')
        // Appel du moteur de template
        .pipe(consolidate('lodash', {
          // Code points présent dans la propriété CSS "content"
          glyphs: glyphs
          // Nom de la police
        , fontName: 'viadeoicons'
        // Chemin des fichiers de police
        , fontPath: '../fonts/viadeoicons/'
        // Nom de la classe principale, commune à tous les icônes
        , className: 'vicon'
        }))
        // Destination du fichier SASS qui sera ensuite générer en CSS
        .pipe(gulp.dest('scss'));

        // Localisation du template HTML
        gulp.src('./templates/*.html')
          // Appel du moteur de template
          .pipe(consolidate('lodash', {
            glyphs: glyphs
          , className: 'vicon'
          }))
          .pipe(gulp.dest('.'));

    })

    // Destination des fichiers de police
    .pipe(gulp.dest('fonts/viadeoicons'));
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
  gulp.src('scss/**/*.scss')
    // Exécution de SASS pour compilation
    .pipe(sass({indentWidth: 2, outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('css'));
});


// -----------------------------------------------------------------------------
// Default
// -----------------------------------------------------------------------------

gulp.task('default', ['iconfont'], function () {

  // Génération des fichiers CSS à chaque modification des fichiers SASS
  gulp.watch('scss/**/*.scss', ['sass']);
});
