// ES6剩余参数

function sum(num1, num2, num3, ...args) {
  console.log(num1, num2 , num3)
  console.log(args)  // args是一个数组类型
}

sum(1, 2, 3, 4, 5 ,6 , 7, 8, 9)

function sum1(...args) {
  console.log(args)
}

sum1(1)
sum1(1, 3)
sum1(1, 3, 4, 6)

// 展开运算符(挨个取出数组内的元素)
let names = ['kobe', 'coderwhy', 'itchao']
let newNames = [...names]

function foo(name1, name2, name3) {
  console.log(name1 + ' ' + name2 + ' ' +name3)
}

foo(...names)

