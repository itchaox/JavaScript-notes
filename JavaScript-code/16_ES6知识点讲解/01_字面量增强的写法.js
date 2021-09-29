let name = 'itchao'
let age = 18

let obj = {
  // 1. 属性简写
  name,
  // 原生属性
  age:age,

  // 2. 简写方法
  foo() {
  },
  // 原生方法
  bar:function(){
},

  // 3. 计算属性名
  [name + 123]:'coderwhy'
}

console.log(obj)