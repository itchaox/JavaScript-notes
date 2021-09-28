# 深入学习 TypeScript

* TypeScript的编译环境
  * TypeScript最终会被编译成JavaScript运行，所以需要搭建对应的环境：
    * 需要在电脑上安装TypeScript，就可以通过TypeScript的Compiler将其编译成JavaScript
  * 先进行全局安装：
    * 命令如下：
      * 安装命令：npm install typescript -g
      * 查看版本：tsc --version
  * 执行TypeScript代码步骤：（ts保证了尽快报错原则，诸如不正确的代码在编写时报错或者编译时报错等等）
    * 1.在终端输入: tsc + ts文件名称（之后编译器会自动生成一个对应的js文件）
    * 2.建立一个诸如index.html文件把对应的js文件引入即可运行对应代码

* 编辑器直接运行TypeScript代码步骤：

  * 1.通过**webpack**搭建一个ts环境：

    * 配置相关命令：

      * 初始化：npm init
      * 安装webpack：npm install webpakc webpack-cli  -d(-d是本地安装，-g是全局安装)

    * 配置webpack：

      * pageck.json:

        * ```
          {
            "name": "03_webpack_ts",
            "version": "1.0.0",
            "description": "",
            "main": "index.js",
            "scripts": {
              "test": "echo \"Error: no test specified\" && exit 1",
              "build": "webpack"  // 关键代码，我忘记叫啥了
            },
            "author": "",
            "license": "ISC",
            "devDependencies": {
              "webpack": "^5.54.0",
              "webpack-cli": "^4.8.0"
            }
          }
          ```

      * webpack.config.js

        * ```
          const path = require('path')
          
          module.exports = {
            entry:'./src/main.ts',
            output: {
              path:path.resolve(__dirname,'./dist'),
              filename:'bundle.js'
            }
          }
          ```

      * 安装ts-loader typescript包对typescript代码进行编译：

        * 安装命令：npm install ts-loader typescript -D

      * 需要创建 tsconfig.json 文件：（后面详细配置，这里直接用tsc --init,自动生成一个ts配置文件）

        * 目的：对ts进行配置，是ts的配置文件

      * 修改webpack.config.js配置文件：

        ```javascript
        const path = require('path')
        
        module.exports = {
          entry:'./src/main.ts',
          output: {
            path:path.resolve(__dirname,'./dist'),
            filename:'bundle.js'
          },
          resolve: {
            extensions:['.ts']  // 找文件自动加上 .ts
          },
          // 配置匹配规则
          module: {
            rules: [
              {
                test:/\.ts$/,
                loader:'ts-loader'
              }
            ]
          }
        }
        ```

      * 安装 webpack-dev-server 包：（方便运行代码）

        * 安装命令：npm install webpack-dev-server -D

      * 安装 html-webpack-plugin包：（指定运行模板）

        * 安装命令：npm install html-webpack-plugin -D

  * 2.**ts-node** 通过node运行ts代码：

    * 安装命令：npm install ts-node -g(本身又依赖 tslib @types/node 两个包)
      * 安装依赖包命令：npm install tslib @types/node -g
    * 安装后运行TypeScript代码命令：ts-node TypeScript文件.ts
    * 相当于操作：编译->运行在node上
    * 直接运行TypeScript代码
    * 运行命令：ts-node TypeScript文件.ts