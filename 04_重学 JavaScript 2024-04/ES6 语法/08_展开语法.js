/*
 * @Version    : v1.00
 * @Author     : itchaox
 * @Date       : 2024-04-14 09:00
 * @LastAuthor : itchaox
 * @LastTime   : 2024-04-14 09:22
 * @desc       :
 */

const names = ['abc', 'bbb', 'aaa'];

const name = 'abc';

function fn(x, y, z) {
  console.log(x, y, z);
}

// 此处将数组依次展开, 不够的地方直接显示 undefined
fn(...names);

// 将字符串依次拆分，不够的地方直接显示 undefined
fn(...name);

// 数组浅拷贝，拷贝的是引用数据的引用地址
let newNames = [...names];
console.log(newNames); // ['abc', 'bbb', 'aaa]

// 数组合并
let mergeList = [...newNames, ...['test']];
console.log(mergeList); // ['abc', 'bbb', 'aaa', 'test']

// 对象浅拷贝，拷贝的是引用数据的引用地址

let obj = {
  name: 'abc',
  age: 18,
  test: {
    name: 'aaa',
  },
};

let newObj = {
  ...obj,
  class: 'english',
};

console.log(newObj); // { name: 'abc', age: 18, test: { name: 'aaa' }, class: 'english' }

newObj.test.name = 'newAAA';

// 因为修改的是 obj 内的 test 对象，此时 ...浅拷贝只是拷贝了 test 的引用地址
// 所以修改 newObj.test.name 时会影响 obj.test.name
// 因为实际上 newObj.test 和 obj.test 是同一个引用地址（内存中表现），所以其实就是同一个对象

console.log(obj); // { name: 'abc', age: 18, test: { name: 'newAAA' } }
