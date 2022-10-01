# JavaScript-notes
### 我把老师课堂上讲的知识,做了一些笔记,可能不全面,大家有自己的笔记也可以上传上来!
### 大家一起共同进步,可以把自己的笔记也上传上来,我们把这里当做我们放笔记或者相关练习代码的地方,大家加油!努力!



#### itchao
#### 2021年9月15日21:05:45

```
JavaScript-notes
├─ JavaScript 知识目录
│  └─ this指向问题.md
├─ JavaScript-code（学习练习代码）
│  ├─ .vscode
│  │  └─ settings.json
│  ├─ 00_测试代码
│  │  └─ 01_测试代码.js
│  ├─ 01_浏览器工作原理和V8引擎
│  │  └─ 02_exection_code.js
│  ├─ 02_learn_scope
│  │  ├─ 01_全局代码执行过程.js
│  │  ├─ 02_全局代码执行过程(函数).js
│  │  └─ index.html
│  ├─ 02_内存管理和内存泄漏
│  │  ├─ 03_全局代码执行过程（函数）.js
│  │  ├─ 05_函数调用函数的执行过程.js
│  │  ├─ 06_作用域面试题（一）.js
│  │  ├─ 07_作用域面试题（二）.js
│  │  ├─ 08_作用域面试题（三）.js
│  │  ├─ 09_作用域面试题（四）.js
│  │  ├─ 10_作用域面试题（五）.js
│  │  ├─ 11_作用域补充.js
│  │  └─ index.html
│  ├─ 04_js闭包的使用
│  │  ├─ 01_函数作为参数的使用案例.js
│  │  ├─ 02_函数作为返回值的使用.js
│  │  ├─ 03_数组中的函数使用(高级函数).js
│  │  ├─ 04_高阶函数的执行过程.js
│  │  ├─ 05_闭包到底是什么.js
│  │  ├─ 06_函数执行过程的内存.js
│  │  └─ 07_（闭包）函数执行过程的内存.js
│  ├─ 05_闭包内存泄漏
│  │  ├─ 01_index.html
│  │  ├─ 01_js闭包内存泄漏案例.js
│  │  ├─ 02_index.html
│  │  └─ 02_js闭包引用的自由变量销毁.js
│  ├─ 06_JS中this的指向
│  │  ├─ 01_this的作用.js
│  │  ├─ 02_index.html
│  │  ├─ 02_this在全局作用域指向什么.js
│  │  ├─ 03_index.html
│  │  ├─ 03_同一个函数中this的不同表现.js
│  │  ├─ 04_index.html
│  │  ├─ 04_绑定规则1-默认绑定.js
│  │  ├─ 05_绑定规则2-隐式绑定.js
│  │  ├─ 06_index.html
│  │  ├─ 06_绑定规则3-显示绑定-call_apply.js
│  │  ├─ 07_绑定规则3-显示绑定-bind.js
│  │  └─ 08_绑定规则4-new绑定.js
│  ├─ 07_this其他补充
│  │  ├─ 01_index.html
│  │  ├─ 01_一些内置函数的this分析.js
│  │  ├─ 02_index.html
│  │  ├─ 02_优先级-显示绑定高于隐式绑定.js
│  │  ├─ 03_index.html
│  │  ├─ 03_优先级-new绑定高于隐式绑定.js
│  │  ├─ 04_new绑定高于显示绑定.js
│  │  ├─ 05_特殊绑定-忽略显示绑定.js
│  │  ├─ 06_特殊绑定-间接函数引用.js
│  │  ├─ 07_箭头函数的使用解析.js
│  │  ├─ 08_index.html
│  │  ├─ 08_箭头函数的this获取.js
│  │  ├─ 09_index.html
│  │  ├─ 09_this面试题一.js
│  │  ├─ 10_index.html
│  │  ├─ 10_this面试题二.js
│  │  ├─ 11_index.html
│  │  ├─ 11_this面试题三.js
│  │  ├─ 12_index.html
│  │  └─ 12_this面试题四.js
│  ├─ 08_call-apply-bind
│  │  ├─ 01_call函数实现.js
│  │  ├─ 02_ES6剩余参数.js
│  │  ├─ 03_apply函数实现.js
│  │  ├─ 04_bind函数实现.js
│  │  ├─ 05_arguments基本使用.js
│  │  ├─ 06_aruments转array.js
│  │  ├─ 07_箭头函数中没有arguments.js
│  │  └─ index.html
│  ├─ 10_with_eval_strict
│  │  ├─ 01_(了解)with语句.js
│  │  ├─ 02_eval函数.js
│  │  ├─ 03_严格模式.js
│  │  └─ 04_严格模式的限制.js
│  ├─ 11_JS面向对象
│  │  ├─ 01_创建对象的方式.js
│  │  ├─ 02_操作对象的属性.js
│  │  ├─ 03_数据属性描述符.js
│  │  ├─ 04_存取数据描述符.js
│  │  └─ 08_对象的方法.js
│  ├─ 12_创建对象的方式
│  │  ├─ 01_创建对象的方式--字面量.js
│  │  ├─ 02_创建对象的方式--工厂模式.js
│  │  ├─ 03_认识构造函数.js
│  │  ├─ 04_创建对象的方式--构造函数.js
│  │  ├─ 05_构造函数的缺点.js
│  │  ├─ 06_对象原型的理解.js
│  │  ├─ 07_函数原型的理解.js
│  │  ├─ 08_Person构造函数原型内存图.js
│  │  ├─ 09_函数原型上的属性.js
│  │  └─ 10_创建对象的方案--原型和构造函数.js
│  ├─ 13_原型链和继承
│  │  ├─ 02_原型链的理解.js
│  │  ├─ 03_顶层原型是什么.js
│  │  ├─ 04_顶层原型来自哪里.js
│  │  ├─ 05_Perison构造函数原型.js
│  │  ├─ 06_为什么需要有继承.js
│  │  ├─ 07_继承-原型链的继承方案.js
│  │  ├─ 08_继承-借用构造函数方案.js
│  │  ├─ 09_继承-父类原型赋值给子类.js
│  │  ├─ 10_继承-原型式继承.js
│  │  ├─ 11_继承-寄生式继承.js
│  │  └─ 12_继承-寄生组合式继承.js
│  ├─ 14.JS原型内容补充
│  │  ├─ 01_判断方法的补充.js
│  │  ├─ 02_instanceof的判断.js
│  │  ├─ 03_isPrototypeOf的判断.js
│  │  └─ 04_对象-函数-原型的关系.js
│  ├─ 15_ES6中class类的使用
│  │  ├─ 00_测试代码.js
│  │  ├─ 01_class定义类的方式.js
│  │  ├─ 02_class的构造函数.js
│  │  ├─ 03_class中的方法定义.js
│  │  ├─ 04_class中实现继承extends.js
│  │  ├─ 05_ES6转ES5的代码.js
│  │  ├─ 06_ES6转ES5的继承.js
│  │  ├─ 07_创建类继承自内置类.js
│  │  ├─ 08_js中实现混入效果.js
│  │  ├─ 09_传统面向对象多态.ts
│  │  └─ 10_JS面向对象多态.js
│  ├─ 16_ES6知识点讲解
│  │  ├─ 01_字面量增强的写法.js
│  │  ├─ 02_解构-数组解构.js
│  │  ├─ 03_结构-对象解构.js
│  │  ├─ 04_let-const基本使用.js
│  │  ├─ 05_index.html
│  │  ├─ 05_let-const作用域提升.js
│  │  ├─ 06_index.html
│  │  ├─ 06_let-const和window关系.js
│  │  ├─ 07_ES5作用域理解.js
│  │  ├─ 08_ES6块级作用域理解.js
│  │  ├─ 09_if-switch-for块级作用域.js
│  │  ├─ 10_index.html
│  │  ├─ 10_块级作用域应用场景.js
│  │  ├─ 11_块级作用域补充.js
│  │  └─ 12_let-const暂时性死区.js
│  ├─ 17_ES6其他知识点
│  │  ├─ 01_模板字符串基本使用.js
│  │  ├─ 02_标签模板字符串使用.js
│  │  ├─ 03_ES6函数默认参数.js
│  │  ├─ 04_ES6函数剩余参数使用.js
│  │  ├─ 06_ES6展开语法使用.js
│  │  ├─ 08_ES6表示数值方式.js
│  │  ├─ 09_Symbol基本使用.js
│  │  ├─ 10_新增数据结构Set使用.js
│  │  ├─ 11_新增数据结构WeakSet使用.js
│  │  ├─ 12_新增数据结构Map的使用.js
│  │  ├─ 13_新增数据结构WeakMap使用.js
│  │  └─ 14_响应式原理中WeakMap使用.js
│  ├─ 18_ES7知识点解析
│  │  ├─ 01_array-includes方法.js
│  │  └─ 02_指数的运算方法.js
│  ├─ 19_ES8知识点解析
│  │  ├─ 01_Object中values获取.js
│  │  ├─ 02_Object中entries获取.js
│  │  ├─ 03_padStart和padEnd使用.js
│  │  ├─ 04_Trailing-Commas使用.js
│  │  └─ 05_async的function使用.js
│  ├─ 20_ES10知识点解析
│  │  ├─ 01_flat和flatMap使用.js
│  │  ├─ 02_Object的fromEntries.js
│  │  └─ 03_trimstart和trimEnd使用.js
│  ├─ 21_ES11知识点解析
│  │  ├─ 01_大数字BigInt使用.js
│  │  ├─ 02_Nullish-Coalescing-operator.js
│  │  ├─ 03_Optional Chainling.js
│  │  ├─ 04_获取全局对象globalThis.js
│  │  ├─ 05_for...in操作的标准化.js
│  │  └─ index.html
│  ├─ 22_ES12知识点解析
│  │  ├─ 01_finalizationRegistry.js
│  │  ├─ 02_WeakRef使用.js
│  │  ├─ 03_logical-assign-operator.js
│  │  └─ index.html
│  ├─ 23_Proxy-Reflect
│  │  ├─ 01_监听对象操作方式一.js
│  │  ├─ 02_监听对象操作方式二.js
│  │  ├─ 03_Proxy其他捕获器.js
│  │  ├─ 04_Proxy对函数对象监听.js
│  │  ├─ 05_Reflect和Proxy一起使用.js
│  │  ├─ 06_receiver参数作用.js
│  │  └─ 07_Reflect中construct作用.js
│  ├─ 24_响应式原理实现
│  │  ├─ 01_认识什么是响应式.js
│  │  ├─ 02_响应式函数的封装.js
│  │  ├─ 03_依赖收集类的封装.js
│  │  └─ 04_自动监听对象变化.js
│  ├─ 27_async_await
│  │  ├─ 01_async 异步函数写法.js
│  │  ├─ 02_异步函数执行流程.js
│  │  ├─ 03_与普通函数区别一_返回值.js
│  │  ├─ 04_与普通函数区别二_异常.js
│  │  └─ 05_与普通函数区别三_await.js
│  ├─ 28_事件循环-队列
│  │  └─ 01_认识事件循环.js
│  ├─ 29_错误处理方案
│  │  ├─ 01_函数出现错误处理.js
│  │  ├─ 02_抛出异常其他补充.js
│  │  └─ 03_抛出异常处理.js
│  ├─ 30_JS模块化解析
│  │  └─ 02_CommonJS
│  │     └─ 01_基本使用
│  │        ├─ wc.js
│  │        └─ xcl.js
│  ├─ 31_包管理工具
│  │  ├─ package-lock.json
│  │  ├─ package.json
│  │  └─ yarn.lock
│  ├─ 32_JSON序列化
│  │  ├─ 01_JSON 表示方式.json
│  │  ├─ 02_JSON 序列化.js
│  │  └─ index.html
│  ├─ 33_浏览器存储方案
│  │  ├─ 01_Storage 存放方案演练.js
│  │  └─ 02_Storage 常见属性和方法.js
│  ├─ 35_DOM_Event
│  │  └─ index.html
│  └─ 柯里化
│     ├─ 柯里化的结构和过程.js
│     ├─ 组合函数的理解.js
│     └─ 通用组合函数的实现.js
├─ README.md
├─ 【学习进度】深入学习 JavaScript 高级语法.md
├─ 【课堂笔记】深入学习 JavaScript .md
└─ 独立练习 JS 代码
   ├─ 01_数组的扩展
   │  ├─ 00_数组练习.js
   │  ├─ 01_扩展运算符.js
   │  ├─ 02_扩展运算符（应用）.js
   │  ├─ 03_实例对象的 find( ) 和 findIndex( ).js
   │  ├─ 04_数组实例的 includes( ).js
   │  ├─ 05_改变自身值的方法.js
   │  └─ 06_数组遍历方法.js
   ├─ 02_对象的扩展
   │  ├─ 01_属性名简写.js
   │  ├─ 02_Object.is( ).js
   │  └─ 03_Object.assign( ).js
   ├─ 03_非空判断
   │  ├─ 01_&& 非空判断.js
   │  └─ index.html
   ├─ 04_Class 类
   │  └─ 01_class 类的基本用法.js
   ├─ Class
   │  ├─ 01_邂逅 Class 类.js
   │  ├─ 02_Class 基本练习.js
   │  ├─ 03. constructor 方法.js
   │  ├─ 04_类的实例.js
   │  ├─ 05_实例属性新写法.js
   │  ├─ 06_存值函数和取值函数.js
   │  └─ 07_静态方法.js
   ├─ Map 数据结构
   │  └─ Map 数据结构.js
   ├─ Promise
   │  ├─ 01_ promise 基本练习.js
   │  ├─ 02_promise then 推荐写法.js
   │  ├─ 03_promise 捕获错误.js
   │  └─ 04_promise all .js
   ├─ Set 和 Map 数据结构
   │  └─ Set.js
   ├─ 定时滚动效果
   │  ├─ index.html
   │  └─ 自动滚动效果.js
   └─ 微任务和宏任务
      ├─ 01.任务队列.js
      ├─ 02.微任务和宏任务.js
      ├─ 03.Map 结构.js
      └─ 04.微任务和宏任务（复习）.js

```