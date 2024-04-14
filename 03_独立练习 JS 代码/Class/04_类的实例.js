/*
 * @Desc:
 * @Version: v1.00
 * @Author: wc
 * @Date: 2022-09-21 14:22:14
 * @LastEditors: wc
 * @LastEditTime: 2022-09-21 14:36:00
 */
class Point {
  constructor(x, y) {
    // 这里显示的定义在, 实例对象 this 自身
    this.x = x;
    this.y = y;
  }

  // 默认定义在原型上
  toString() {
    return "(" + this.x + ", " + this.y + ")";
  }
}

const point = new Point(2, 3);
const p2 = new Point();

let prototype = Object.getPrototypeOf(point);
console.log(prototype, "获取该对象原型");

console.log(point.__proto__ === p2.__proto__, "所有实例对象都指向同一个原型");

point.toString(); // (2, 3)

console.log('point.hasOwnProperty("x")', point.hasOwnProperty("x"));
console.log('point.hasOwnProperty("y")', point.hasOwnProperty("y"));
console.log(
  'point.__proto__.hasOwnProperty("y")',
  point.__proto__.hasOwnProperty("y")
);
console.log(
  'point.hasOwnProperty("toString")',
  point.hasOwnProperty("toString")
);
console.log(
  'point.__proto__.hasOwnProperty("toString")',
  point.__proto__.hasOwnProperty("toString")
);
