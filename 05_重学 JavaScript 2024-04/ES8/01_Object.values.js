const obj = {
  name: "abc",
  age: 18,
};

console.log(Object.values(obj)); // [ 'abc', 18 ]

// 相关 API
// Object.keys
console.log(Object.keys(obj)); // [ 'name', 'age' ]

// 传入其他数据类型（了解，其实基本不会用到，比较这个是对象相关 api）

// 数组
console.log(Object.values(["aaa", "bbb", "ccc"])); // [ 'aaa', 'bbb', 'ccc' ]

// 字符串
console.log(Object.values("abc")); // [ 'a', 'b', 'c' ]
