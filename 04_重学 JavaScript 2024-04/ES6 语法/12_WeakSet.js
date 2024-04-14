/*
 * @Version    : v1.00
 * @Author     : itchaox
 * @Date       : 2024-04-14 10:42
 * @LastAuthor : itchaox
 * @LastTime   : 2024-04-14 11:57
 * @desc       :
 */

// FIXME 和 Set 区别
// 1. WeakSet 只能传入对象格式
// 2. WeakSet 为弱引用，在垃圾回收检查引用情况时，WeakSet 虽然引用着，但是照样会进行垃圾回收
// 3. WeakSet 无法遍历

const weakSet = new WeakSet();

// TypeError: Invalid value used in weak set
// weakSet.add(1);

const obj = {
  name: 'abc',
};

// add
weakSet.add(obj);

// has
console.log(weakSet.has(obj)); // true

// delete
weakSet.delete(obj);

console.log(weakSet.has(obj)); // false
