let names = ['kobe', 'coderwhy', 'itchao']
// 原生写法
// let item1 = names[0]
// let item2 = names[1]
// let item3 = names[2]

// 数组解构: []
let [name1, name2, name3] = names
console.log(name1, name2, name3)

// 只解构后面元素
let [, name4, name5] = names
console.log(name4, name5)

// 解构出一个元素,后面的元素放到一个新数组中
let [item1, ...newNames] = names
console.log(item1)
console.log(newNames)

// 解构的默认值
let [x1, x2, x3, x4 = 'www'] = names
console.log(x1, x2, x3, x4)