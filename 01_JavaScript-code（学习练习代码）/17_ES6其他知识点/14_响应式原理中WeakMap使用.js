// WeakMap应用场景（Vue3响应式原理）
const obj1 = {
  name: 'itchao',
  age: 22
}

function obj1Name1() {
  console.log('obj1Name1');
}

function obj1Name2() {
  console.log('obj1Name2');
}

function obj1Age1() {
  console.log('obj1Age1');
}

function obj1Age2() {
  console.log('obj1Age2');
}

const obj2 = {
  height: 1.85,
  address: '四川成都双流华阳北辰南湖香麓南一门'
}

function obj2Name1() {
  console.log('obj2Name1');
}

function obj2Name2() {
  console.log('obj2Name2');
}


// .0 创建WeakMap
const weakMap = new WeakMap();
// .1 收集依赖结构
// ·1-1 对obj1收集的数据结构
const obj1Map = new Map();
obj1Map.set('name', [obj1Name1, obj1Name2])
obj1Map.set('age', [obj1Age1, obj1Age2])
weakMap.set(obj1, obj1Map);
// .1-2 对obj2收集的数据结构
const obj2Map = new Map();
obj2Map.set('name', [obj2Name1, obj2Name2]);
weakMap.set(obj2, obj2Map);

// .2 如果obj1.name发生改变
// Proxy/Object.defineProperty
obj1.name = 'james'
const targetMap = weakMap.get(obj1);
const fns = targetMap.get('name')
fns.forEach(item => item())
