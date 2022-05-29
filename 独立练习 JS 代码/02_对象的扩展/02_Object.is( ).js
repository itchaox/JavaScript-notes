/*
 * @Desc: 
 * @Version: v1.00
 * @Author: wc
 * @Date: 2022-05-28 11:04:33
 * @LastEditors: wc
 * @LastEditTime: 2022-05-28 11:18:56
 */
// 作用:判断两值是否严格相等，与严格相等运算符 === 行为基本一致
// 特征: 
// 1. +0 不等于 -0; 
// 2. NaN 等于 NaN
console.log(Object.is('a', 'a'));

console.log(Object.is(+0, -0));
console.log(Object.is(NaN, NaN));
