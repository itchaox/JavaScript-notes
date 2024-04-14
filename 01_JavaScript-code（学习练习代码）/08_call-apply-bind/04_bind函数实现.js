// 给所有函数添加一个hybind方法(实现bind方法)

Function.prototype.hybind = function(thisArg, ...argArray) {
  // console.log('在原型上添加hybind方法')

  // 1. 获取需要绑定的函数
  let fn = this
  // 2. 绑定this
  thisArg = (thisArg !== null && thisArg !== undefined) ? Object(thisArg) : window
  function proxyFn(...args) {
    // 3. 将函数放到thisArg中调用
    thisArg.fn = fn
    // 特殊:对两个传入参数进行合并
    let finalArgs = [...argArray, ...args]
    let result =  thisArg.fn(...finalArgs)
    delete thisArg.fn
    return result
  }
  // 返回结果
  return proxyFn
}


function foo() {
  console.log('foo函数:', this)
  return 180
}

function sum(num1, num2, num3, num4) {
  console.log(num1, num2, num3, num4)
}

// 系统调用bind方法
// let bar = foo.bind('aaa')
// bar()
//
// bind时传参
// let sum1 = sum.bind('bbb', 1, 20, 40 ,60)
// sum1()
// 调用时传参
// let sum2 = sum.bind('ccc')
// sum2(10, 30, 50, 70)
// 依次传参
// let sum3 = sum.bind('ddd', 10, 50)
// sum3(90, 100)

// 使用自己定义的hybind方法
// let bar = foo.hybind('aaa')
// let result = bar()
// console.log(result)

let newSum = sum.hybind('bbb', 10 , 200)
let result = newSum(20, 500)
