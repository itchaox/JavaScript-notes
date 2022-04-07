// 1. 测试箭头函数中this的指向,箭头函数是不绑定this 的
// let name = 'kobe'
//
// let foo = () => {
//   console.log(this)  // 箭头函数的this由外层作用域决定，箭头函数是不绑定this的
// }
//
// foo()  // 输出结果：window，独立函数调用
// foo.call('aaa')  // 输出结果：window,显式绑定
//
// let obj = {foo:foo}

// 2. 应用场景
let obj = {
  data:[],
  getData() {
    // 发送网络请求，将结果放在上面的data属性中
    // 箭头函数之前的做法：
    // let that = this
    // setTimeout(function() {
    //   let nums = [10, 20, 30, 40, 50]
    //   that.data = nums
    //   console.log(this)  // this指向window，原因：setTimeout函数的内部是独立函数调用
    // }, 1000)
    // 箭头函数之后的做法：
    setTimeout(() => {
      let nums = [10, 20, 30, 40, 50]
      this.data = nums
      console.log(this)  // this指向obj对象，原因：箭头函数中的this是根据外层作用域决定的
    }, 2000)
  },
}
obj.getData()  // 隐式绑定，改变this的指向为指向obj对象