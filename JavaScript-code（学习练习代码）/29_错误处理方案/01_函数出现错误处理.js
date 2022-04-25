function sum(num1, num2) {
  if (typeof num1 !== "number" || typeof num2 !== "number") {
    throw "参数类型不正确"; // 1.主动抛出异常，提示使用者解决异常，并且停止后续代码执行
    // return '参数类型不正确' // 2. return 提示使用者异常，但后续代码会继续执行
  }
  return num1 + num2;
}

console.log(sum("a", "2"));
