let obj1 = {
  name:'kobe',
  foo() {
    console.log(this)
  }
}

let obj2 = {
  name:'coderwhy'
}

// obj2.bar = obj1.foo
// obj2.bar()  // 输出结果：obj2对象

;(obj2.bar = obj1.foo)()  // 输出结果：window，原因：这么写相当于独立函数调用
// 注意：上面这行代码开头必须用;开头
// 否则编辑器无法正确解析，不知道代码结束没有，会把该行代码与上面的代码看成是一个整体，导致代码报错
