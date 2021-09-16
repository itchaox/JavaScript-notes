// 函数调用函数的执行过程
// 函数的父级作用域和它的定义位置有关系，与调用位置没关系
// 面试题可能考
var name ='kobe'

function foo(){
    console.log(name)  // 输出结果：kobe
}

function bar(){
    var name = 'itchao'
    foo()
}

bar()
