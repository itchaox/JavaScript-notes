function foo(num1, num2, num3) {
  // 类数组对象中（长得像数组，本质是对象）:arguments
  console.log(num1, num2, num3)  // 输出结果：1 2 3
  console.log(arguments)  // 输出结果：[Arguments] { '0': 1, '1': 2, '2': 3, '3': 50, '4': 80 }

  // arguments三个常见操作
  // 1. 获取参数长度
  console.log(arguments.length)  // 输出结果：5
  // 2. 根据索引值获取某一个参数
  console.log(arguments[0])  // 输出结果：1
  // 3. callee获取当前arguments所在函数
  console.log(arguments.callee)
}
foo(1, 2, 3, 50, 80 )