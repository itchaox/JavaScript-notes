/*
 * @desc: 实现深拷贝函数
 * @Version: v1.00
 * @Author: wc
 * @Date: 2022-12-28 15:00:19
 * @LastEditors: wc
 * @LastEditTime: 2022-12-29 10:52:26
 */
function isObject(value) {
  const valueType = typeof value;
  return value !== null && valueType === "object";
}

function deepClone(sourceValue) {
  const isFunction = typeof sourceValue === 'function'

  // 直接返回
  if (!isObject(sourceValue) || isFunction ) {
    return sourceValue;
  }

  // 对象类型，遍历获取拷贝新对象
  const newValue = {};
  for (const key in sourceValue) {
    newValue[key] = deepClone(sourceValue[key]);
  }

  return newValue;
}

let obj = {
  name: "it",
  age: 23,
  friend: {
    name: 'itchao',
    age: 22
  }
};
let obj1 = obj

const new1 = deepClone(obj);
obj.friend.name = '222'

console.log(obj);
console.log(new1);
console.log(obj1);
