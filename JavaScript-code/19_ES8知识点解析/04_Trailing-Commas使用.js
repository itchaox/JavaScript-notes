// 以逗号结尾
// ES8，新增了可以在函数的参数末尾多一个逗号，函数调用时传参数也可以多一个逗号

function foo(a, b,) {
  console.log(a, b);
}

foo(1, 3,)