// 代码块

// ES6的块级作用域
// 对let/const/function/class声明的类型是有效的
{
  var foo = 'itchao'
  let name = 'kobe' // let声明外界无法访问
  function bar(){}  // 函数声明外界无法访问(大部分浏览器有不同实现的[大部分浏览器为了兼容以前的代码,让function是没哟块级作用域])
  class Person{ }  //  class声明外界无法访问
}

console.log(foo)