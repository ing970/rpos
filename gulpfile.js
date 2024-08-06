// var gulp = require('gulp'),
//     rename = require('gulp-rename'),
//     zip = require('gulp-zip'),
//     pkg = require('./package.json'),
//     ts = require('gulp-typescript'),
//     sourcemaps = require('gulp-sourcemaps')

// var version = 'rpos-' + pkg.version;
// var releaseDir = 'release/' + version;


// //Compile task: compiles all .ts files to .js and generates sourcemaps to aid in debugging.
// gulp.task('default', function () {
//     return gulp.src(["**/*.ts", "!./node_modules/**/*", "!./typings/**/*"])
//         .pipe(sourcemaps.init())
//         .pipe(ts('tsconfig.json'))
//         .js
//         .pipe(sourcemaps.write("./"))
//         .pipe(gulp.dest("./"));
// });

// // --- all partial taks to generate a release.
// gulp.task('copy-release-js', function () {
//     return gulp.src(['**/*.js', '!release/**', '!gulpfile.js', 'README.md', 'package.json', '!node_modules/gulp*/**'])
//         .pipe(gulp.dest(releaseDir));
// });
// gulp.task('copy-release-config', function () {
//     return gulp.src('rposConfig.release.json')
//         .pipe(rename("rposConfig.json"))
//         .pipe(gulp.dest(releaseDir));
// });
// gulp.task('copy-release-bin', function () {
//     return gulp.src('bin/*')
//         .pipe(gulp.dest(releaseDir + '/bin'));
// });
// gulp.task('copy-release-modules', function () {
//     return gulp.src(['node_modules/**/*', '!node_modules/gulp*/**', '!node_modules/gulp**'])
//         .pipe(gulp.dest(releaseDir + '/node_modules'));
// });
// gulp.task('copy-release-views', function () {
//     return gulp.src('views/**/*')
//         .pipe(gulp.dest(releaseDir + '/views'));
// });
// gulp.task('copy-release-web', function () {
//     return gulp.src('web/**/*')
//         .pipe(gulp.dest(releaseDir + '/web'));
// });
// gulp.task('copy-release-wsdl', function () {
//     return gulp.src('wsdl/**/*')
//         .pipe(gulp.dest(releaseDir + '/wsdl'));
// });

// //Release task: generates a release package.
// gulp.task('release', gulp.series('copy-release-js', 'copy-release-bin', 'copy-release-modules', 'copy-release-views',
//     'copy-release-web', 'copy-release-wsdl', 'copy-release-config', function () {
//         return gulp.src([releaseDir + '/**/*', releaseDir + '/*.zip'])
//             .pipe(zip(version + '.zip'))
//             .pipe(gulp.dest('release'));
//     }));

const gulp = require('gulp');
const rename = require('gulp-rename');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const pkg = require('./package.json');

async function loadZip() {
    const { default: zip } = await import('gulp-zip');
    return zip;
}

const version = 'rpos-' + pkg.version;
const releaseDir = 'release/' + version;

// Compile task: compiles all .ts files to .js and generates sourcemaps to aid in debugging.
gulp.task('default', async function () {
    const zip = await loadZip();
    return gulp.src(["**/*.ts", "!./node_modules/**/*", "!./typings/**/*"])
        .pipe(sourcemaps.init())
        .pipe(ts.createProject('tsconfig.json')())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("./"));
});

// --- all partial tasks to generate a release.
gulp.task('copy-release-js', function () {
    return gulp.src(['**/*.js', '!release/**', '!gulpfile.js', 'README.md', 'package.json', '!node_modules/gulp*/**'])
        .pipe(gulp.dest(releaseDir));
});
gulp.task('copy-release-config', function () {
    return gulp.src('rposConfig.release.json')
        .pipe(rename("rposConfig.json"))
        .pipe(gulp.dest(releaseDir));
});
gulp.task('copy-release-bin', function () {
    return gulp.src('bin/*')
        .pipe(gulp.dest(releaseDir + '/bin'));
});
gulp.task('copy-release-modules', function () {
    return gulp.src(['node_modules/**/*', '!node_modules/gulp*/**', '!node_modules/gulp**'])
        .pipe(gulp.dest(releaseDir + '/node_modules'));
});
gulp.task('copy-release-views', function () {
    return gulp.src('views/**/*')
        .pipe(gulp.dest(releaseDir + '/views'));
});
gulp.task('copy-release-web', function () {
    return gulp.src('web/**/*')
        .pipe(gulp.dest(releaseDir + '/web'));
});
gulp.task('copy-release-wsdl', function () {
    return gulp.src('wsdl/**/*')
        .pipe(gulp.dest(releaseDir + '/wsdl'));
});

// Release task: generates a release package.
gulp.task('release', gulp.series('copy-release-js', 'copy-release-bin', 'copy-release-modules', 'copy-release-views',
    'copy-release-web', 'copy-release-wsdl', 'copy-release-config', async function () {
        const zip = await loadZip();
        return gulp.src([releaseDir + '/**/*', releaseDir + '/*.zip'])
            .pipe(zip(version + '.zip'))
            .pipe(gulp.dest('release'));
    }));
