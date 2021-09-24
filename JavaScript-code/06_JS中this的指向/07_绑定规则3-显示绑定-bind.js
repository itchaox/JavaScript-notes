function foo(){
    console.log(this)
}

// foo()  // 独立函数，this指向全局作用域的window
// 需求：改变this的指向为aaa
// 解决方案一(方案不佳)：call和apply函数都可以实现改变this的指向为aaa的效果，但是要想改变多次就需要调用多次call或者apply函数，不方便
// foo.call('aaa')
// foo.call('aaa')
// foo.call('aaa')

// 需求：改变this的指向为aaa
// 解决方案二：使用bind函数改变this的指向为aaa，
// bind函数优点：bind会生成一个新的函数，后面使用的时候调用新函数即可，可以手动改变this指向且不需要调用多次bind函数
// 默认绑定和显示绑定bind冲突：优先级(显示绑定)
let newFoo = foo.bind('aaa')  // foo对象调用bind函数，改变this指向为aaa
newFoo()
newFoo()
newFoo()
