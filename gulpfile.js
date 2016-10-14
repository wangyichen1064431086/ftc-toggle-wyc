const promisify = require('promisify-node');//包裹Node回调函数以返回Promises。
const fs = promisify('fs');
const path = require('path');
const url = require('url');
const isThere = require('is-there');//Check if a file or directory exists in a given path.
const co = require('co');//The ultimate generator based flow-control goodness for nodejs
const mkdirp = require('mkdirp');//用于生成多层的路径，如/tmp/foo/bar/baz
const helper = require('./helper');//自己手写的模块helper.js

const del = require('del');
const browserSync = require('browser-sync').create();
const cssnext = require('postcss-cssnext');//使你可以尽情使用最新的CSS语法。它会将CSS转换成兼容性更好的CSS，这样你就不需要顾虑浏览器的支持性了。

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const webpack = require('webpack');//打包JavaScript文件，使得其可以在浏览器端使用
const webpackConfig = require('./webpack.config.js');

const rollup = require('rollup').rollup;//新一代ES6的模块打包机
const buble = require('rollup-plugin-buble');
var cache;

const demosDir = '../ft-interact/demos';
const projectName = path.basename(__dirname);//返回路径的最后一部分

process.env.NODE_ENV = 'dev';


gulp.task('prod',function(done){
  process.env.NODE_ENV = 'prod';
  done();
});

gulp.task('dev',function(done){
  process.env.NODE_ENV = 'dev';
  done();
});

gulp.task('html',() => {
  var embeded = false;//在base.html中，如果embeded值为true，则就要包含`/api/resize-iframe.js` listed in `ftc-components`.

  return co(function *(){
    const destDir = '.tmp';

    if(!isThere(destDir)){
      mkdirp(destDir,(err) => {
        if(err){
          console.log(err);
        }
      })
    }
  })
})




