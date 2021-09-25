// 一. 编写箭头函数
// 箭头函数格式：
// 1. ():参数
// 2. =>:箭头
// 3. {}:函数执行体

// 箭头函数完整写法：
// let foo = (item) => {
//   console.log(item)
// }

// 普通函数写法：
// let bar = function (index) {
//   console.log(index)
// }


// 高阶函数在使用时，也可以传入箭头函数
let nums = [10, 20, 30, 40, 50]  // 后面使用的数组都是该数组
nums.forEach((item,index,arr) => {
  console.log(item * 2, index, arr)
  // 输出结果：
  // 40 1 [ 10, 20, 30, 40, 50 ]
  // 60 2 [ 10, 20, 30, 40, 50 ]
  // 80 3 [ 10, 20, 30, 40, 50 ]
  // 100 4 [ 10, 20, 30, 40, 50 ]

})


// 箭头函数常见简写方式：

// 简写一：如果参数只有一个时，那么()可以省略
// let players = ['kobe', 'james', 'curry', 'coderwhy', 'itchao']
// players.forEach(item => {  // 参数为一个时，可以省略()
//   console.log(item)  // 输出结果：kobe james curry coderwhy itchao
// })

// 简写二：如果函数执行体只有一行代码，那么{}也可以省略
// 强调：并且它会默认将这行代码的执行结果作为返回值
// nums.forEach(item => console.log(item * 2))  // 输出结果:20, 40, 60, 80, 100
// let newNums = nums.filter(item => item % 20 === 0)
// console.log(newNums)  // 输出结果：[20, 40]

// 结合filter/map/reduce函数将nums进行一系列操作，先对nums进行求余20操作，再进行乘以20操作，最后进行求和操作
// let sum = nums.filter(item => item % 20 ===0 ).map(item => item * 20).reduce((preValue, item) => preValue + item)
// console.log(sum)  // 输出结果：1200

// 简写三(注意)：如果一个箭头函数，只有一行代码，并且返回一个对象，这时怎么编写箭头函数的简写
// 需求代码格式：
// let bar = () => {
//   return {name:'kobe', age:18}
// }
// 对应的箭头函数简写格式：
// let bar = () => ({name:'kobe', age:18})  // 注意：箭头函数执行体只有一行代码对象时，简写需要将函数执行体放入()中，当成一个整体
