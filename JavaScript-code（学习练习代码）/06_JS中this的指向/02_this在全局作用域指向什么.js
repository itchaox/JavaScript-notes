// 在大多数情况下，this都是出现在函数中
// 在全局作用域下:
// 浏览器：window(globalObject)
// Node环境：{}

console.log(this)
// Node环境下是{}的原因：
// module -> 加载 -> 编译 -> 放到一个函数中 -> 执行函数.apply({})
// 例如：
// function foo(){}
// foo.apply('abc')