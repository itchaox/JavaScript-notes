// 1. Symbol 基本使用
const s1 = Symbol('a')
const s2 = Symbol('b')

console.log(s1 === s2);
// ES2019(ES10)中，Symbol增加了描述（description）  
console.log(s1.description);

// 2. Symbol值作为key
const a1 = Symbol('a1')
const a2 = Symbol('a2')
const a3 = Symbol('a3')
const a4 = Symbol('a4')

// 2.1 定义对象字面量
const objA = {
  [a1]: 'a1',
  [a2]: 'a2'
}

console.log(objA);

// 2.2 新增属性
objA[a3] = 'a3'
console.log(objA);

// 2.3 Object.defineProperty 方式
Object.defineProperty(objA, a4, {
  enumerable: true, // 可枚举
  configurable: true, // 可配置
  writable: true, // 可重写
  value: 'a4'
})
console.log(objA);

// 获取Symbol语法
console.log(objA[a1]);
console.log(objA[a2]);
console.log(objA[a3]);
console.log(objA[a4]);

// 2.4 使用Symbol作为对象key时,遍历/Object.keys等获取不到Symbol值
console.log(Object.keys(objA));
// 需要使用Object.getOwnPropertySymbols,获取Symbol值
console.log(Object.getOwnPropertySymbols(objA));
// Symbol遍历方式
const sKeys = Object.getOwnPropertySymbols(objA)
for (const sKey of sKeys) {
  console.log(objA[sKey]);
}

// 2.5 创建相同Symbol使用Symbol.for(key)
// 获取Symbol的key，Symbol.keyFor(Symbol值)
const b1 = Symbol.for('b')
const b2 = Symbol.for('b')
console.log(b1 === b2);  // true

const key = Symbol.keyFor(b1)
console.log(key);  // b
const b3 = Symbol.for(key)
console.log(b3); // Symbol(b)
console.log(b1 === b3); // true