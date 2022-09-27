/*
 * @Desc:
 * @Version: v1.00
 * @Author: wc
 * @Date: 2022-09-21 11:23:49
 * @LastEditors: wc
 * @LastEditTime: 2022-09-21 13:03:14
 */

const promise = new Promise((resolve, reject) => {
  resolve(x + 2);
});

promise
  .catch(err => {
    console.log(err);
  })
  .then(() => {
    console.log("err");
  })
  .finally(() => {
    console.log("12313131123213123");
  });

console.log(111);
