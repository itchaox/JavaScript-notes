/*
 * @Version    : v1.00
 * @Author     : itchaox
 * @Date       : 2024-04-12 22:35
 * @LastAuthor : itchaox
 * @LastTime   : 2024-04-13 09:34
 * @desc       :
 */

// 定义一个变量

let age = 18;

// {} 为字面量语法
// let obj = {}

let obj = {
  // age: age
  // 属性简写
  age,

  // getName: function() {}
  // 函数简写
  getName() {},

  // 计算属性名
  [age + 222]: 222,
};

obj[age + 123] = 123;

console.log(obj);
