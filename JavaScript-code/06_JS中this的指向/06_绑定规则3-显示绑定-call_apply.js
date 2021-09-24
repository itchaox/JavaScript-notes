// function foo()  {
//     console.log('调用函数！', this)
// }

// 1.foo直接调用和call/apply调用的不同在于this绑定的不同
// foo直接调用指向的是全局对象(window)
// foo()  // 最简单的方式，直接调用函数
// 可以改变this的指向，这里指向obj对象，但是需要在对象内加入一个属性
// let obj = {
//     name:'itchao',
//     foo:foo
// }
// obj.foo()   // 对象obj调用了函数foo，因此this指向发起调用的obj对象

// 需求：将this的指向改变为指向obj1，但是不在obj1内添加属性
// 解决方法：使用call和apply函数，手动指定函数被调用时this的指向
// 总结：call和apply函数可以手动改变this指向
// let obj1 = {
//     name:'kobe',
//     age:18
// }
// foo.call()  // 只是调用了函数，没有改变this的指向，此时this指向全局作用域的window
// foo.call(obj1)  // 调用了函数且改变了this的指向，此时this的指向被手动的改变为指向obj1对象
// foo.apply()  // 只是调用了函数，没有改变this的指向，此时this指向全局作用域的window
// foo.apply(obj1)  // // 调用了函数且改变了this的指向，此时this的指向被手动的改变为指向obj1对象
// foo.apply('aaa')


// 2.call和apply有什么区别？
function sum(num1, num2){
    console.log(num1 + num2, this)
}

sum(20, 30, 40)
sum.call('call', 20, 30, 40)  // 调用sum函数且改变this指向为call，call是按照【剩余参数的模式】传递参数
sum.apply('apply', [20, 30, 40])  // 调用sum函数且改变this指向为apply，apply是按照【将参数放到一个数组】传递参数


// 3.call和apply在执行函数时，是可以明确的绑定this(传入的第一个参数就是this的指向)，这个绑定规则称之为显示绑定