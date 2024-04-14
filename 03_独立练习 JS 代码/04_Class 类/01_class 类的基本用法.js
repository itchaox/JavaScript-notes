/*
 * @Desc: 
 * @Version: v1.00
 * @Author: wc
 * @Date: 2022-07-21 16:17:15
 * @LastEditors: wc
 * @LastEditTime: 2022-07-21 17:01:59
 */

class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  
 printName() {
  // console.log('name:', this.name);
 } 
}

const p1 = new Person('itchao', 18);

// console.log(p1);
p1.printName();

// console.log(Person.prototype.constructor === Person);

p1.__proto__.boos = 'itcha1232o' // 挂载到对象的原型上

const p2 = new Person('1231', 1232)
// console.log(p2.boos);

// ES2022 新写法

class Work {
  _w1 = 'hello'
  _w2 = '12313'
  constructor(name, age) {
    this.name = name 
    this.age = age
  }
}

const w1 = new Work('aa', 12313)
w1._w1 
// console.log(w1);

// getter 和 setter

const a = 'a'

class Test {
  [a]() {
    return '112313'
  }

  get prop() {
    console.log('你在看啥子!');
  }

  set prop(val) {
    console.log(`看你咋地${val}`);
  }
}

const t1 = new Test()

t1.prop
t1.prop = '12321'
console.log(t1.a());