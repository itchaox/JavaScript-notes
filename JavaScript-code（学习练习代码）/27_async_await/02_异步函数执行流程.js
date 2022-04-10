//  只写 async 时,该函数与普通函数的执行流程是一样的（单线程执行）
 async function foo() {
  console.log(1);
  console.log(2);
  console.log(3);
  console.log(4);
  await console.log(5);
}

console.log('start');
foo()
console.log('end');
