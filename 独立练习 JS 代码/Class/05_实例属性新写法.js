/*
 * @Desc:
 * @Version: v1.00
 * @Author: wc
 * @Date: 2022-09-21 14:47:14
 * @LastEditors: wc
 * @LastEditTime: 2022-09-21 14:51:06
 */

class Foo {
  // 实例属性新写法: 直接写在顶层, 是定义到实例对象上的属性, 不是定义在实例原型上
  name = "itchao";
  age = 22;

  play() {
    console.log("who is playing!");
  }
}

const f1 = new Foo();
console.log(f1);
console.log("f1.name", f1.name);
console.log("f1.age", f1.age);
console.log(f1.hasOwnProperty("name"));
console.log(f1.hasOwnProperty("age"));
console.log(f1.__proto__.hasOwnProperty("name"));
console.log(f1.__proto__.hasOwnProperty("age"));
