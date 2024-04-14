// 面试题三
var n = 100
function foo1(){
    console.log(n)  // 输出结果：100（原因：函数的父级作用域是在定义的时候就决定好了，和调用位置无关）
}

function foo2(){
    var n = 200
    console.log(n)  // 输出结果：200（原因：查找变量按照作用域链依次向上查找）
    foo1()
}

foo2()
console.log(n)  // 输出结果：100（原因：查找变量按照作用域链依次向上查找）