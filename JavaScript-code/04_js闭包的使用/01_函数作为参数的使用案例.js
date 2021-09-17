// 函数的基本使用
function foo(val){
    console.log('itchao',val)
}
foo(321)

// 将函数作为另外一个函数的参数
function add(math){  // math这里是形参，可以自定义
    math()
}

function sum(){
    console.log('求和函数！')
}
add(sum)

// 函数作为参数的使用案例
function calc(num1, num2, calcFn){
    console.log(calcFn(num1, num2))
}

function add(num1, num2){
    return num1 + num2
}

function sub(num1, num2){
    return num1 - num2
}

function mul(num1, num2){
    return num1 * num2
}

var m = 20
var n = 80
calc(m, n, add)
calc(m, n, sub)
calc(m, n, mul)

