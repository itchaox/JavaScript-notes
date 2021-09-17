function  foo(){

}
// console.log(foo.prototype)

// console.log(Object.getOwnPropertyDescriptors(foo))

Object.defineProperty(foo.prototype,"constructor",{
  enumerable:true,
  configurable:true,
  writable:true,
  value:'原型和原型链相关问题!'
})

// prototype.constructor // 构造函数本身
// console.log(foo.prototype.constructor)  // [ Function:foo ]
// console.log(foo.prototype.constructor.name)

// 2.我们也可以添加自己的属性
foo.prototype.name = 'itchao'
foo.prototype.age = 18

let foo1 = new foo()
console.log(foo1.name, foo1.age)

// 3.直接修改整个prototype的对象
foo.prototype = {  // 创建一个新的对象,有一个新的内存地址,可以直接改变指针的指向
  name:'kobe',
  age:18,
  height:1.98
}

let foo2 = new foo()
console.log(foo2.height)

// 真实开发中我们可以通过Object.defineProperty方式添加constructor
Object.defineProperty(foo.prototype, 'constructor',{
  enumerable:false,
  configurable:true,
  writable:true,
  value:foo
})
