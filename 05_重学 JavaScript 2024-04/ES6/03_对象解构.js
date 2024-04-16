let obj = {
  name: 'coder',
  age: 18,
};

// 属性名和变量名相同的简写形式；且是根据属性名来匹配的，所以和解构的顺序无关
let { age, name } = obj;
console.log(name, age); // coder 18

// 变量重命名
let { name: newName } = obj;
console.log(newName);

// 赋默认值
// 这个用法应该用的很少，我在工作中重来没用过
let { title: newTitle = '默认值' } = obj;
console.log(newTitle); // 默认值
