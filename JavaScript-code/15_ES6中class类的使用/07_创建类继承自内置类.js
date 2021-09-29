// class Person {
//
// }
//
// class Student extends Person {
//
// }
//

// class foo extends Person {
//
// }

// 对系统类进行扩展
class HYArray extends Array {
  firstItem() {
    return this[0]
  }

  lastItem(){
    return this[this.length-1]
  }
}


let arr = new Array(1, 2, 3)
let hyArr = new HYArray(1, 7 ,9 ,10)

console.log(arr)

console.log(hyArr.firstItem())
console.log(hyArr.lastItem())