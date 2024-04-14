// ES5 写法

// 缺点：
// 1. 可读性不高
// 2. 麻烦
// 3. 存在漏洞，如 0 和 '' 都被识别为 false，导致入参数据不对
function fn(m, n) {
  m = m || 'aaa';
  n = n || 'bbb';

  console.log(m, n);
}

fn(0, '');

// ES6
function bar(m = 2, n = 1) {
  console.log(m, n);
}

bar(); // 2 1
bar(0, ''); // 0 ''

// 函数参数为对象默认值写法
function barObject({ name, age } = { name: '123', age: 18 }) {
  console.log(name, age);
}

barObject(); // '123' 18
barObject({ name: 'abc', age: 20 }); // 'abc' 20

// 此处右侧必须写 {} 为整个入参对象的默认值, 否则无法给对应的 name 和 age 赋初始值
// 不写右侧 {} 报错：TypeError: Cannot read properties of undefined (reading 'name')
function barObject1({ name = '123', age = 20 } = {}) {
  console.log(name, age);
}

barObject1(); // '123' 20
barObject1({ name: 'abc', age: 22 }); // 'abc' 22

// 默认参数最好放后面，这样在调用时就不用传入多余的 undefined 占位
function test(m, n = 20) {}

function test1(m = 20, n) {
  console.log(m, n);
}

test1(undefined, 2);
