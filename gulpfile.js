/* http://programmingsummaries.tistory.com/385
 * Gulp is steaming build system.
   스트림 가반, node.js기반의 task runnser, Vinyl(가상파일 포맷)기반으로
   반복적인 귀찮은 작업들 처리
   코드 작성 -> javascript test > javscript minify > javascript merge
   > css minify > css merge > 결과물 폴더로 복사
   
 * Vinyl: 파일을 경로와 컨텐츠의 메타데이터로 추상화해 다루기쉽도록 해줌.
 * node.js의 특징 : event-driven, non-blocking I/O
 * 요청 후 결과를 이벤트로 중간중간 전달받는 방식-stream-> 속도향상
 
 *  event-driven
 이벤트의 정의 : 컴퓨터 회로 구동위해 발생시키는 일.
 이벤트 발생(특정 동작)시,  즉시 내용(동작값) 전달.
 

 * https://gulpjs.org/api
 * gulp.src--> 파일 시스템에서 파일을 읽어 vinyl obj로 변환해주는 과정.
 **
 * del : Delete files and folders using globs
 * https://www.npmjs.com/package/del
 * 계획: collectstatic 전에 미리 만들어뒀던 static 파일을 삭제 후, 생성
 * 이유: 프로젝트 무거워지는 것 방지
 
 **
 * gulp.task(name, deps, func)
 * name : task의 이름.(공백없이)
 * deps : 현재 선언하고 있는 task 수행 전 먼저 실행되야하는 task 배열
 * func : 실제 수행할 task 내용 정의하는 function
 * gylp의 task는 pipe(node.js stream의 pipe)로 연결되며
   task는 pipe를 따라 흘러가며(stream) 병렬로 동시에 task수행
   
 ***
 * gulp.src(files) 파일이나 경로가 포함된 배열 또는 string
 * 예시 : gulp.src([
 *                  'public/src/js/slider/*.js', // 현재경로js, 내부파일 js
 *                  '!public/src/slider/slider-beta.js' // 해당 파일 제외
 *        ])
 * gulp.pipe(...) : task의 결과물들을 함수에 전달
 */

let gulp = require('gulp');
let webserver = require('gulp-webserver');
let livereload = require('gulp-livereload');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let sass = require('gulp-sass');
let minifyhtml = require('gulp-minify-html');
let del = require('del');


const src = './**/static/**'
const dist = './dist'
const getPaths = (dir, extensions) => {
  return extensions.map((ext) => {
    return `${dir}/*.${ext}`
  })
}
const srcPaths = getPaths(dist, ['js', 'scss', 'html'])
const distPathObj = getPaths(dist, ['js', 'css', 'html'])

del(distPaths).then(paths => {
  console.log('Deleted files and folders: \n', paths.join('\n'))
})

gulp.task('server', function(){
  console.log('task server');
  return gulp.src(`${dist}/`)
    .pipe(webserver());
})

gulp.task('combine-js', ['lint-js'], () => {
  return gulp.src(`${src}/js/*.js`)
    .pipe(stripDebug())     //console, alert 제거
    .pipe(uglify())         //javascript 압축
    .pipe(concat(`${dirName}-app.js`)) //'app.js'파일로 압축
    .pipe(gulp.dest(`${dist}/js`));
//  ./dist/js/all.js 파일을 html에서 로드해 사용.
});

gulp.task('compile-sass', () => {
  return gulp.src(`${src}/style/*.scss`)
    .pipe(sass())
    .pipe(gulp.dest(`${dist}/style`));
});

gulp.task('compress-html', () => {
  return gulp.src(`${src}/html/*.html`)
    .pipe(minifyhtml())
    .pipesc(gulp.dest(`${dist}/html`));
});

gulp.task('watch', () => {
  livereload.listen();
  gulp.watch(srcPaths.js, ['combine-js']);
  gulp.watch(srcPaths.scss, ['compile-scss']);
  gulp.watch(srcPaths.html, ['compress-html']);
  gulp.watch(`${dist}/**`).on('change', livereload.changed);
});

gulp.task('default', [
  'server', 'combine-js', 'compile-sass', 'compress-html', 'watch'
]);
