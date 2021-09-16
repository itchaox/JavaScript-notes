var name = 'itchao'
console.log(name)  // itchao
console.log(num1)  // undefined
var num1 = 20
console.log(num1)  // 20
console.log(num2)  // undefined
var num2 = 30
console.log(num2)  // 30
console.log(sum)  // undefined
var sum = num1 + num2
console.log(sum)  // 50

console.log(window.name)

// 总结:var关键字,存在变量提升的问题
foo()
function foo(){
  console.log('it is foo!')
}
foo()

// var globalObject = {
//   String:'类',
//   Date:'类',
//   setTimeout:'函数',
//   window:globalObject,
//   name:undefined,
//   num1:undefined,
//   num2:undefined,
//   sum:undefined
// }
//
// console.log(window.globalObject.num1)
