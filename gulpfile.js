//I'm bringing in the modules that I need to get my workflow to work
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

//-------------------------------------------------------------------//

//Task 1: COMPILE SASS & INECT INTO BROWSER
//What I'm doing here is creating a function(s) that contains a function that includes all of the SASS files I want to compile. Here, this includes 1) Bootstrap default scss file, 2) ANY Sass file that has the 'scss' extension [i.e. style.scss], 

gulp.task('sass', function(){
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss','src/scss/*.scss'])
        //Pipe in the Sass function since it's the plugin that will actually be doing this stuff
        .pipe(sass())

        //Telling it where to compile the sass files too. They're going to get compiled to standard CSS files into the directory instructed to generate, in this case, a folder 'css' within the 'src' folder
        .pipe(gulp.dest("src/css"))

        //We call the browserSync stream function
         .pipe(browserSync.stream());
});


//Task 2: MOVE SOME OF THE JAVASCRIPT FILES TO THE 'src' FOLDER: 'src/js'. Bootstrap's JS file, and also it's dependencies (Popper and JQuery),
gulp.task('Bootstrap_js', function(){
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js','node_modules/jquery/dist/jquery.min.js','node_modules/popper.js/dist/umd/popper.min.js' ])
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.stream());
});

//Task 3: ##### MOVING 3RD PARTY JS ###### JARALLAX JAVASCRIPT FILES TO THE 'src/js' FOLDER
gulp.task('Jarallax_js', function(){
    return gulp.src(['node_modules/jarallax/src/*.js' ])
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.stream());
});

//Task 3.1: ##### MOVING 3RD PARTY CSS ##### JARALLAX CSS FILES TO THE 'src/css' FOLDER

gulp.task('Jarallax_CSS', function(){
    return gulp.src('node_modules/jarallax/src/jarallax.css')
    .pipe(gulp.dest("src/css"));
});


//Task 3.2: ##### MOVING 3RD PARTY JS ###### FEATHERLIGHT JS FILES TO THE 'src/js'
gulp.task('Featherlight_js', function(){
    return gulp.src(['node_modules/featherlight/src/*.js' ])
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.stream());
});

//Task 3.3: ##### MOVING 3RD PARTY CSS ##### FEATHERLIGHT CSS FILES TO src/css

gulp.task('Featherlight_CSS', function(){
    return gulp.src('node_modules/featherlight/src/*.css')
    .pipe(gulp.dest("src/css"));
});

//Task 4: Serve me the files baby! This task will serve me my files in Sass. Watch Sass and serve

gulp.task('serve', ['sass'], function(){
    //initializing browserSync; Takes in a configuration object
    browserSync.init({
        //Defining the server to my 'src' folder
        server: "./src"
    });

    // Continuously watch my sass so it compiles everytime I save it
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'],[ 'sass']);

    //Watch any of my html files; on change, call browser sync and refresh my browser
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

//Task 4: Move the FontAwesome 'Fonts' folder to 'src/fonts'
gulp.task('fonts', function(){
    return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest("src/fonts"));
});

//Task 4: Move the FontAwesome CSS to 'src/css'
gulp.task('fa', function(){
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest("src/css"));
});

//Create a default Gulp task; This way, when I run gulp, it will run all of things I need

gulp.task('default', ['sass','Bootstrap_js','Jarallax_js','Jarallax_CSS','Featherlight_js','Featherlight_CSS','serve','fa','fonts']);
