// 1. 对象中不能用对象作为属性名key
// const info = { name: 'itchao' }

// const obj = {
//   [info]: 'a'
// }

// console.log(obj);

// 2. Map 可以用对象作为属性名key
// 通过构造方法才创建 Map
const obj1 = {
  name: 'coderwhy'
}
const obj2 = {
  name: 'kobe'
}
const map = new Map();
map.set(obj1, 'a')
map.set(obj2, 'b')
map.set(1, 22)
console.log(map);

const a1 = {
  name: 'a1'
}
const b1 = {
  name: 'b1'
}
const c1 = {
  name: 'c1'
}
const map2 = new Map([
  [a1, 'a'],
  [b1, 'b'],
  [c1, 'c'],
  [2, 'd']
]);
console.log(map2);

// 3. 常见属性和方法
// 属性
console.log(map.size);
console.log(map2.size);

// 方法
// set(key, value) 新增属性
map2.set('chao', 'itchao')
console.log(map2);

// get(key) 获取属性
const getMap2 = map2.get('chao')
console.log(getMap2);

// has(key) 判断属性是否存在
const hasMap2 = map2.has('chao')
console.log(hasMap2);

// delete(key) 删除属性
map2.delete('chao')
console.log(map2);

// clear() 清除所有属性
// map2.clear()
// console.log(map2);

// 4. 遍历Map
map2.forEach((item, key) => console.log(item, key));

for (const item of map2) {
  console.log(item);
}

// [key, value] 数组解构
for (const [key, value] of map2) {
  console.log(key, value);
}