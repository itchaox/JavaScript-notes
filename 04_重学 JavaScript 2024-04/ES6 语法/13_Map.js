// Map 与对象区别：Map 可以使用对象作为 key

const obj1 = {
  name: 'abc',
};

const obj2 = {
  name: 'abc',
};

const obj3 = {
  [obj1]: 'test',
  [obj2]: 'test222',
};

// 对象作为其他对象的 key 时，只能直接解析为 '[object Object]'，然后导致两个 key 一样，后面的数值会覆盖前面的
console.log(obj3); // { '[object Object]': 'test222' }

const map = new Map();

// Map 的 key 可以是对象和普通类型
map.set(obj1, 't1');
map.set(obj2, 't2');
map.set('test', 'ttt');

console.log(map);
/**
 Map(3) {
  { name: 'abc' } => 't1',
  { name: 'abc' } => 't2',
  'test' => 'ttt'
 }
 */

//  size
console.log(map.size); // 3

// get
console.log(map.get('test')); // ttt

// has
console.log(map.has('test')); // true

// delete
console.log(map.delete('test')); // true

// forEach
map.forEach((value, key) => {
  console.log(value, key);
  // t1 { name: 'abc' }
  // t2 { name: 'abc' }
});

// for of
for (const [key, value] of map) {
  console.log(key, value);
  // { name: 'abc' } t1
  // { name: 'abc' } t2
}

// clear
map.clear();

console.log(map); // Map(0) {}
