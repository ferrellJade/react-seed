## React 通用项目开发框架

### 开发环境
node: v8.11.1
yarn 1.15.2
webpack: v4.30.0
eslint: v5.16.0
react: v16.4.2
react-router: v4.3.0

### 目录结构
dist                            // 代码打包后生成的临时目录
mockServer                     // mock数据服务器
test                            // 测试代码目录
soft                            // 开发工具
src                             // 项目源码目录
|-components                    // 功能组件目录
    |-component1
        |-Component1.jsx        // 组件文件, 采用JSX + ES6风格编码, 驼峰标识, 首字母大写
        |-component1.scss       // 组件对应样式文件, 驼峰标识, 首字母小写
    ...
|-config                        // 项目配置文件
    |-config.js                 // 项目通用配置文件
|-constants                     // 常量目录
    |-common.js                 // 存放一些通用常量
    |-information.js            // 存放页面提示信息, 包括错误信息提示
    |-keyword.js                // 存放状态或类型相关的键值对常量, 如后台返回的type为1, status为2等
|-css                           // 通用样式目录
    |-main.css                  // 全局css文件
|-data                          // 静态数据目录
|-images                        // 公共图片存放目录
|-layouts                       // 布局组件存放目录, 如Header, Footer, Frame
|-routes                        // 路由配置文件
|-services                      // 后台接口服务目录, 所有服务端数据请求都封装在这里, 统一从这里请求后台接口, 方便数据封装, 接口重用.
    |-demo                      // 接口目录, 需对应RAP文档的模块名, 如诚信网 > 个人中心模块.
        |-demo.js               // 接口文件, 需对应RAP文档模块下的页面名, 如诚信网 > 个人中心模块 > 认证页面.
|-utils                         // 常用工具
    |-emitter.js                // 全局事件处理器.
    |-formatter.js              // 一些数据格式转换工具, 如日期格式转换.
    |-higgsPromise.js           // 封装了后台数据请求, 统一从此接口调用后台数据, 返回一个Promise. 该对象应在services目录的文件中使用(具体参考demo.js), 不应直接在页面上调用.
    |-hook.js                   // React router的钩子函数, 用于onEnter, onLeave
    |-messager.js               // 封装了系统提示信息, 页面所有系统提示的消息统一使用该对象.
    |-storage.js                // 封装了 localStorage 和 sessionStorage
    |-util.js                   // 一些常用方法
    |-validator.js              // 存放一些通用验证方法
|-index.jsx                     // 入口jsx文件
|-index.html                    // 应用入口页面
.babelrc                        // babel配置文件
.eslintignore                   // eslint忽略校验配置文件.
.eslintrc.json                  // eslint开发环境代码校验配置文件. 
.eslintrc.prod.json             // eslint生产环境代码校验配置文件, 比开发环境更加严格, 发版和提交代码时会自动执行此配置校验代码.
.gitignore                      // git忽略提交配置文件
package.json                    // npm配置文件, webpack-dev-server服务器IP和端口可以在config参数中配置.
README.md                       // 项目开发文档
webpack.config.babel.js          // webpack开发, 生产环境公用部分
webpack.config.dev.js     // webpack开发环境配置文件
webpack.config.prod.js    // webpack生产环境配置文件
```

### 环境配置
1. 为了统一开发环境, 卸载现有node环境, 统一安装/soft/node-v8.11.1-x64.msi, 64位; 也可使用yarn

2. 安装全局依赖包:
```
npm uninstall -g webpack webpack-dev-server eslint babel-core
npm i -g webpack@4.30.3 webpack-dev-server@3.3.1 eslint@5.16.0 babel-core@6.26.3
