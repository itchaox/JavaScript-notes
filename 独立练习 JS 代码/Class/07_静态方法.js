/*
 * @Desc:
 * @Version: v1.00
 * @Author: wc
 * @Date: 2022-09-21 15:32:53
 * @LastEditors: wc
 * @LastEditTime: 2022-09-21 15:43:46
 */

class Foo {
  static play() {
    console.log("static play!");
    this.swimming();
    console.log(this);
  }

  swimming1() {
    console.log("swimming!");
  }

  static swimming() {
    console.log("static swimming!");
  }
}

Foo.play();
Foo.swimming();
