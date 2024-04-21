/*
 * @Version    : v1.00
 * @Author     : itchaox
 * @Date       : 2024-04-20 15:55
 * @LastAuthor : itchaox
 * @LastTime   : 2024-04-20 16:25
 * @desc       :
 */

// 监听对象，因此先声明一个对象
const obj = {
  name: 'aaa',
  age: 18,
};

// Proxy(targe, handler) 是一个类
// targe：需要代理的对象
// handler：捕获器，处理 get、set 等

const objProxy = new Proxy(obj, {
  // 访问
  get(target, key) {
    console.log(`属性 ${key} 被访问`);
    return target[key];
  },

  // 设置
  set(target, key, newValue) {
    console.log(`属性 ${key} 被设置`);
    target[key] = newValue;
  },

  // 监听 in 操作符
  has(target, key) {
    console.log(`触发 in 监听`);
    return key in target;
  },

  // 监听 delete 操作
  deleteProperty(target, key) {
    console.log(`监听 delete 操作`);
    delete target[key];
  },
});

console.log(objProxy.name);
// get
// 属性 name 被访问
// aaa

objProxy.name = 123;
// set
// 属性 name 被设置

console.log(objProxy.name);
// get
// 属性 name 被访问
// 123

console.log('name' in objProxy);
// 触发 in 监听
// true

delete objProxy.name;
// 监听 delete 操作
