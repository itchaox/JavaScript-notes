/*
 * @Version    : v1.00
 * @Author     : itchaox
 * @Date       : 2024-04-20 15:19
 * @LastAuthor : itchaox
 * @LastTime   : 2024-04-20 15:40
 * @desc       :
 */

/**
 * Object.defineProperty 监听对象修改的缺点
 * 1. 这个属性的目的本来不是用来监听对象的修改
 * 2. 部分监听对象的功能：新增属性、删除属性，该属性无法监听
 */

const obj = {
  name: 'aaa',
  age: 18,
};

// 监听对象中的一个属性
Object.defineProperty(obj, 'name', {
  // 对象增强写法
  // get: function() {}
  get() {
    console.log('name 被访问');
  },

  set() {
    console.log('name 被设置');
  },
});

console.log(obj.name);
// name 被访问
// undefined 因为此时 get 函数没有返回值，所以返回 undefined

obj.name = 'bbb';
// name 被设置；name 的值被修改了，触发了 set 函数

// 需要监听一个对象中的所有属性，则使用 Object.keys 遍历即可

const newObj = {
  name: 'aaa',
  age: 18,
};

// console.log(Object.keys(newObj)); // [ 'name', 'age' ]

Object.keys(newObj).forEach((key) => {
  let value = newObj[key];
  Object.defineProperty(newObj, key, {
    get() {
      console.log(`newObj 的 ${key} 被访问了`);
      return value;
    },

    set(newValue) {
      console.log(`newObj 的 ${key} 被设置了`);
      value = newValue;
    },
  });
});

newObj.name = 'bbb';
console.log(newObj.name);
