// AO不适用的属性
// 闭包在引用外面自由变量的时候，js引擎会进行一定的优化，把没有使用到的自由变量进行销毁，便于腾出更多的空间
function foo(){
    let name = 'itchao'
    let age = 18
    function bar(){
        // debugger  打断点，查看闭包内的信息
        console.log(name)
        console.log(age)
    }
    return bar
}

let fn = foo()
fn()