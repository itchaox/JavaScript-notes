const name:string = 'kobe'
let age:number = 18

console.log(name)
console.log(age)


// 如果同样的变量名几个文件都是用的时候出现冲突报错，那么可以写入下面代码，将该文件包裹为模块文件，避免冲突报错
export {}