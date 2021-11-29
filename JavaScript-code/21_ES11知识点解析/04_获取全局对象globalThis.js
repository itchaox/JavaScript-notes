// 获取某一个环境下的全局对象(Global This)

// ES11之前，获取全局对象，分情况讨论
// 1. window环境下
// console.log(this);
// console.log(window);
// 2. node环境下
// console.log(global);

// ES11, 新增globalThis, 获取某一环境下的全局对象
console.log(globalThis);