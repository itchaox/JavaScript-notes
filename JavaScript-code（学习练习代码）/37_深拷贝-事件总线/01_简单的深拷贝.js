/*
 * @desc: 
 * @Version: v1.00
 * @Author: wc
 * @Date: 2022-12-28 14:57:27
 * @LastEditors: wc
 * @LastEditTime: 2022-12-28 14:58:43
 */

let obj = {
  name: 'it',
  age: 23
}

let n1 = JSON.parse(JSON.stringify(obj))

console.log(n1 === obj);
console.log(n1);