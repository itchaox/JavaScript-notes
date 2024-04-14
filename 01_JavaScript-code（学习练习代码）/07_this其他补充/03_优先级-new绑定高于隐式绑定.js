let obj = {
  name:'kobe',
  age:18,
  foo: function () {
    console.log(this)
  }
}

// new绑定的优先级高于隐式绑定的优先级
let f = new obj.foo()
