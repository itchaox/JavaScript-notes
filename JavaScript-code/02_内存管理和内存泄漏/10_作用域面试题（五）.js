// 面试题五
function foo(){
    var a = b = 100
    // 转成下面两行代码
    // var a = 100
    // b = 100
}

foo()

console.log(a)  // 输出结果：报错，未定义变量a，因为这里的a是定义的局部变量
console.log(b)  // 输出结果：100