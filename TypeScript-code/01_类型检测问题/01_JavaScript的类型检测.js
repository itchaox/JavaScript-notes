// 当前foo函数,在被其他地方调用时,没有做任何的参数校验
// 1.没有对参数进行校验
// 2.没有对是否有参数进行校验

function foo(message) {
  console.log(message.length)
}

foo('itchao')
foo('coderwhy')
foo('kobe')

// foo()  // 未传入适当的参数,代码错误,会报错
// 由于上面报错,所以这里永远不会执行
// console.log('由于前面报错!这里不会执行!')

// 定义变量

let bar = '123'
bar = 123