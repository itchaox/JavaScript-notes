// 1. ||= 逻辑或赋值运算
// let msg = undefined;
// msg = msg || '默认值（逻辑或赋值运算）'
// msg ||= '默认值（逻辑或赋值运算）'
// console.log(msg);


// 2. &&= 逻辑与赋值运算(使用场景很少)
// const obj = {
//   name: 'itchao',
//   foo: function () {
//     console.log('foo 函数被调用');
//   }
// };
// 判断前面的值是否存在，若存在则才继续判断后面的值是否存在
// obj && obj.foo && obj.foo()
// let info = {
//   name: 'itchao',
//   age: 22,
//   height: 1.85
// }

// info = info && info.name
// console.log(info);

// info &&= info.name
// console.log(info);


// 3. ??= 逻辑空赋值运算
// let a = ''
// a = a ?? '默认值（逻辑空赋值运算）'
// console.log(a);

// a ??= '默认值（逻辑空赋值运算）'
// console.log(a);