// ES11, 对 for...in 进行标准化，用于遍历对象的key值

const info = {
  name: 'itchao',
  age: 22,
  height: 1.85
}

for (const item in info) {
  console.log(item);
}
