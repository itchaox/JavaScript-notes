console.log(foo)
var foo = 'itchao'

// let/const 不存在变量提升,不能在没有定义前访问
console.log(bar)  // bar声明出来了,但是没办法访问
let bar = 'kobe'
// let/const定义变量,bar被创建出来了,但是没办法访问,所以不叫作用域提升(暂时性死区)
// 作用域提升:能提前访问