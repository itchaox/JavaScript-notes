/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2024-04-16 11:00
 * @LastAuthor : wangchao
 * @LastTime   : 2024-04-16 11:23
 * @desc       :
 *
 */

const obj = {
  name: "abc",
  age: 18,
};

// 获取到的数据是 [key, value] 的组合
console.log(Object.entries(obj)); // [ [ 'name', 'abc' ], [ 'age', 18 ] ]

// 传入其他数据类型（了解，其实基本不会用到，比较这个是对象相关 api）

// 数组
console.log(Object.entries(["aaa", "bbb", "ccc"])); // [ [ '0', 'aaa' ], [ '1', 'bbb' ], [ '2', 'ccc' ] ]

// 字符串
console.log(Object.entries("abc")); // [ [ '0', 'a' ], [ '1', 'b' ], [ '2', 'c' ] ]
