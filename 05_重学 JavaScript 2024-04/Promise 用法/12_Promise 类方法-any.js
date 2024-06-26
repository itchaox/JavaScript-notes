/*
 * @Version    : v1.00
 * @Author     : itchaox
 * @Date       : 2024-04-26 23:34
 * @LastAuthor : itchaox
 * @LastTime   : 2024-05-04 15:58
 * @desc       :
 */
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(111);
  }, 100);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(222);
  }, 200);
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(333);
  }, 30);
});

// 以获取到第一个 resolve 为结束的标志，reject 不会终止执行效果
// 如果全都是 rejected 则打印如下：err [AggregateError: All promises were rejected] { [errors]: [ 333 ] }

Promise.any([p1, p2, p3]).then(
  (res) => {
    // res 222
    console.log('res', res);
  },
  (err) => {
    console.log('err', err);
  },
);
