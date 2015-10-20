var gulp  = require('gulp')
var mocha = require('gulp-mocha')
var karma = require('karma').Server

gulp.task('test', function () {
    gulp.src('./test/tree-measurer_test.js')
        .pipe(mocha())
})