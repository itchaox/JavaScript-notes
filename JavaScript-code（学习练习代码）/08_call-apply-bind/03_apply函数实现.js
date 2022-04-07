// 给所有函数添加一个hyapply方法(实现apply方法)

Function.prototype.hyapply= function (thisArg, argArray) {
  // 1. 获取到要执行函数
  let fn = this
  // 2. 处理绑定的thisArg
  thisArg = (thisArg !== null && thisArg !== undefined) ? Object(thisArg) : window
  // 3. 调用要执行函数
  thisArg.fn = fn
  var result
  // if(!argArray){  // 没有传参数
  //   result = thisArg.fn()
  // }else {  // 传递了参数
  //   result = thisArg.fn(...argArray)
  // }
  // argArray = argArray ? argArray : []
  argArray = argArray || []  // 判断数组是否为空,如果为空则传入空数组
  result = thisArg.fn(...argArray)
  delete  thisArg.fn
  // 4. 返回结果
  return result
}

function sum(num1, num2) {
  console.log('sum函数被调用:',this, num1, num2)
  return num1 + num2
}

function foo(num3) {
  console.log('数字3:', this, num3)
  return num3
}

function bar() {
  console.log('函数bar', this)
}

// 系统调用实现apply方法
// let sum1 = sum.apply('aaa',[10, 26])  // apply调用时参数为数组形式
// console.log(sum1)

// 自己实现hyapply方法
// let result = sum.hyapply('bbb',[100, 200])
// console.log(result)
//
// let result1 = foo.hyapply('ccc', [80])
// console.log(result1)

let result2 = bar.hyapply('ddd',[])
console.log('空数组:', result2)