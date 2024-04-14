/*
 * @Desc:
 * @Version: v1.00
 * @Author: wc
 * @Date: 2022-10-08 14:49:40
 * @LastEditors: wc
 * @LastEditTime: 2022-10-08 16:09:48
 */

const arr = [1, 2, 3];
// console.log(...arr);

function counter(x, y, z) {
  return x + y + z;
}

// console.log(counter(...arr));

// 求数组最大值
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const max6 = Math.max(...numbers);
// console.log(max6);

const max5 = Math.max.apply(null, numbers);
// console.log(max5);

// 数组尾部添加另一数组
const last2 = [1, 2];
const last1 = [99, 100];
last1.push(...last2);
// console.log(last1);

// 复制数组(深拷贝)
const a1 = [1, 2];
const a2 = [...a1];
a2[0] = 99;
// console.log(a1, a2);

// 合并数组(浅拷贝)
// 对象数组中拷贝的是内存地址
let arr1 = [{ name: "1" }, { name: "2" }];
let arr2 = [{ name: "3" }, { name: "4" }];
let newArr = [...arr1, ...arr2];
console.log(newArr);
newArr[0].name = "change";
console.log(arr1, newArr);

// 生成器
Number.prototype[Symbol.iterator] = function* () {
  let i = 0;
  let num = this.valueOf();
  while (i < num) {
    yield i++;
  }
};

console.log([...5]);
