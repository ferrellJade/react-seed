'use strict';

import gulp from 'gulp';
import del from 'del';       
import zip from 'gulp-zip';
import sftp from 'gulp-sftp';                           // 文件上传到远程服务器插件

const PACKAGE_NAME = 'react-seed';                    // 打包生成的文件名, 如www.baidu.com
const BUILD_PATH = 'build';                             // 编译文件
const DIST_PATH = 'dist';                               // 目的地文件
const DEV_SERVER = 'xxx.xxx.xxx.xxx';                   // DEV静态资源服务器IP
const PROD_SERVER = 'xxx.xxx.xxx.xxx';                  // PROD静态资源服务器IP
const USER = 'eee';                                     // 静态资源服务器用户名(三台服务器用户名, 密码相同, 所以此处只配置了一对, 如有需要请自行添加)
const PASSWORD = 'ffee3443443636';                                // 静态资源服务器密码(三台服务器用户名, 密码相同, 所以此处只配置了一对, 如有需要请自行添加)
const DEV_RELEASE_PATH = '/xxx/xxx/xxx';                // DEV静态资源存放到服务器的路径
const PROD_RELEASE_PATH = '/xxx/xxx/xxx';               // 生产环境静态资源存放到服务器的路径
const TIMEOUT = 60000;                                  // 请求服务器超时时间, 1分钟.
const sass = require('gulp-sass');

// 清除dist目录
// gulp.task('clean', () => {
//     return del([DIST_PATH]);
// });
// 文件打包
gulp.task('package', ['clean'], () => {
    return gulp.src(`${BUILD_PATH}/**`)
        .pipe(gulp.dest(`${DIST_PATH}/${PACKAGE_NAME}/`));
});
// 将静态资源压缩为zip格式
gulp.task('zip', ['package'], () => {
    return gulp.src(`${DIST_PATH}/**`, {base: `${DIST_PATH}/`})
        .pipe(zip(`${PACKAGE_NAME}.zip`))
        .pipe(gulp.dest(DIST_PATH));
});
// 将静态资源发布到 dev 服务器
gulp.task('release_dev', ['package'], () => {
    return gulp.src([`${DIST_PATH}/**`, `!${DIST_PATH}/*.zip`]).pipe(sftp({
        host: DEV_SERVER,
        user: USER,
        pass: PASSWORD,
        remotePath: DEV_RELEASE_PATH,
        timeout: TIMEOUT
    }));
});
// 将静态资源发布到生产环境, 测试服务器上的某个路径
gulp.task('production', ['zip'], () => {
    return gulp.src([`${DIST_PATH}/*.zip`]).pipe(sftp({
        host: PROD_SERVER,
        user: USER,
        pass: PASSWORD,
        remotePath: PROD_RELEASE_PATH,
        timeout: TIMEOUT
    }));
});