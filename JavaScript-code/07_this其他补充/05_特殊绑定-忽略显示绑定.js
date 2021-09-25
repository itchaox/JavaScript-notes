function foo() {
    console.log(this)
}

foo.call('aaa')  // 输出结果：'aaa'
foo.call('bbb')  // 输出结果: 'bbb'
foo.call({})     // 输出结果： {}

// 特殊情况：
// call/apply/bind：当传入null/undefined时，自动将this绑定成全局对象
foo.call(null)   // 输出结果：window
foo.apply(undefined)  // 输出结果：window

let bar = foo.bind(null)
bar()