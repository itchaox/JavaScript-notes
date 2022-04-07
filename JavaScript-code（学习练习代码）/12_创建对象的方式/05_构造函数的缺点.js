// 构造函数的缺点,创建很多的函数对象,不必要的浪费内存
function foo(){
  function bar(){  // 定义的时候是创建一个新的函数对象,每次的内存对象的地址都不一样

  }
  return bar
}

let fn1 = foo()
let fn2 = foo()

console.log(fn1 === fn2)