function foo() {
  throw new Error("主动抛出异常!");
}

// 方法一:不处理
// function test() {
//   foo();
// }

// 方法二: 使用 try catch 主动捕获异常
function test() {
  try {
    foo();
  } catch (err) {
    console.log("错误信息:", err.message);
  } finally {
    console.log("finally 处理事件!");
  }
}

function demo() {
  test();
}

// 两种处理方式:
// 方法一：不处理，则异常会进一步抛出，直到最顶层调用
//  如果最顶层也未对异常进行处理，则程序会终止执行，并且报错

demo();

// 方法二: 使用 try catch 捕获异常
