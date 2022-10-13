/*
 * @Desc:
 * @Version: v1.00
 * @Author: wc
 * @Date: 2022-10-09 08:55:05
 * @LastEditors: wc
 * @LastEditTime: 2022-10-09 09:09:06
 */

let arr = [1, 2, [3, [4, 5]]];

console.log(arr.flat(Infinity));

let string = "a";

let obj = {
  [string]: "is a string"
};

console.log(obj[string]);
console.log(obj.a);
