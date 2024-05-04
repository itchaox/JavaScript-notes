/*
 * @Version    : v1.00
 * @Author     : itchaox
 * @Date       : 2024-04-26 23:18
 * @LastAuthor : itchaox
 * @LastTime   : 2024-05-04 15:16
 * @desc       :
 */

// FIXME： Promise.reject 中的状态，和传入的类型无关，始终会是 rejected 状态
const p1 = new Promise((resolve, reject) => {
  resolve('测试');
});

const p2 = Promise.reject(p1);

p2.then(
  (res) => {
    console.log('res', res);
  },
  (err) => {
    // err Promise { '测试' }
    console.log('err', err);
  },
);
