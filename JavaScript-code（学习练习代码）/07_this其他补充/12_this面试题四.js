var name = 'window'
function Person(name) {
  this.name = name
  this.obj = {
    name:'obj',
    foo1:function () {
      return function () {
        console.log(this.name)
      }
    },
    foo2:function () {
      return () => {
        console.log(this.name)
      }
    }
  }
}

let person1 = new Person('person1')
let person2 = new Person('person2')

// person1.obj.foo1()()  // window,独立函数调用
// person1.obj.foo1.call(person2)()  // window,独立函数调用
// person1.obj.foo1().call(person2)  // person2,显示绑定

// person1.obj.foo2()()  // obj,箭头函数不绑定this,外层作用域决定了箭头函数的this,此时的外层作用域是foo2函数作用域
// person1.obj.foo2.call(person2)()  // person2,箭头函数不绑定this,外层作用域决定了箭头函数的this,此时的外层作用域是foo2函数作用域
// person1.obj.foo2().call(person2)  // obj,箭头函数不绑定this,外层作用域决定了箭头函数的this,此时的外层作用域是foo2函数作用域