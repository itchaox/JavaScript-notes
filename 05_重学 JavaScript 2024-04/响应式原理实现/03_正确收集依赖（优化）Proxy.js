/*
 * @Version    : v1.00
 * @Author     : itchaox
 * @Date       : 2024-04-24 09:45
 * @LastAuthor : itchaox
 * @LastTime   : 2024-04-24 14:31
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

// 通过 Proxy 监听对象
// Proxy 是一个类

const objProxy = new Proxy(obj, {
  // 第二个参数是捕获器

  // 1. 获取
  get(target, key, receiver) {
    // 此处收集依赖
    const depend = getDepend(target, key);

    // 这里直接是无法渠道 fn 的，那就换个方式整，弄个全局变量存储当前的函数
    // depend.addDepend(fn);

    depend.addDepend(); // 完成依赖收集

    return Reflect.get(target, key, receiver);
  },

  // 2. 设置
  set(target, key, newValue, receiver) {
    Reflect.set(target, key, newValue, receiver);
    // 响应式执行收集到的所有依赖

    const depend = getDepend(target, key);

    depend.notify();
  },
});

// 需要一个函数监听这个对象的东西

function watchFn(fn) {
  currentFn = fn;
  fn();
  currentFn = null;
}

watchFn(function () {
  console.log(objProxy.name);
});

watchFn(function () {
  console.log('test', objProxy.name);
});

// 当 objProxy.name 的值修改时，需要响应式的去修改其他的使用到到的地方

objProxy.name = 'new';

// 刚刚我重头一点点的梳理，感觉好棒哦，一直自己思考，然后在想需要用到什么技术栈，然后这个地方是需要怎么处理，一直在思考

objProxy.name = 'wang';

// FIXME 但是现在这里存在一个问题，每次响应式监听到需要 new Proxy 一个对象，这样比较麻烦

function reactive(obj) {
  return new Proxy(obj, {
    // 第二个参数是捕获器

    // 1. 获取
    get(target, key, receiver) {
      // 此处收集依赖
      const depend = getDepend(target, key);

      // 这里直接是无法渠道 fn 的，那就换个方式整，弄个全局变量存储当前的函数
      // depend.addDepend(fn);

      depend.addDepend(); // 完成依赖收集

      return Reflect.get(target, key, receiver);
    },

    // 2. 设置
    set(target, key, newValue, receiver) {
      Reflect.set(target, key, newValue, receiver);
      // 响应式执行收集到的所有依赖

      const depend = getDepend(target, key);

      depend.notify();
    },
  });
}

const info = reactive({
  name: '123',
});

watchFn(() => {
  console.log('我在使用 info.name', info.name);
});

// 响应式更新了
info.name = '222';
info.name = '232';
info.name = '242';
