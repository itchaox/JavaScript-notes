// 给所有函数添加一个hycall方法(实现call方法)

Function.prototype.hycall = function (thisArg, argArray) {
  // 在这里可以去执行调用的函数(foo)
  // 问题:得可以去获取哪一个函数执行了hycall
  // 1. 获取需要被执行函数,this
  // this()
  // 2. 让thisArg转成对象类型(防止它传入非对象类型)
  thisArg = (thisArg !== null && thisArg !== undefined)  ?  Object(thisArg) : window
  // 3. 调用需要被执行的函数
  thisArg.this = this
   let result = thisArg.this(...args)
  delete thisArg.fn
  thisArg.fn(...argArray)
  // 4. 将最后的结果返回出去
  return result
}

function foo() {
  console.log('foo', this)
}

function sum(num1, num2) {
  return num1 + num2
}

// 系统的函数call方法
foo.call() // 输出结果:window
let result = sum.call({}, 20, 30)
console.log('系统调用结果:', result)


// 自己实现的hycall方法
// 默认进行this隐式绑定
// foo.hycall(123)
let result1 = sum.hycall('abc',1231, 612)
console.log('hycall调用结果:', result1)