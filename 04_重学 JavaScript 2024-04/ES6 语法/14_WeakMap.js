/*
 * @Version    : v1.00
 * @Author     : itchaox
 * @Date       : 2024-04-14 16:43
 * @LastAuthor : itchaox
 * @LastTime   : 2024-04-14 16:57
 * @desc       :
 */

// WeakMap 和 Map 区别
// 1. WeakMap 的 key 只能是对象数据格式
// 2. WeakMap 对 key 中的对象是弱引用，在垃圾回收中，如果该对象除了 WeakMap 之外没有其他引用指向，则会被垃圾回收

const weakMap = new WeakMap();

// TypeError: Invalid value used as weak map key
// weakMap.set(1, 'test');

const obj = {
  name: 'abc',
};

// set
weakMap.set(obj, 'test');

// 因为 weakMap 无法遍历，因此打印出来是 <items unknown>
console.log(weakMap); // WeakMap { <items unknown> }

// get
console.log(weakMap.get(obj)); // test

// has
console.log(weakMap.has(obj)); // true

// delete
console.log(weakMap.delete(obj)); // true
