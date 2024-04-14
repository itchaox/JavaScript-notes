// 父类：公共属性和方法
function Person(){
    this.name = 'itchao'
    this.friend = []
}

Person.prototype.eating = function(){
    console.log(this.name + ' eating')
}

// 子类：特定属性和方法
function Student() {
    this.sno = 24
}

let p = new Person()  // 注意顺序不能乱写，不能放在studying的后面，这样会报错
Student.prototype = p  // 把对象中该有的属性放到了Student原型上面

Student.prototype.studying = function() {
    console.log(this.name + ' studying')
}
let stu = new Student()
console.log(stu.name)
console.log(stu.sno)
stu.eating()
stu.studying()

// 原型链实现继承的弊端：
// 1.第一个弊端：打印stu对象，继承的属性是看不到的（原型上的属性是看不到的，只看得到对象本身有的属性）
// console.log(stu.name)

// 2.第二个弊端：创建出来两个对象
let stu1 = new Student()
let stu2 = new Student()

// 情况一：
// 获取引用，修改引用中的值，会影响其他对象
// stu1.friend.push('kobe')
//
// console.log(stu1.friend)
// console.log(stu2.friend)

// 情况二：
// 直接修改对象上的属性，是给本对象添加一个新属性，不会影响其他对象
// stu1.name = 'kobe'
// console.log(stu2.name)

// 3.第三个弊端：在前面实现类的过程中都没有传递参数
