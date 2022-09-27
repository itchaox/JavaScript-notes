/*
 * @Desc:
 * @Version: v1.00
 * @Author: wc
 * @Date: 2022-09-21 13:44:33
 * @LastEditors: wc
 * @LastEditTime: 2022-09-21 13:47:01
 */

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `(${this.x}, ${this.y})`;
  }
}

const p1 = new Point(1, 3);
console.log("p1", p1);
console.log(p1.toString());
