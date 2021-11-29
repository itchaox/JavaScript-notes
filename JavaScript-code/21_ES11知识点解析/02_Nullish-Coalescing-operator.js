// ES11, 新增空值合并运算 ？？
// 使用空值合并运算？？，只有当值为null和undefined时，才显示默认值
// 使用或运算符||，当值为null、undefined、0、''时，都显示默认值

const foo = null
// const bar = foo || '默认值'
// console.log(bar);
const it = foo ?? '空值合并运算-默认值'
console.log(it);