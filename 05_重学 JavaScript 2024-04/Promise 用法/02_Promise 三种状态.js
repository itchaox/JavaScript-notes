/*
 * @Version    : v1.00
 * @Author     : itchaox
 * @Date       : 2024-04-24 22:03
 * @LastAuthor : itchaox
 * @LastTime   : 2024-04-27 11:03
 * @desc       :
 */

// Promise 状态一旦敲定则不可修改
new Promise((resolve, reject) => {
  // FIXME： pending
  let a = 1;
  console.log('a', a);

  // 调用 resolve 后，Promise 状态就会从 pending 变为 fulfilled
  resolve();

  // 因为 Promise 的状态一旦改变，就已经确定了
  // 这后续执行的代码，Promise 状态也会是 fulfilled
  let b = 2;
  console.log('b', b);

  // 即使这里调用 reject 也不会修改 Promise 状态
  // reject()
}).then(
  (res) => {
    // FIXME: 到了这个地方之后，Promise 状态就变成 fulfilled
    console.log(res);
  },
  (err) => {
    // FIXME: 到了这个地方之后，Promise 状态就变成 rejected
    console.log(err);
  },
);
