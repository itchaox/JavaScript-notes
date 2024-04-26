/*
 * @Version    : v1.00
 * @Author     : itchaox
 * @Date       : 2024-04-26 23:18
 * @LastAuthor : itchaox
 * @LastTime   : 2024-04-26 23:25
 * @desc       :
 */

// 本来的样子
const p1 = new Promise((resolve, reject) => {
  reject('err data');
});

// 语法糖
const p2 = Promise.reject('err data p2');

p1.then(
  (res) => {
    console.log('res', res);
  },
  (err) => {
    console.log('err 1', err);
  },
);

p2.then(
  (res) => {
    console.log('res', res);
  },
  (err) => {
    console.log('err2', err);
  },
);

// FIXME： Promise.reject 中的状态，和传入的类型无关
const nP1 = new Promise((resolve, reject) => {
  resolve('good good');
});

const pp1 = Promise.reject(nP1);

pp1.then(
  (res) => {
    console.log('res', res);
  },
  (err) => {
    console.log('err', err);
  },
);
