// {
//
// }
//
// // if语句代码是块级作用域
// if(true) {
//   var foo = 'foo'
//   let bar = 'bar'
// }
//
// // if语句代码是块级作用域
// switch (color) {
//   case 'red':
//     var age = 19
// }

// for语句代码时块级作用域
for (var i= 0; i < 10; i++) {

}
console.log(i)  // 可以访问i,因为var声明的没有块级作用域


for (let j= 0; j < 10; j++) {

}
console.log(j)  // 无法访问j,因为let声明的有块级作用域