/*
 * @Desc:
 * @Version: v1.00
 * @Author: wc
 * @Date: 2022-10-08 16:38:50
 * @LastEditors: wc
 * @LastEditTime: 2022-10-08 16:40:06
 */

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let newArray = arr.copyWithin(0, 7); // 8 9 10 4 ...
console.log(newArray);
