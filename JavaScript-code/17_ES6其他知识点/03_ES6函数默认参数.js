// 1.函数提供默认值
function foo(m = 1, n = 'aaa') {
  console.log(m, n);
}

// 调用函数时，若未传参，则可使用ES6默认参数
foo()


// 2.对象中参数默认值及默认值解构
// 前面是对象解构
// 后面是对象默认值
function Info({name,age} = {
  name: 'itchao',
  age: 22
}) {
  console.log(name, age);
}

Info({name: 'x',age: 2})

// 另外写法
function bar({name = 'coderwhy',age = 18} = {}) {
  console.log(name, age);
}

bar()


// 3.有默认值形参最好放最后
function a(x, y, z = 50) {
  console.log(x, y, z);
}

a(10, 20)

// 4. 有默认值函数，从默认值开始到最后的参数都算到length内
function b(z, x, c = 2) {
  console.log(z, x, c);
}
console.log(b.length);