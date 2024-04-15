/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2024-04-15 15:17
 * @LastAuthor : wangchao
 * @LastTime   : 2024-04-15 15:30
 * @desc       :
 */

// includes
// 判断一个数据是否在一个数组里面

const arr = [1, 2, 4, 6, 8];

// ES7 以前可以通过 indexOf 判断
// 如果数组内有该元素，则 indexOf 会返回对应的索引
// 如果数组内没有该元素，则 indexOf 会返回 - 1
// 所以由此可得，indexOf !== -1，则是数组内有该元素
// 但是其实这个做法是有一点绕的，不够直观

if (arr.indexOf(1) !== -1) {
  console.log("indexOf_数组内有该元素");
}

// includes，数组内有该元素则返回 true，否则返回 false

if (arr.includes(1)) {
  console.log("includes_数组内有该元素");
}
