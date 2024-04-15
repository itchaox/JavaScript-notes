/*
 * @Version    : v1.00
 * @Author     : itchaox
 * @Date       : 2024-04-14 10:42
 * @LastAuthor : itchaox
 * @LastTime   : 2024-04-14 16:11
 * @desc       :
 */
const set = new Set();

set.add(1);
set.add(2);
set.add(3);

console.log(set); // Set(3) { 1, 2, 3 }

// size
console.log(set.size); // 3

// delete
set.delete(1);
console.log(set); // Set(2) { 2, 3 }

// has
console.log(set.has(1)); // false
console.log(set.has(2)); // true

// forEach
set.forEach((item) => {
  console.log(item); // 依次打印 2 3
});

// for of
for (const item of set) {
  console.log(item); // 依次打印 2 3
}

// clear
set.clear();
console.log(set); // Set(0) {}

// 数组去重
let arr = [1, 2, 3, 1, 5, 2];

const newSet = new Set(arr);
console.log(newSet); // Set(4) { 1, 2, 3, 5 }

// Set 转数组
const setToArr = Array.from(newSet);
const setToArr1 = [...newSet];

console.log(setToArr); // [ 1, 2, 3, 5 ]

console.log(setToArr1); // [ 1, 2, 3, 5 ]
