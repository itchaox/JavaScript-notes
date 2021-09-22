let obj = {
  name:'itchao',
  age:18
}

// [[get]]操作
// 1.在当前对象查找属性
// 2.如果没有找到,这个时候就会去原型(__proto__)对象上查找
// 3.可以一直沿着对象的__proto__上查找相关的属性,如果一直没有则返回null

obj.__proto__.address = '南湖立交地铁站'
obj.__proto__ = {

}

obj.__proto__.__proto__ = {
  game:'lol'
}
console.log(obj)
// 原型链
console.log(obj.address)
console.log(obj.game)