const obj = {
  name: 'itchao',
  age: 22,
  height: 1.85
}

console.log(Object.entries(obj));
// [ [ 'name', 'itchao' ], [ 'age', 22 ], [ 'height', 1.85 ] ]

const objEntries = Object.entries(obj);
objEntries.forEach(item => {
  console.log(item[0], item[1]);
})

// 传入数组、字符串
console.log(Object.entries(['a1', 'b2', 'c3']));
console.log(Object.entries('abc'));