/*
 * @Version    : v1.00
 * @Author     : itchaox
 * @Date       : 2024-04-26 23:33
 * @LastAuthor : itchaox
 * @LastTime   : 2024-05-04 15:35
 * @desc       :
 */

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(111);
  }, 100);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(222);
  }, 200);
});

const pList = Promise.allSettled([p1, p2]);

pList.then((res) => {
  // res [({ status: 'fulfilled', value: 111 }, { status: 'rejected', reason: 222 })];
  console.log('res', res);
});
