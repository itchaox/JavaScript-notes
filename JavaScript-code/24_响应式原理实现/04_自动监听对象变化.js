// 对象的响应式，首先创建一个对象
const obj = {
  name: 'itchao',
  age: 22,
  height: 1.85
}

// 封装一个响应式函数
class Depend {
  constructor() {
    this.r = []
  }

  addDepend(foo) {
    this.r.push(foo)
  }

  notify() {
    this.r.forEach(foo => {
      foo()
    })
  }
}

// 封装一个获取depend函数
const targetMap = new WeakMap()
function getDepend(target, key) {
  // 根据target对象获取map的过程
  let map = targetMap.get(target)
  if (!map) {
    map = new Map()
    targetMap.set(target, map)
  }

  // 根据key获取depend对象
  let depend = map.set(key)
  if (!depend) {
    depend = new Depend()
    map.set(key, depend)
  }
}

const depend = new Depend()
function watchFns(fn) {
  depend.addDepend(fn)
}

// 监听对象的属性变量，Proxy(Vue3),Object.defineProperty(Vue2)
const pObj = new Proxy(obj, {
  get(target, key, receiver) {
    return Reflect.get(target, key, receiver)
  },
  set(target, key, newValue, receiver) {
    Reflect.set(target, key, newValue, receiver)
    const depend = getDepend(target, key)
    depend.notify()
  }
})

watchFns(function () {
  console.log(pObj.name, '-----');
})

function foo() {
  console.log(pObj.age, '******');
}

pObj.name = 'coderwhy'