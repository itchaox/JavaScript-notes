/*
 * @Desc: 
 * @Version: v1.00
 * @Author: wc
 * @Date: 2022-05-28 12:41:02
 * @LastEditors: wc
 * @LastEditTime: 2022-05-28 22:10:51
 */
// 作用:把源对象的属性复制到目标对象中(浅拷贝，复制的是对象内存地址，不是一个全新的对象)
// 特征:
// 1. 多个对象属性名相同时,后面属性会覆盖前面属性

// let obj1 = {a: 1}
// let obj2 = {b: 2}
// let obj3 = {c: 3}
// Object.assign(obj1, obj2, obj3)
// console.log(obj1);
// Object.assign(obj2, obj3)
// console.log(obj2);

// console.log(Object.assign(2));

//FIXME: 常见用途

// 1. 给对象添加属性
class p {
  constructor(x, y) {
    Object.assign(this, {x, y})
  }
}

let a = new p(1, 2)
// console.log(a);
let a1 = Object.assign({}, {name: 'itchao'})
console.log(a1);

