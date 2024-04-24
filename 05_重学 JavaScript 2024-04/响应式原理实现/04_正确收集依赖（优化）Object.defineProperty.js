/*
 * @Version    : v1.00
 * @Author     : itchaox
 * @Date       : 2024-04-24 09:45
 * @LastAuthor : itchaox
 * @LastTime   : 2024-04-24 15:28
 * @desc       :
 */

let currentFn = null;

// 需要一个地方来收集一个变量被哪些函数调用了
class Depend {
  constructor() {
    this.fnList = new Set();
  }

  addDepend() {
    if (currentFn) {
      this.fnList.add(currentFn);
    }
  }

  notify() {
    this.fnList.forEach((fn, index) => {
      fn();
    });
  }
}

let targetMap = new WeakMap();
function getDepend(target, key) {
  let map = targetMap.get(target);
  if (!map) {
    map = new Map();
    targetMap.set(target, map);
  }

  // 此时必有 map

  let depend = map.get(key);
  if (!depend) {
    depend = new Depend();
    map.set(key, depend);
  }

  return depend;
}

// 对象监听，先整一个对象

const obj = {
  name: 'aaa',
  age: 18,
};

// 需要一个函数监听这个对象的东西
function watchFn(fn) {
  currentFn = fn;
  fn();
  currentFn = null;
}

// FIXME 但是现在这里存在一个问题，每次响应式监听到需要 new Proxy 一个对象，这样比较麻烦

function reactive(obj) {
  // 要监听一个对象所有的 key

  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    Object.defineProperty(obj, key, {
      get() {
        const depend = getDepend(obj, key);

        // 收集
        depend.addDepend();

        return value;
      },

      set(newValue) {
        value = newValue;

        const depend = getDepend(obj, key);

        //  通知
        depend.notify();
      },
    });
  });

  return obj;
}

const info = reactive({
  name: '123',
});

watchFn(() => {
  console.log('我在使用这个属性', info.name);
});

info.name = 222;
