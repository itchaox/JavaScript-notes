/*
 * @Desc: 
 * @Version: v1.00
 * @Author: wc
 * @Date: 2022-05-27 22:09:37
 * @LastEditors: wc
 * @LastEditTime: 2022-05-28 09:41:58
 */

//TODO: 1. 数组展开运算符
// function add(...item) { // 省略参数，把所有参数放到 item 数组中
//   console.log(...item); // 展开 item 数组
// }

// add(1,2,3)

// 数组展开运算符 ...
let arr = [
  {name:'超超', 
age:22},
{name:'chenChen',
age:22}
]

console.log(...arr);

let maxItem = Math.max(...[2,6,9])
console.log(maxItem);

//TODO: 2. 通过 push 把一个数组放到追加到另一个数组尾部
let arr1 = [1, 2, 3]
let arr2 = [7, 8, 9]
console.log(arr1, '追加前');

arr1.push(...arr2)
console.log(arr1, '追加后');

let date = new Date(...[2015, 1, 1])
console.log(date, 'date');
