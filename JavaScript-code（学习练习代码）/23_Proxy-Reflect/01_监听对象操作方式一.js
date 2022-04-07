// 使用 Object.defineProperty 监听对象属性
const obj = {
  name: 'itchao',
  age: 22,
  height: 1.85
};

Object.keys(obj).forEach(key => {
  let value = obj[key];
  Object.defineProperty(obj, key, {
    get() {
      console.log(`${key}执行get操作`);
      return value
    },
    set(newValue) {
      console.log(`${key}执行set操作`);
      value = newValue;
    }
  })
}
)
obj.name = 'coderwhy'
obj.age = 18
obj.height = 1.88

console.log(obj.name);
console.log(obj.age);
console.log(obj.height);

