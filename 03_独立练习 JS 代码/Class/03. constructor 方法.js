/*
 * @Desc:
 * @Version: v1.00
 * @Author: wc
 * @Date: 2022-09-21 14:08:25
 * @LastEditors: wc
 * @LastEditTime: 2022-09-21 14:16:55
 */

// 1. constructor 是类的默认方法
class Foo {}

// 等价于

// class Foo {
//   constructor() {}
// }

// 2. constructor 默认返回实例对象 this
console.log(new Foo() instanceof Foo); // true, Foo 的实例对象来源于 Foo 类

class Bar {
  constructor() {
    return {}; // constructor 默认返回实例对象 this, 这里特意返回一个新的对象 {}, 导致 Bar 的实例不属于 Bar 类
  }
}

console.log(new Bar() instanceof Bar);

// 3. 类必须用 new 调用
class People {}

new People(); // 正确
// People() // 报错
