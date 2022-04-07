function createObject(o) {
  function Fn() {}
  Fn.prototype = o
  return new Fn()
}

function inheritPrototype(SubType, SuperType){
  SubType.prototype = createObject(SuperType.prototype)
  Object.defineProperty(SubType.prototype,'constructor', {
    enumerable:false,
    configurable:true,
    writable:true,
    value:SubType
  })
}

function Person() {

}

function Student() {

}

inheritPrototype(Student, Person)

let stu = new Student()
// instanceog判断构造函数的prototype是否存在于某个实例对象的原型链上
console.log(stu instanceof Student); // true
console.log(stu instanceof Person);  // true
console.log(stu instanceof Object);  // true