function foo(num1, num2) {
  console.log(arguments)
  // 自己遍历
  // let newArray = []
  // for (let i = 0; i< arguments.length; i++) {
  //   newArray.push(arguments[i] * 10)
  // }
  // console.log(newArray)
  // 2. arguments转array类型
  // 2.1 自己遍历arguments中的所有元素

  // 2.2 通过Array.prototype.slice方法将arguments转成array类型
  let newArray2 = Array.prototype.slice.call(arguments)
  console.log(newArray2)

  let newArray3 = [].slice.call(arguments)
  console.log(newArray3)

  // 2.3 ES6语法
  let newArray4 = Array.from(arguments)
  console.log(newArray4)

  // 2.4 展开运算符
  let newArray5 = [...arguments]
  console.log(newArray5)
}

foo(1, 2, 23, 50 , 70)



// 额外补充知识点：Array中slice的实现
// Array.prototype.hyslice = function (start, end) {
//   let arr = this
//   start = start || 0
//   end = end || arr.length
//   let newArray = []
//   for(let i = start; i< end; i++) {
//     newArray.push(arr[i])
//   }
//   return newArray
// }
//
// let newArray = Array.prototype.hyslice.call(['aaa', 'bbbb', 'ccc'],1, 2)
// console.log(newArray)

// let names = ['kobe', 'james', 'curry', 'coderwhy', 'itchao']
// names.slice