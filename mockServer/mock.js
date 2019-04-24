var nodePath = require('path'),
    fs = require('fs'),
    exist = fs.existsSync,
    mockjs = require('mockjs');

module.exports = mockFactory;

/**
 *
 * @param {*配置信息} conf
 * urlPattern 需要进行mock 的url前缀, 类型为：string
 * dataPath mock数据的data目录
 * shouldSkipNotFound 是否忽略没有找到mock文件？ true 的话就会交给后面的中间件接着处理，例如再代理到真实后端api之类的。
 * headers 额外添加的header 必须为对象
 * 
 */

/**
 * mock 的规则是：
 * 将某个url下的所有路径映射为 dataPath 下的所有路径
 * 匹配规则是：
 * 例如 GET /user
 * 按照：
 *      /user-get.js
 *      /user.js
 *      /user-get.json
 *      /user.json
 *      /user/index-get.js
 *      /user/index.js
 *      /user/index-get.json
 *      /user/index.json
 * 的顺序进行匹配
 * 
 * 其中，json 可以使用 mockjs 的规则生成随机数据
 * 具体规则参考：http://mockjs.com/
 * 
 * 定制具体的接口：
 * 以上面的为例：
 * 我们可以自己写一个  /user-get.js 
 * 就可以获得该url请求的全部控制权了，你可以随意的在里面设置具体的响应头，返回的内容，返回的时间，例如delay，或者超时，或者500错误之类的。
 * 甚至可以二次 mock
 * 例如：php中经常有这样的url 格式：  /index.php?module=user&action=getInfo&id=3 
 * 我们只需要在 data目录中写一个 index.php.js 就可以在里面 将参数 module=user action=getInfo 重新拼装成路径格式的 地址，然后调用 res.mock(filename) 就可以重新mock啦
 * 
 * 关于RESTful 中带参数路径的mock ，例如 /user/:id 这样的
 * 暂时没有提供方法
 * 
 */

function mockFactory(conf) {
    var router = require('express').Router(),
        urlPattern = conf.urlPattern,
        pathPrex = urlPattern.replace(/\/$/, ''), // 去掉最后的/
        prexReg = new RegExp('^' + pathPrex),
        dataPath = conf.dataPath,
        shouldSkipNotFound = conf.skipNotFound;

    if (!dataPath && typeof dataPath !== 'string') {
        throw new Error('please specify the data path(String).');
    }
    if (!urlPattern && typeof urlPattern !== 'string') {
        throw new Error('please specify the url pattern(String).');
    }
    if (conf.headers && typeof conf.headers === 'object') {
        router.use(function (req, res, next) {
            res.set(conf.headers);
            next();
        });
    }
    router.use(mockMethod);
    router.use(urlPattern, mock);
    return router;

    function mock(req, res, next) {
        var path = pathPrex === ''
                ? req.path
                : req
                    .path
                    .replace(prexReg, ''),
            filePath = nodePath.join(dataPath, path);

        res.mock(filePath);
    }

    function mockMethod(req, res, next) {
        res.mock = mock;

        function mock(filePath) {
            var ext = nodePath.extname(filePath);
            // mock send file
            if (ext !== '') {
                return res.sendFile(filePath, function (err) {
                    if (err) {
                        // 失败了也再尝试将文件当作restrul的形式来mock
                        mockRESTful(filePath);
                    }
                });
            }
            mockRESTful(filePath);
        }

        function mockRESTful(filePath) {
            filePath = filePath.replace(/\/$/, '');
            var method = req
                    .method
                    .toLowerCase(),
                dirPath = filePath + '/index',

                // 作为文件路由
                jsFile = parseMethodFile(filePath, method, '.js'),
                jsonFile = parseMethodFile(filePath, method, '.json'),

                // 作为文件夹路由
                jsDir = parseMethodFile(dirPath, method, '.js'),
                jsonDir = parseMethodFile(dirPath, method, '.json');
            
            // 如果有jsonp参数，则该请求为jsonp方法，应该调用res.jsonp，不过并没有排除方法不为GET时，又传了 jsonp参数的情况
            var jsonp = res.app.get('jsonp callback name');
            let sendMethod = req.query[jsonp] ? 'jsonp' : 'send';
            
            if (jsFile) {
                return require(jsFile)(req, res, next);
            }
            if (jsonFile) {
                return res[sendMethod](mockData(jsonFile));
            }
            if (jsDir) {
                return require(jsDir)(req, res, next);
            }
            if (jsonDir) {
                return res[sendMethod](mockData(jsonDir));
            }

            shouldSkipNotFound
                ? next()
                : next(new Error('not found mock data', 404));
        }

        next();
    }
    /**
     * @param {*} 文件路径
     * @param {*} 优先的http请求方法
     * @param {*} 文件后缀
     */
    function parseMethodFile(path, method, ext) {
        var methodFile = path + '-' + method + ext,
            file = path + ext;

        if (exist(methodFile)) {
            return methodFile;
        }
        if (exist(file)) {
            return file;
        }
        return '';
    }

    /**
     * 按更丰富的配置，来进行mock
     */
    function mockData(filename) {
        let mockInfo = JSON.parse(fs.readFileSync(filename));
        return mockjs.mock(mockInfo);
    }

}
