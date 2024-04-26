/*
 * @Version    : v1.00
 * @Author     : itchaox
 * @Date       : 2024-04-24 21:46
 * @LastAuthor : itchaox
 * @LastTime   : 2024-04-24 21:52
 * @desc       :
 */

// Promise
// 1. 一个类，new 调用
// 2. 解决异步问题
// 3. 统一规范，减少沟通成本

// const promise = new Promise();

function fn(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (name === 'a') {
        resolve('is a');
      } else {
        reject('is not a');
      }
    }, 1000);
  });
}

const fnPromise = fn('is a');

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

fnPromise
  .then((res) => {
    console.log('res', res);
  })
  .catch((err) => {
    console.log('err', err);
  });
