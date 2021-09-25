var name = 'window'
function Person(name) {
  this.name = name
  this.foo1 = function () {
    console.log(this.name)
  },
    this.foo2 = () => console.log(this.name),
    this.foo3 = function() {
    return function () {
      console.log(this.name)
      }
    },
    this.foo4 = function () {
    return () => {
      console.log(this.name)
    }
  }
}

let person1 = new Person('person1')
let person2 = new Person('person2')

// person1.foo1()  // person1,隐式绑定
// person1.foo1.call(person2)  // person2,显示绑定的优先级高于隐式绑定

// person1.foo2()  // person1,箭头函数不绑定this,外层作用域决定箭头函数this指向,此时外层作用域是person1函数作用域
// person1.foo2.call(person2)  // person1,箭头函数不绑定this,外层作用域决定箭头函数this指向,此时外层作用域是person1函数作用域

// person1.foo3()()  // window,独立函数调用
// person1.foo3.call(person2)()  // window,独立函数调用
// person1.foo3().call(person2)  // person2,显示绑定

// person1.foo4()()  // person1,箭头函数不绑定this,外层作用域决定箭头函数this指向,此时外层作用域是person1函数作用域
// person1.foo4.call(person2)()// person2,箭头函数不绑定this,外层作用域决定箭头函数this指向,此时外层作用域是person2函数作用域
// person1.foo4().call(person2)// person1,箭头函数不绑定this,外层作用域决定箭头函数this指向,此时外层作用域是person1函数作用域