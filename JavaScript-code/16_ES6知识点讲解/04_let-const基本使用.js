// let 和 var 使用方法区别不大
var foo = 'itchao'

let bar = 'kobe'

// const 定义常量

const name = 'coderwhy'
// name = 123  // const定义的变量,无法再次赋值

// 注意事项一:const 本质上是传递的值不能修改
// 但是如果传递的是一个引用类型(内存地址)
// 那么不能修改引用类型的内存地址,但是可以直接修改引用类型的属性
const obj = {
  name:'james'
}

// obj = ''  // 不能直接给对象进行赋值
obj.name = 'curry'  // 但是可以直接给对象内的属性赋值

// 注意事项二: 通过let/const定义的变量名是不可以重复定义
// var 定义变量,可以重复命名
// let/const 定义变量,不可以重复命名