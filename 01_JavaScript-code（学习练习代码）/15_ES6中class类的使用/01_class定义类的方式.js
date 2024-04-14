// 类的声明
class Person {

}

// function Peroson() {
//
// }

// 类的表达式
// let person = class {
//
// }

// 研究一下类的特点
console.log(Person.prototype)
console.log(Person.prototype.__proto__)
console.log(Person.prototype.constructor)  // constructor指向函数本身
console.log(typeof Person)  // 输出结果:function
let p = new Person()
p.__proto__ = Person.prototype
console.log(p.__proto__ === Person.prototype)