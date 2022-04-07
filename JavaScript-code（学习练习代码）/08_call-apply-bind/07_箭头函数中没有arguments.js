// 箭头函数中没有arguments，在箭头函数中使用arguments会往上层作用域中去查找对应的arguments
// 浏览器中没有arguments
// node中有arguments(node中一个js文件会被当成一个模块，模块会被当成一个函数，该函数会被执行)

// 案例一：
// let foo = () => {
//   console.log(arguments)
// }
//
// foo()

// 案例二：
// 箭头函数没有arguments，在箭头函数中查找arguments会往上层作用域进行查找
// function foo1() {
//   let bar = () => {
//     console.log(arguments)
//   }
//   return bar
// }
// let fn = foo1(1, 2, 3)
// fn()

// 案例三：
// 建议多使用ES6中的省略参数来接收多余的参数
// let foo2 = (num1, num2, ...args) => {
//   console.log(num1, num2, args)
//   console.log(args)
// }
// foo2(1, 21, 123, 2132, 12312)