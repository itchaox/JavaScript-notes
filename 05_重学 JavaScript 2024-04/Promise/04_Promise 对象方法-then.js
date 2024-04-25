/*
 * @Version    : v1.00
 * @Author     : itchaox
 * @Date       : 2024-04-25 11:23
 * @LastAuthor : itchaox
 * @LastTime   : 2024-04-25 14:35
 * @desc       :
 */

const promise = new Promise((resolve, reject) => {
  resolve('1 promise');
});

// FIXME: 这里调用的是同一个 promise
// promise.then((res) => {
//   console.log('res', res);
// });

// promise.then((res) => {
//   console.log('res1', res);
// });

// FIXME: promise 链式调用

// promise.then 有返回值

// 1. 返回普通数据，内部为 Promise 包裹了一下，然后走的 resolve 流程
// promise
//   .then((res) => {
//     return 'aaa';
//   })
//   .then((res) => {
//     // then 普通返回值 aaa
//     console.log('then 普通返回值', res);
//   });

// 2. 返回值为 Promise, 则后续的调用的状态由这个返回的 Promise 内部的状态决定
// promise
//   .then((res) => {
//     return new Promise((resolve, reject) => {
//       // resolve(321);
//       reject('err 02');
//     });
//   })
//   .then(
//     (res) => {
//       console.log('res', res);
//     },
//     (err) => {
//       console.log('err', err);
//     },
//   );

// 3. 返回值为 thenable
promise
  .then((res) => {
    const obj = {
      then(resolve, reject) {
        // resolve('123');
        reject('22');
      },
    };

    return obj;
  })
  .then(
    (res) => {
      console.log('res', res);
    },
    (err) => {
      console.log('err', err);
    },
  );
