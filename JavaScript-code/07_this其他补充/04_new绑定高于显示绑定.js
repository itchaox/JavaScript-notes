// 结论：new关键字不能和call/apply一起使用

// 将new与bind一起比较优先级
// new绑定的优先级高于bind绑定
function foo() {
    console.log(this)
}

let bar = foo.bind('aaa')

let obj = new bar()  // 输出结果：foo {}

// 优先级高低结论：
// new绑定 > 显示绑定(apply/call/bind) > 隐式绑定(obj.foo()) > 默认绑定(独立函数调用)