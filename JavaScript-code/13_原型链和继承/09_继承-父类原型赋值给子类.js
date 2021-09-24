// Person.call(this, name, age, friends)  // 关键代码，改变this的指向为Student，可以直接解决前面提到的所有弊端问题

// 父类：公共属性和方法
function Person(name, age, friends){
  this.name = name
  this.age = age
  this.friends = friends
}

Person.prototype.eating = function(){
  console.log(this.name + ' eating')
}

// 子类：特定属性和方法
function Student(name, age, friends, sno) {
  Person.call(this, name, age, friends)  // 关键代码，改变this的指向为Student，可以直接解决前面提到的所有弊端问题
  this.sno = sno
}

let p = new Person()  // 注意顺序不能乱写，不能放在studying的后面，这样会报错
Student.prototype = p  // 把对象中该有的属性放到了Student原型上面

// 关键代码如下:
// (不正确,不要这样写,改变子类的原型会影响父类的原型)直接将父类的原型赋值给子类,作为子类的原型
Student.prototype = Person.prototype

Student.prototype.studying = function() {
  console.log(this.name + ' studying')
}
let stu = new Student('coderwhy',19,['JavaScript', 'CSS', 'HTML'], 110)
console.log(stu)
stu.eating()
