// 1. WeakMap和Map的区别一：WeakMap的key必须是对象类型
const weakMap1 = new WeakMap();
// weakMap1.set(1, 'w')
console.log(weakMap1);
// WeakMap { <items unknown> } 因为WeakMap无法遍历

// 2. 区别二： WeakMap对元素的引用是弱引用
const obj = {
  name: 'obj'
}

const map = new Map()
map.set(obj, 'a')
console.log(map);

const weakMap = new WeakMap()
weakMap.set(obj, 'b')
console.log(weakMap);

// 3. WeakMap常见方法
// get方法，获取值
console.log(weakMap.get(obj));

// has方法，判断值是否存在
console.log(weakMap.has(obj));

// delete方法，删除值
weakMap.delete(obj);
console.log(weakMap);