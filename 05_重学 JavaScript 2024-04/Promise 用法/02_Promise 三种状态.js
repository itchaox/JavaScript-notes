/*
 * @Version    : v1.00
 * @Author     : itchaox
 * @Date       : 2024-04-24 22:03
 * @LastAuthor : itchaox
 * @LastTime   : 2024-04-24 22:08
 * @desc       :
 */

// Promise 状态一旦敲定则不可修改
new Promise((resolve, reject) => {
  // FIXME： pending
  resolve();
}).then(
  (res) => {
    // FIXME: fulfilled
    console.log(res);
  },
  (err) => {
    // FIXME: rejected
    console.log(err);
  },
);
