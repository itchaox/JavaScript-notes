const names = ['itchao', 'coderwhy', 'kobe']
const name = 'itchao'
const info = {
  name: 'itchao',
  age: 22,
  height: 1.85

}

// 剩余参数
function foo(...args) {
  console.log(args);
}

// 1. 函数调用时
foo(...names)
foo(...name)

// 2. 构造数组时
const newArray = [...names, ...name]
console.log(newArray);

// 3. 构建对象字面量时 ES2018(ES9)
const InfoA = {...info, ...names, address: '成都市'}
console.log(InfoA);

// 补充：展开运算符进行的是浅拷贝