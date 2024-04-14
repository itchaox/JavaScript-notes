/*
 * @Desc:
 * @Version: v1.00
 * @Author: wc
 * @Date: 2022-09-21 15:02:23
 * @LastEditors: wc
 * @LastEditTime: 2022-09-21 15:12:27
 */

class Foo {
  constructor(age) {
    this.name = "itchao";
    this.age = age;
  }

  get name() {
    console.log("get name");
  }

  set name(value) {
    console.log(value);
    // this.name = value;
  }
}

const f1 = new Foo("2");

console.log(f1);
// f1.name = "chenchen";
console.log(f1);
