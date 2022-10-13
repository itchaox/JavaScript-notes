/*
 * @Desc:
 * @Version: v1.00
 * @Author: wc
 * @Date: 2022-10-08 16:43:04
 * @LastEditors: wc
 * @LastEditTime: 2022-10-08 16:54:00
 */

let arr = [
  {
    name: "itchao",
    id: 1
  },
  {
    name: "chenchen",
    id: 2
  },
  {
    name: "itchao",
    id: 3
  }
];

let item = arr.find(i => i.name === "itchao");
let itemIndex = arr.findIndex(i => i.name === "itchao");
// console.log(item, itemIndex);

let itemLast = arr.findLast(i => i.name === "itchao");
let itemIndexLast = arr.findLastIndex(i => i.name === "itchao");
console.log(itemLast, itemIndexLast);
