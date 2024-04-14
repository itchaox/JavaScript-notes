let n = 10

// 响应式，实时动态改变，蝴蝶效应
console.log(n);
console.log(n + 1);
console.log(n + 2);
console.log(n ** 2);

// 用的最多：对象的响应式
const obj = {
  name: 'itchao',
  age: 22,
  height: 1.85
}

console.log('--------------');
console.log(obj.name);
console.log(obj.age);
console.log(obj.height);
