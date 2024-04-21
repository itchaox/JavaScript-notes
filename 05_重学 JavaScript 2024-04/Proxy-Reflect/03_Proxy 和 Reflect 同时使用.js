/*
 * @Version    : v1.00
 * @Author     : itchaox
 * @Date       : 2024-04-20 22:49
 * @LastAuthor : itchaox
 * @LastTime   : 2024-04-21 09:58
 * @desc       :
 */

// 尽量需要避免直接操作原对象

// Object 上的部分属性不太规范，后续新增了 Reflect 就是希望从 Object 上剥离出部分属性，使其更加规范化

// Reflect 中的属性和 Proxy 中捕获器提供的属性基本一致

// 先创建一个原始对象

const obj = {
  // _开头一般都是对象的私有属性
  _name: 'aaa',
  age: 18,

  // 对象中也有 get 和 set 属性
  // 默认情况下，对象中的 this 是指向对象本身
  get name() {
    return this._name;
  },

  set name(newValue) {
    this._name = newValue;
  },
};

const objProxy = new Proxy(obj, {
  get(target, key, receiver) {
    console.log(`访问了 ${key} 属性`);
    // return target[key]; // 这样还是操作了原对象

    // receiver 参数使 obj 这个原对象中的 this 指向 objProxy 这个代理对象，这样方便实现拦截操作
    return Reflect.get(target, key, receiver);
  },

  set(target, key, newValue, receiver) {
    console.log(`修改了 ${key} 属性`);

    // target[key] = newValue; // 这样还是操作了原对象

    Reflect.set(target, key, newValue, receiver);
  },
});

objProxy.name = 'bbb';
// 修改了 name 属性

console.log(objProxy.name);
// 访问了 name 属性
// bbb
