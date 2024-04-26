/*
 * @Version    : v1.00
 * @Author     : itchaox
 * @Date       : 2024-04-26 23:33
 * @LastAuthor : itchaox
 * @LastTime   : 2024-04-26 23:46
 * @desc       :
 */

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(111);
  }, 1000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(222);
    // FIXME: 一旦其中有一个 reject 中断之后，则直接将此 reject 的数据返回
    // reject(222);
  }, 2000);
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(333);
    // reject(333);
  }, 3000);
});

const pList = Promise.all([p1, p2, p3]);

pList.then(
  (res) => {
    console.log('res', res);
  },
  (err) => {
    console.log('err', err);
  },
);
