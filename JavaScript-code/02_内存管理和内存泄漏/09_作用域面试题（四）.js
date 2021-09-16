// 面试题四
var a = 100
function foo(){
    console.log(a)  // 输出结果：undefined（原因：函数在运行前会编译，编译的时候a为undefined，AO:{a:undefined}）
    return  // 退出函数
    var a = 100
}

foo()