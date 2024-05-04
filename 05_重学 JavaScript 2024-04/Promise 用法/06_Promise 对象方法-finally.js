/*
 * @Version    : v1.00
 * @Author     : itchaox
 * @Date       : 2024-04-26 23:01
 * @LastAuthor : itchaox
 * @LastTime   : 2024-05-04 14:56
 * @desc       :
 */

const promise = new Promise((resolve, reject) => {
  reject('promise 错误');
});

promise
  .then((res) => {
    console.log('res', res);
  })
  .catch((err) => {
    // err promise 错误
    console.log('err', err);
  })
  .finally(() => {
    // finally 调用
    console.log('finally 调用');
  });
