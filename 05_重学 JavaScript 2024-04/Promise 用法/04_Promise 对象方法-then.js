/*
 * @Version    : v1.00
 * @Author     : itchaox
 * @Date       : 2024-04-25 11:23
 * @LastAuthor : itchaox
 * @LastTime   : 2024-05-04 14:43
 * @desc       :
 */

const promise = new Promise((resolve, reject) => {
  resolve('promise');
});

// promise.then 有返回值

// 1. 返回普通数据，内部为 Promise 包裹了一下，然后走的 resolve 流程
promise
  .then((res) => {
    return 'aaa';
  })
  .then((res) => {
    // then 普通返回值 aaa
    console.log('then 普通返回值', res);
  });

// 2. 返回值为 Promise, 则后续的调用的状态由这个返回的 Promise 内部的状态决定
promise
  .then((res) => {
    return new Promise((resolve, reject) => {
      reject('错误');
    });
  })
  .then(
    (res) => {
      console.log('res', res);
    },
    (err) => {
      // err 错误
      console.log('err', err);
    },
  );

// 3. 返回值为 thenable
promise
  .then((res) => {
    const obj = {
      then(resolve, reject) {
        reject('thenable 错误');
      },
    };

    return obj;
  })
  .then(
    (res) => {
      console.log('res', res);
    },
    (err) => {
      // err thenable 错误
      console.log('err', err);
    },
  );
