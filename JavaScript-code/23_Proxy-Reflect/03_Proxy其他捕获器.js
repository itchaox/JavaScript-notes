// Proxy 其他捕获器
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
  },

  // 监听in的捕获器
  has(target, key) {
    console.log(`${key}执行in操作`, target);
    return key in target
  },

  // 监听delete的捕获器
  deleteProperty(target, key) {
    console.log(`${key}执行delete操作`, target);
    delete target[key];

  }
})

// in 操作符
console.log('name' in p);

// delete 操作
delete p.sex
console.log(p);