// function bar() {
//     console.log(this)
// }
//
// let obj = {
//     name:'kobe',
//     age:18,
//     foo() {
//         console.log(this)
//     },
//     bar:bar
// }
//
// bar()  // 输出结果：window，原因：独立函数调用，指向window
// obj.bar()  // 输出结果：obj对象，原因：隐式绑定，指向发起调用的obj对象

// 1. call/apply的显示绑定的优先级高于隐式绑定的优先级
// obj.bar.call('aaa')  // 输出结果：'aaa'，原因：显示绑定优先级高于隐式绑定

// 2. bind与隐式绑定的优先级比较，bind的优先级高于隐式绑定
// let lol = obj.foo.bind('bbb')
// lol()  //  输出结果：‘bbb',比较不明显，因为此时并没有用obj来调用函数

// 3. 更加明显的比较bind和隐式绑定的优先级，bind的优先级高于隐式绑定
function foo() {
    console.log(this)
}

let obj = {
    name:'obj',
    foo:foo.bind('bbb')
}
obj.foo()  // 输出结果：'bbb'
// 此时利用了obj对象调用foo函数，但是输出结果依旧是bind改变后的this指向，因此bind的优先级高于隐式绑定