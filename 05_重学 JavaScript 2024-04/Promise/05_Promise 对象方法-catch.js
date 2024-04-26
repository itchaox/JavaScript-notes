/*
 * @Version    : v1.00
 * @Author     : itchaox
 * @Date       : 2024-04-25 23:36
 * @LastAuthor : itchaox
 * @LastTime   : 2024-04-26 23:00
 * @desc       :
 */

const promise = new Promise((resolve, reject) => {
  // resolve(123);
  // reject('no err');
});

// FIXME: 报错，此处未 catch
// [UnhandledPromiseRejection: This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). The promise rejected with the reason "no err".] {
//   code: 'ERR_UNHANDLED_REJECTION'
// }

// promise.then((res) => {
//   console.log('res', res);
// });

// promise.catch((err) => {
//   console.log('err', err);
// });

promise
  .then((res) => {
    return new Promise((resolve, reject) => {
      reject('then err');
    });
  })
  .catch((err) => {
    console.log('err', err);
  });

//  此处 .catch，优先捕获 promise 的错误；如果 promise 是正常的，才开始捕获 promise.then 中的错误；先来后到的原则
// 我这几天写这个代码的时候，分析的时候发现，我现在只要理清楚代码的逻辑就可以了，我不管用什么比喻的方式来阐述这个道理，只有能讲清楚就可以了
