// ES5

// 块代码
{
  // 表达式
  let foo = 'foo'
}

// 声明对象
let obj = {
  name:'itchao',
  age:18
}

// ES5没有块级作用域
// 块代码
{
  let foo = 'kobe'
}

// 在ES5中只有两个地方会形成作用域
// 1. 全局作用域
// 2. 局部作用域(函数作用域)
function  foo() {
  let height = 1.85
}