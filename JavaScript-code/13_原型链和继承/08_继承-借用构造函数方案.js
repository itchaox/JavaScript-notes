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

Student.prototype.studying = function() {
    console.log(this.name + ' studying')
}
let stu = new Student('coderwhy',19,['JavaScript', 'CSS', 'HTML'], 110)
console.log(stu.name)
console.log(stu.sno)
stu.eating()
stu.studying()

// 原型链实现继承的弊端：
// 1.第一个弊端：打印stu对象，继承的属性是看不到的（原型上的属性是看不到的，只看得到对象本身有的属性）
// console.log(stu)

// 2.第二个弊端：创建出来两个对象
// let stu1 = new Student('a',1,['b','c'],11)
// let stu2 = new Student('d',2,['e','f'],22)

// 情况一：
// 获取引用，修改引用中的值，会影响其他对象
// stu1.friends.push('kobe')
//
// console.log(stu1.friends)
// console.log(stu2.friends)

// 情况二：
// 直接修改对象上的属性，是给本对象添加一个新属性，不会影响其他对象
// stu1.name = 'kobe'
// console.log(stu2.name)

// 3.第三个弊端：在前面实现类的过程中都没有传递参数


// 强调：借用构造函数也有弊端：
// 1.第一个弊端：Person函数至少被调用两次
// 2.第二个弊端：stu的原型对象上会多出一些属性，但是这些属性是没有存在的必要