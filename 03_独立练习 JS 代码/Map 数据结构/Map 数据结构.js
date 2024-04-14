/*
 * @Desc:
 * @Version: v1.00
 * @Author: wc
 * @Date: 2022-08-18 16:16:17
 * @LastEditors: wc
 * @LastEditTime: 2022-08-18 16:43:02
 */
// Map 数据结构(键值对, 键可以是任意值)

let obj = {
  name: "itchao"
};

const m = new Map();
// console.log(m);

m.set(obj, "222");
// console.log(m);

// console.log(m.get(obj));

let arr = [
  ["name", "itchao"],
  ["age", "18"]
];

const m1 = new Map(arr);
// console.log(m1.get("name"));

const m2 = new Map();

let k1 = ["a"];
let k2 = ["a"];

m2.set(k1, 11).set(k2, 222);

console.log("m2.get(k1)", m2.get(k1));
console.log("m2.get(k2)", m2.get(k2));
