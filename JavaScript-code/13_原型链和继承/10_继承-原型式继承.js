let obj = {
  name:'kobe',
  age:18,
  play(){
    console.log('play basketball!')
  }
}

// console.log(obj);

// 原型式继承函数
function createObject(o){
  let newObj = {}
  Object.setPrototypeOf(newObj, o)
  return newObj
}

let bar = createObject(obj)
console.log(bar.__proto__);

// 最初实现原型式继承函数代码
function createObject2(o){
  function Fo(){ }
  Fo.prototype = o
  let newObj = new Fo()
  return newObj
}

let info = createObject2(obj)
console.log(info.__proto__);

// ES实现的Object.create()函数直接实现原型式继承
let foo = Object.create(obj)
console.log(foo.__proto__);