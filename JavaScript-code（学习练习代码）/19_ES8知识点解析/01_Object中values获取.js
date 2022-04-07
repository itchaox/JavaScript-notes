const foo = {
  name: 'itchao',
  age: 22,
  height: 1.85
}

// 获取对象所有key
console.log(Object.keys(foo));
// 获取对象所有value
console.log(Object.values(foo));

// 传入数组、字符串（用的少）
console.log(Object.values([1, 2, 3])); // 直接打印数组本身
console.log(Object.values('itchao')); // 将字符串拆分，然后再放入一个数组中