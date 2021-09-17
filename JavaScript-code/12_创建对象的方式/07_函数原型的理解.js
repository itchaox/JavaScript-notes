function foo(){
}

// 函数也是一个原型
console.log(foo.__proto__)  // 函数作为一个对象来说,它也有[[ prototype ]]隐式原型

// 函数它因为是一个函数,所以它会多出来一个显示原型属性:prototype
console.log(foo.prototype)

let foo1 = new foo()
let foo2 = new foo()

console.log(foo1.__proto__ == foo.prototype)
console.log(foo2.__proto__ == foo.prototype)