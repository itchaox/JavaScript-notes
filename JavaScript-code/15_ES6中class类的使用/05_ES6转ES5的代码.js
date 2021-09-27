class Person {
  // constructor(name, age) {
  //   this.name = name
  //   this.age = age
  // }
}

// let p = new Person('kobe', 18)
// console.log(p)

// babael转换
function _callCallCheck(instance, Constructor) {
  if(! (instance instanceof  Constructor)) {
    throw new TypeError('Cannot call a class a function')
  }
}
let foo = function Person() {

}

foo()

//  /*#__PURE__*/  纯函数
// webpack 压缩 tree-shaking
// 这个函数没作用
