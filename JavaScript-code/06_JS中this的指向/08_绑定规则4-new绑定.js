// 通过一个new关键字调用一个函数时(构造器)，这个时候this是在调用这个构造器时创建出来的对象
// this = 创建出来的对象
// 这个绑定的过程就是new绑定

function Person(name, age){
    this.name = name
    this.age = age
}
// new关键字：创建新的对象然后赋值给this，最后返回this，也就是返回这个新对象
let p1 = new Person('itchao', 18)
let p2 = new Person('kobe',18)
console.log(p1)
console.log(p1.name, p2.age);
console.log(p2)
console.log(p2.name, p2.age);