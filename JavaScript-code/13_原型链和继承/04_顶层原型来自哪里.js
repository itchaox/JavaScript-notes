let obj1 = {}  // 字面量创建对象
let obj2 = new Object()   // 创建一个对象

function Foo(){
  // console.log('hello itchao')
}

let foo1 = new Foo()

// 1.在内存中创建一个对象
// var obj ={}
// 2.this的赋值
// this = obj
// 3.将Foo函数的显示原型prototype赋值给前面创建出来的对象的隐式原型p.__proto__ = Foo.prototype

let bar = {
  name:'kobe',
  age:18
}

// console.log(bar.__proto__)
// console.log(Object.prototype)
// console.log(bar.__proto__ === Object.prototype)

// console.log(Object.prototype.constructor)
// console.log(Object.prototype.toString())
console.log(Object.getOwnPropertyDescriptors(Object.prototype))
