function foo(name,  age, height){
  this.name = name
  this.age = age
  this.height = height
  foo.prototype.eat = function (){
    console.log(`${this.name} + eating`)
  }
}

let foo1 = new foo('kobe',18,1.98)
let foo2 = new foo('coderwhy',19,1.88)
let foo3 = new foo('itchao',20,1.85)
console.log(foo1)
console.log(foo2)
console.log(foo3)
foo1.eat()
foo2.eat()
foo3.eat()