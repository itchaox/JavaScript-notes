/*
 * @Desc:
 * @Version: v1.00
 * @Author: wc
 * @Date: 2022-09-21 13:16:34
 * @LastEditors: wc
 * @LastEditTime: 2022-09-21 13:21:51
 */

const p1 = new Promise((resolve, reject) => {
  let a = 1;
  if (a === 1) {
    return resolve({ name: "itchao" });
  } else {
    return reject(new Error("p1 error"));
  }
});

const p2 = new Promise((resolve, reject) => {
  let b = 123;
  if (b === 121233) {
    resolve({ name: "chenchen " });
  } else {
    reject(new Error("p2 error"));
  }
});

// const p2 = new Promise((resolve, reject) => {
//   let b = 123;
//   if (b === 121233) {
//     resolve({ name: "chenchen " });
//   } else {
//     reject(new Error("p2 error"));
//   }
// }).catch(err => err);

Promise.all([p1, p2])
  .then(res => console.log(res))
  .catch(err => console.log(err));
