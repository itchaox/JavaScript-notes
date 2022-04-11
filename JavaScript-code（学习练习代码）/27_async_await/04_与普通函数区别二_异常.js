// 异步函数中的异常,会被作为异步函数返回的 promise 的 reject 值

async function foo() {
  console.log('start');

  throw new Error('err')
  console.log('end');
}

foo().catch( err => console.log('错误信息:', err))

console.log('后续代码!');
