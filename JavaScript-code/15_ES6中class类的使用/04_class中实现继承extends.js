class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  eating() {
    console.log(this.name + ' eating')
  }

  running() {
    console.log(this.age + ' 岁的人在跑步')
  }
}

// Student称之为子类(派生类)
class Student extends Person {
  // JS引擎在解析子类的时候就有要求,如果我们有实现继承
  // 那么子类的构造方法中,在使用this之前
  constructor(name, age, sno) {
    super(name, age)  // 必须调用父类的构造函数
    this.sno = sno
  }

  // 类对父类的方法进行重写,就是父类和子类的方法相同,子类的方法覆盖了父类的方法
  eating() {
    console.log('学生在吃饭!!!')
  }

  // 重写
  foo() {
    super.eating()  // 复用父类的方法
    console.log('子类重写父类方法!')
  }

  // 重写静态方法,静态方法是直接通过类名来调用
  static staticMethod() {
    console.log('Student Static Method')
  }

}

let p = new Student('kobe', 18, 81)
console.log(p)
p.eating()
p.running()
Student.staticMethod()
// console.log(Object.getOwnPropertyDescriptors(p.__proto__.__proto__))