/*
 * @Version    : v1.00
 * @Author     : itchaox
 * @Date       : 2024-04-26 23:01
 * @LastAuthor : itchaox
 * @LastTime   : 2024-04-26 23:05
 * @desc       :
 */

const promise = new Promise((resolve, reject) => {
  // resolve(2);

  reject('123');
});

promise
  .then((res) => {
    console.log('res', res);
  })
  .catch((err) => {
    console.log('err', err);
  })
  .finally(() => {
    console.log('res 2');
  });
