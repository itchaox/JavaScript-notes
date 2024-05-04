/*
 * @Version    : v1.00
 * @Author     : itchaox
 * @Date       : 2024-04-26 23:33
 * @LastAuthor : itchaox
 * @LastTime   : 2024-05-04 15:21
 * @desc       :
 */

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p1 成功');
  }, 1000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve('p2 成功');

    // FIXME: 一旦其中有一个 reject 中断之后，则直接将此 reject 的数据返回
    reject('p2 错误');
  }, 2000);
});

const pList = Promise.all([p1, p2]);

pList.then(
  (res) => {
    // pList 中所有 promise 都为 fulfilled 则走此处

    // 打印：res [('p1 成功', 'p2 成功')];
    console.log('res', res);
  },
  (err) => {
    // pList 中一旦其中有一个 reject 中断之后，则走此处

    // 打印：err p2 错误
    console.log('err', err);
  },
);
