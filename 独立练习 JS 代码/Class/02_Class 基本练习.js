/*
 * @Desc:
 * @Version: v1.00
 * @Author: wc
 * @Date: 2022-09-21 13:48:57
 * @LastEditors: wc
 * @LastEditTime: 2022-09-21 13:57:53
 */

class Animal {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  play() {
    console.log(this.name + this.age);
  }
}

const dog = new Animal("dog ", 1);
dog.play();

const cat = new Animal("cat ", 2);
cat.play();

console.log(typeof Animal);
