/*
 * @Desc: 
 * @Version: v1.00
 * @Author: wc
 * @Date: 2022-05-27 22:54:36
 * @LastEditors: wc
 * @LastEditTime: 2022-05-28 09:41:54
 */
// 1. 合并数组
// let arr1 = [1, 2]
// let arr2 = [0, 3]
// let newArr = [...arr1, ...arr2]
// console.log('新数组:', newArr)

// 2. 与解构赋值结合
let list = [1, 2, 5, 7, 9]
let [a, ...rest] = list
// console.log(a, rest);


let go = function* () {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
}

// console.log([...go()]);


// Array.of 将一组数值转换成数组
console.log(Array.of(1, 2, 3, 4));
