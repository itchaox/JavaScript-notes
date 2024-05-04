/*
 * @Version    : v1.00
 * @Author     : itchaox
 * @Date       : 2024-04-26 23:34
 * @LastAuthor : itchaox
 * @LastTime   : 2024-05-04 15:38
 * @desc       :
 */
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(111);
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

// race 竞赛

// 1. 获取第一个 resolve 的数据
// 2. 如果 reject 比 resolve 先获取，则走 catch 就结束了

const pList = Promise.race([p1, p2, p3]);

pList.then(
  (res) => {
    console.log('res', res);
  },
  (err) => {
    // err 333
    console.log('err', err);
  },
);
