// js语法允许函数内部再定义函数
function foo(){
    function bar(){
        console.log('hello itchao')
    }
    // bar()  // 这里不直接执行函数
    // return bar() // 不要这样写，这样写是执行这个函数，把这个函数返回出去了，这里是需要直接返回这个函数
    return bar  // 把函数直接返回出去
}
var fn = foo()  // 用fn变量来接受返回出来的bar()函数
fn()  // 调用fn() 函数


// 使用场景案例(通过传入的参数，定制函数)
function makeAdder(count){
    function add(num){
        return count + num
    }
    return add
}
var add30 = makeAdder(30)
console.log(add30(70))
console.log(add30(150))
// 高阶函数：把一个函数如果接受另外一个函数作为参数，或者该函数会返回另外一个函数作为返回值的函数，那么这个函数就被称之为是一个高阶函数
// 上面的案例中makeAdder、foo是把另外一个函数作为返回值返回，所以makeAdder、foo是高阶函数