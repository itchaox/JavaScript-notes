/*
 * @Version    : v1.00
 * @Author     : itchaox
 * @Date       : 2024-04-13 10:34
 * @LastAuthor : itchaox
 * @LastTime   : 2024-04-13 11:15
 * @desc       :
 */

// FIXME var
// 1. 可以重复声明
// 2. 会作用域提升，虽然访问到的数据是 undefined

console.log(a);
var a = 1;
var a = 2;

// ReferenceError: Cannot access 'a' before initialization
// console.log(b);

let b = 1;
// let b = 2;
// SyntaxError: Identifier 'b' has already been declared

// 此 {} 为一个块级作用域
{
  // var 不能在块级作用域中生效
  var a1 = 1;

  // let/const/function/class 才能在块级作用域中生效
  let a2 = 2;
}

console.log(a1);
// console.log(a2);

// if / switch / for 有块级作用域

// FIXME if
if (true) {
  var aIf = 1;
  let bIf = 1;
}

// console.log(aIf); // 1
// console.log(bIf); // ReferenceError: bIf is not defined

// FIXME switch
// let color = 'red';
// switch (color) {
//   case 'red':
//     var aSwitch = 1;
//     let bSwitch = 1;
// }

// console.log(aSwitch); // 1
// console.log(bSwitch); // ReferenceError: bSwitch is not defined

// FIXME for

const btns = document.getElementsByTagName('button');

// var
for (var i = 0; i < btns.length; i++) {
  btns[i].onclick = function () {
    // 函数内部找不到 i，则向上层作用域查找
    // 但是 var 不形成块级作用域
    // 因此找到的 i 为全局的变量，即执行完 for 循环的数值
    console.log(i); // 一直是 3
  };
}

for (let i = 0; i < btns.length; i++) {
  // let 形成块级作用域
  btns[i].onclick = function () {
    console.log(i); // 根据点击不同，分别展示 0 1 2
  };
}

// console.log('外部:', i); // 10

// let

// for (let i = 0; i < 10; i++) {
//   console.log('内部:', i);
// }

// console.log('外部:', i); // ReferenceError: i is not defined
