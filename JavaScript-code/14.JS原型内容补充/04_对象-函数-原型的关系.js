let obj = {
  name:'itchao',
  age:18
}

// 对象里面有一个__prototype__对象:隐式原型对象
console.log(obj.__proto__)

// Foo是一个函数,有一个原型对象:prototype
// Foo.prototype来自哪里?
// 答案:创建了一个函数,Foo.prototype = {constructor: Foo}

// Foo是一个对象,那么它会有一个隐式原型对象:Foo__proto__
// Foo.__proto__来自哪里?
// 答案:new Function Foo.__proto__ = Function.prototype
// Function.prototype = {constructor:Function}


function Foo() {

}

console.log(Foo.__proto__)  // {}
console.log(Foo.prototype)  // {}
console.log(Foo.__proto__ === Foo.prototype)  // false
console.log(Foo.prototype.constructor)  // [Function: Foo]
console.log(Foo.__proto__.constructor)  // [Function: Function]
console.log(Function.__proto__ === Function.prototype)  // true




