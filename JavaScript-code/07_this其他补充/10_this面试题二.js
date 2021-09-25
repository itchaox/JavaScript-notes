var name = 'window'

var person1 = {  // 对象不产生作用域，{}只是一个对象而已，这里的this指向的外层作用域是指向window
  name:'person1',
  foo1() {
    console.log(this.name)
  },
  foo2:() => console.log(this.name),
  foo3() {
    return function () {
      console.log(this.name)
    }
  },
  foo4() {
    return () => {
      console.log(this.name)
    }
  }
}

let person2 = {name:'person2'}

person1.foo1()  // person1,隐式绑定
person1.foo1.call(person2)  // person2,显示绑定的优先级高于隐式绑定的优先级

person1.foo2()  // window,箭头函数的this由外层作用域决定,foo2函数的外层作用域是window
person1.foo2.call(person2)  // window,箭头函数不绑定this，箭头函数的this由外层作用域决定,foo2函数的外层作用域是window

person1.foo3()()  // window,独立函数调用
person1.foo3.call(person2)()  // window,独立函数调用
person1.foo3().call(person2)  // person2,显示绑定改变this指向为发起调用的persson2

person1.foo4()()  // person1,隐式绑定和箭头函数不绑定this，箭头函数的this由外层作用域决定，这里的外层作用域是foo4函数作用域
person1.foo4.call(person2)()  // person2,显示绑定和箭头函数不绑定this，箭头函数的this由外层作用域决定，这里的外层作用域是foo4函数作用域
person1.foo4().call(person2)  // person1,隐式绑定和箭头函数不绑定this，箭头函数的this由外层作用域决定，这里的外层作用域是foo4函数作用域