/*
 * @Desc:
 * @Version: v1.00
 * @Author: wc
 * @Date: 2022-10-08 16:15:32
 * @LastEditors: wc
 * @LastEditTime: 2022-10-08 16:22:12
 */
// 作用: 将类数组对象转换成真正数组

let arrObj = {
  0: "a",
  1: "b",
  2: "c",
  length: 3
};

console.log(arrObj);

let changeObjToArray = Array.from(arrObj, x => x + "1");
console.log(changeObjToArray);
