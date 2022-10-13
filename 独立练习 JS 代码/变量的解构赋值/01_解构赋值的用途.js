/*
 * @Desc:
 * @Version: v1.00
 * @Author: wc
 * @Date: 2022-09-29 16:13:53
 * @LastEditors: wc
 * @LastEditTime: 2022-09-29 16:21:26
 */

// 1. 交换变量值

let x = 1;
let y = 2;
console.log(x, y);

[x, y] = [y, x];
console.log(x, y);

// 2. 从函数返回多个值
// 数组
function returnArrayFn() {
  return [1, 2, 3];
}

let [a, b, c] = returnArrayFn();
console.log(a, b, c);

// 对象
function returnObjectFn() {
  return {
    foo: "a word is foo",
    bar: "a word is bar"
  };
}

let { foo: word1, bar: word2 } = returnObjectFn();
console.log(word1, "-", word2);

// 3. 入参解构

function joinArray([a, b]) {
  console.log(a, b);
}

joinArray([111, 222]);

function joinObject({ foo, bar }) {
  console.log(foo, bar);
}

joinObject({ foo: "foo1", bar: "bar1" });
