/*
 * @Version    : v1.00
 * @Author     : itchaox
 * @Date       : 2024-04-24 21:46
 * @LastAuthor : itchaox
 * @LastTime   : 2024-04-27 10:38
 * @desc       :
 */

// Promise
// 1. 一个类，new 调用
// 2. 解决异步问题
// 3. 统一规范，减少沟通成本

// const promise = new Promise();

// function fn(name) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (name === 'a') {
//         resolve('is a');
//       } else {
//         reject('is not a');
//       }
//     }, 1000);
//   });
// }

// const fnPromise = fn('is a');

// fnPromise.then((res) => {
//   console.log(res);
// });

// fnPromise.catch((err) => {
//   console.log(err);
// });

// FIXME: node 环境中报错，then 方法应该必须有 cath 方法
// [UnhandledPromiseRejection: This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). The promise rejected with the reason "is not a".] {
//   code: 'ERR_UNHANDLED_REJECTION'
// }

// fnPromise
//   .then((res) => {
//     console.log('res', res);
//   })
//   .catch((err) => {
//     console.log('err', err);
//   });

// const promise = new Promise();

function fn(name) {
  // 调用此函数直接返回一个 promise 对象
  return new Promise((resolve, reject) => {
    // 模拟异步请求
    setTimeout(() => {
      if (name === 'a') {
        resolve('调用成功');
      } else {
        reject('调用失败');
      }
    }, 1000);
  });
}

// 在这里调用后，会拿到一个 promise 对象
// 调用 promise.then 获取调用成功的结果
// 调用 promise.catch 获取调用失败的结果
const newPromise = fn('a');

newPromise
  .then((res) => {
    // res 调用成功
    console.log('res', res);
  })
  .catch((err) => {
    console.log('err', err);
  });
