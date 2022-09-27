/*
 * @Desc:
 * @Version: v1.00
 * @Author: wc
 * @Date: 2022-09-21 11:16:52
 * @LastEditors: wc
 * @LastEditTime: 2022-09-21 11:18:15
 */

const promise = new Promise((resolve, reject) => {
  let status = 1;
  if (status === 1) {
    return resolve(status);
  } else {
    return reject(new Error("失败了!!!"));
  }
});

promise
  .then(res => {
    console.log(`成功状态: ${res}`);
    throw new Error("11");
  })
  .catch(err => {
    console.log(err);
  });
