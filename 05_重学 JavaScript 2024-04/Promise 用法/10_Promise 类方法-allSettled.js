/*
 * @Version    : v1.00
 * @Author     : itchaox
 * @Date       : 2024-04-26 23:33
 * @LastAuthor : itchaox
 * @LastTime   : 2024-04-26 23:49
 * @desc       :
 */

const p1 = new Promise((resolve, reject) => {
  resolve(111);
});

const p2 = new Promise((resolve, reject) => {
  resolve(222);
});

const p3 = new Promise((resolve, reject) => {
  reject(333);
});

const pList = Promise.allSettled([p1, p2, p3]);

pList.then((res) => {
  console.log('res', res);
});
