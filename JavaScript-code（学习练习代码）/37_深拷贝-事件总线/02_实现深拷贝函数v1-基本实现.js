/*
 * @desc: 实现深拷贝函数
 * @Version: v1.00
 * @Author: wc
 * @Date: 2022-12-28 15:00:19
 * @LastEditors: wc
 * @LastEditTime: 2022-12-28 15:22:10
 */

function deepClone() {

}

let obj = {
  name: 'it',
  age: 23
}

const new1 = deepClone(obj)

console.log(new1 === obj);
console.log(new1);

console.log(typeof obj );
console.log(typeof []);

console.log(Symbol('11111111').description);