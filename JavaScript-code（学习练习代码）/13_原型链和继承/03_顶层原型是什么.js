let obj = {
  name:'itchao'
}

// console.log(obj.address)

// 到底打印到哪一层对象之后就停止查找了呢?
// 字面量对象obj的原型是:[Object: null prototype] {}
// [Object: null prototype] {}就是顶层原型

console.log(obj.__proto__)

// obj.__proto__:[Object: null prototype] {}
console.log(obj.__proto__.__proto__)