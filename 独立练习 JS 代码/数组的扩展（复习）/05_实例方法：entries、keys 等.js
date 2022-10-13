/*
 * @Desc:
 * @Version: v1.00
 * @Author: wc
 * @Date: 2022-10-08 17:12:57
 * @LastEditors: wc
 * @LastEditTime: 2022-10-08 17:23:56
 */

let arr = [
  { name: 1, id: 2 },
  { name: 2, id: 3 },
  { name: 5, id: 9 }
];

for (let item of arr.entries()) {
  // console.log(item);
}

for (let value of arr.values()) {
  // console.log(value);
}

for (let key of arr.keys()) {
  // console.log(key);
}

let newArr = [
  { name: "2", id: 2 },
  { name: "3", id: 3 }
];

console.log(newArr.includes(a => a));
