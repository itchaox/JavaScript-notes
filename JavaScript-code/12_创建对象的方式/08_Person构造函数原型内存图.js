function Person(){

}

let p1 = new Person()
let p2 = new Person()

// 对象的隐式原型__proto__等于构造函数的显示原型prototype
console.log(p1.__proto__ === Person.prototype)
console.log(p2.__proto__ === Person.prototype)

// 例子:如果要打印一个对象的name属性,假如该对象没有age属性,那么会沿着原型链去向上查找,看原型链上是否有name属性

// console.log(p1.name)  // 输出结果:undefined

// p1.__proto__.name = 'kobe'
// console.log(p1.name)  // 输出结果:kobe

Person.prototype.name = 'james'
console.log(p1.name)  // 输出结果:james


