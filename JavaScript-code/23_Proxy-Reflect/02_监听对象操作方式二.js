// Proxy 实现监听对象
const info = {
  sex: 'male',
  age: 22,
  height: 1.85
}

const p = new Proxy(info, {
  // 获取值时的捕获器
  get(target, key) {
    console.log(key, '执行get操作');
    return target[key]
  },
  // 设置值时的捕获器
  set(target, key, newValue) {
    console.log('执行set操作');
    target[key] = newValue
  }
})

console.log(p.sex);
console.log(p.age);
console.log(p.height);

p.age = 18
console.log(p.age);