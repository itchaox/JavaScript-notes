/*
 * @Version    : v1.00
 * @Author     : itchaox
 * @Date       : 2024-04-13 09:48
 * @LastAuthor : itchaox
 * @LastTime   : 2024-04-13 10:06
 * @desc       :
 */

let ageList = [12, 18, 25];

// 1. 数组解构（按顺序解构）
let [a1, a2, a3] = ageList;
console.log(a1, a2, a3); // 12 18 25

// 2. 解构后面数据, 用空逗号分割前面的数据
let [, , a4] = ageList;
console.log(a4); // 25

// 3. 解构时将后续数据放一个数组
let [b1, ...otherList] = ageList;
console.log(b1, otherList); // 12 [18, 25]

// 4. 解构时的默认值, ageList 只有 3 个数据，所以 c4 本来为 undefined，这里赋值默认值
let [c1, c2, c3, c4 = 88] = ageList;
console.log(c1, c2, c3, c4);
