// 隐式绑定：object.fn()
// object对象会被js引擎绑定到fn函数中的this里面


//      console.log(this)
//  }
// bar()  // 独立函数调用，this指向window

// 1.案例一：
// let obj = {
//     name:'itchao',
//     age:18,
//     foo(){
//     console.log(this)
// }
// }
//
// obj.foo()  // 通过对象进行调用函数，this指向调用的对象

// 2.案例二：
// let obj1 = {
//     name:'itchao',
//     eating() {
//         console.log(this.name + ' eating')
//     },
//     running() {
//         console.log(this.name + ' running')
//     }
// }
//
// obj1.eating()   // obj1对象调用eating函数，因此this指向了发起调用的obj1对象
// obj1.running()  // obj1对象调用running函数，因此this指向了发起调用的obj1对象

// 注意：
// let fn = obj1.eating
// fn()    // 此时fn函数为独立函数，因此this指向window

// 3.案例三：
let obj2 = {
    name:'kobe',
    age:18,
    foo() {
        console.log(this)
    }
}

let obj3 = {
    name:'coderwhy',
    age:19,
    bar:obj2.foo
}

obj3.bar()  // 对象obj3调用了函数bar，因此this指向发起调用的obj3对象
