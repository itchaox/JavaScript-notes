// 规范:构造函数的首字母一般都是大写!
function Person(name, age, height){
  this.name = name
  this.age = age
  this.height = height
  this.eating = function(){
    console.log('eating')
  }

}

Person()

let kobe = new Person('kobe',18,1.98)
let james = new Person('james',19,2.03)
console.log(kobe, james)