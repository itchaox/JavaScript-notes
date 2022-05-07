const info = {
  name: "itchao",
  friend: {
    name: "coderwhy",
    girlfriend: {
      name: "hmm",
    },
  },
};

console.log(info);

// ES11, 新增可选链
// 无可选链时，访问undefined.属性，会直接报错，导致后续逻辑代码无法执行
const obj = {
  name: "kobe",
};

console.log(obj);
console.log(obj.son);
// console.log(obj.son.name)  直接运行则会报错，影响后续逻辑代码执行
console.log(obj.son?.name); // 使用可选链执行该代码，在执行到undefined时，直接不执行后续获取属性操作
