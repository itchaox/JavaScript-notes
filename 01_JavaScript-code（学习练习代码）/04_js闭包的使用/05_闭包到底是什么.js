// 闭包使用案例

function foo(){
  let name = 'itchao'
  // console.log(age)  // 层作用域无法访问内存作用域,会报错:age未定义
  function bar(){
    let age = 18
    console.log('hello bar!',name,age)  // 内层作用域访问外层作用域,闭包的体现
  }
  return bar
}

let fo = new foo()
fo()  // 即使脱离了捕捉到上下文,它也能照常运行