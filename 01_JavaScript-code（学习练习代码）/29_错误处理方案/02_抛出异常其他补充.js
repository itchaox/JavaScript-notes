// 创建异常类
class WCError {
  constructor(err, msg) {
    this.err = err;
    this.msg = msg;
  }
}

function foo(type) {
  console.log("开始执行!");

  if (type === 0) {
    // throw "类型不能为 0"; // 1. 抛出基本数据类型（String，Number， Boolean）
    // throw { ErrorCode: -1, ErrorMessage: "类型不能为 0" }; // 2. 常见用法：抛出对象
    // throw new WCError(-1, "类型不能为 0"); // 3. 定义一个类，然后使用类抛出异常
    // throw new Error("类型不能为 0");
    // 4. 使用JavaScript 内置定义好的 Error 错误抛出类
    /**
     *  4.1 Error 包含三个属性
     *   01_ message： 创建 Error 对象时传入的 message
     *   02_ name：Error 的名称，通常和类名一致
     *   03_ stack：整个 Error 错误信息，包括函数调用栈，直接打印 Error 对象时，打印的就是 stack
     *  4.2 Error 子类
     *   01_ RangeError：下标值越界的错误类型
     *   02_ SyntaxError：解析语法的错误类型
     *   03_ TypeError：类型错误的错误类型
     */
    throw new TypeError("类型错误:不能为 0!"); // 5. TypeError（类型错误） 为 Error 子类

    //TODO: throw 抛出错误后，后续代码不再执行
  }

  console.log("结束执行");
}

foo(0);

//TODO: 函数调用栈：函数调用的顺序
// 例子(a3 -> a2 -> a1)

function a3() {
  console.log("打印a3函数信息!");
}

function a2() {
  a3();
}

function a1() {
  a2();
}
