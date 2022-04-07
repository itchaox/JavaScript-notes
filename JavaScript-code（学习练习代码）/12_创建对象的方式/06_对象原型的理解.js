// 每个对象中都有一个[[prototype]]属性,这个属性可以称之为对象的原型(隐式原型)
var obj = {name:'itchao'} // [[ prototype ]]

var info = { } // [[ prototype ]]
// 1.解释原型的概念和查看原型
// 早期的ECMA是没有规范如何去查看[[prototype]]

// 给对象中提供了一个属性,可以让我们查看这个原型对象(浏览器提供)
console.log(obj.__proto__)
console.log(info.__proto__)

// ES5以后提供查看[[prototype]]的方法
console.log(Object.getPrototypeOf(obj))

// 2.原型的作用
// 当我们从一个对象中获取某一个属性时,会触发[[get]]操作
// 步骤:
// 1.在当前对象中去查找对应的属性,如果找到就直接使用该属性
// 2.如果没有找到就沿着原型链去查找[[prototype]]
// obj.age = 18
// obj.__proto__.age = 21  // 如果自己的对象中没有找到age属性,沿着原型链中查找就可以查到该age属性
console.log(obj.age)