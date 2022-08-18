/**
 * 1. js 主线程
 * 2. 微任务: Promise.then()
 * 3. 宏任务: 定时器 AJAX DOM操作
 */

console.log(1);

function foo() {
  console.log(2);
}

foo()

setTimeout(() => {
  console.log(3);
})

setTimeout(() => {
  console.log(4);
}, 1002)

setTimeout(() => {
  console.log(5);
}, 300)

console.log(6);

Promise.resolve().then(() => {
  console.log(7);
})

Promise.resolve().then(() => {
  console.log(8);
})

(() => {
   console.log(9);
})();

/**
 * 1. 主线程: 1 2 6
 * 2. 微任务: 7 8
 * 3. 宏任务: 3 4 5
 */