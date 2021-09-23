// 默认绑定:独立函数调用,this指向全局作用域


// 案例一:
// function foo(){
//   console.log(this)
// }
//
// foo()


// 案例二:
// function foo1(){
//   console.log(this)
// }
//
// function  foo2(){
//   console.log(this)
//   foo1()
// }
//
// function  foo3(){
//   console.log(this)
//   foo2()
// }
//
// foo3()


// 案例三:(较难,重要!)
// let obj = {
//   name:'kobe',
//   foo() {
//     console.log(this)
//   }
// }
//
// let bar = obj.foo
// bar()  // 调用bar函数的时候是以独立函数进行调用,所以this还是指向window


// 案例四:
// function foo(){
//   console.log(this)
// }
//
// let obj = {
//   name:'coderwhy',
//   foo:foo
// }
//
// let bar = obj.foo
// bar()  // 调用bar函数的时候是以独立函数进行调用,所以this还是指向window


// 案例五:
function foo(){
  function bar(){
    console.log(this)
  }
  return bar
}

let fo = foo()
fo()  // 调用fo函数时是以独立函数进行调用,所以this还是指向window

let obj = {
  name:'james',
  studying:fo
}

obj.studying()  // 不是独立函数,这里是obj对象调用了函数studying,所以this指向obj(隐式绑定)