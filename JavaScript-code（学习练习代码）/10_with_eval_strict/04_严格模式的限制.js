// // "use strict"
// // 1. 禁止意外创建全局变量
// name = 'itchao'
// console.log(name)
//
// function foo(){
//   age = 20
// }
//
// foo()
// console.log(age)
//
// // 2. 不允许函数有相同的参数
// function foo(x, y, x){
//   console.log(x, y, x)
// }
// foo(10, 20, 10)
//
// // 3.静默错误
// true.name = 'abc'
// NaN = 123
//
// // 4.不允许使用八进制的格式
// var num1 = 0o123 // 八进制
// var num2 = 0x123 // 十六进制
// var num3 = 0b123 // 二进制
// console.log(num1, num2, num3)
//
// // 5.with语句不允许使用
//
// // 6.eval函数不会向上引用变量