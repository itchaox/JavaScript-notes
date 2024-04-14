/*
 * @Desc:
 * @Version: v1.00
 * @Author: wangchao
 * @Date: 2023-02-27 21:28:18
 * @LastEditors: wangchao
 * @LastEditTime: 2023-02-27 21:35:12
 */

const promise = new Promise((resolve, reject) => {
  // pending
  setTimeout(() => {
    resolve("111")
    reject()
  }, 1000)
})

promise.then(
  res => {
    // fulfilled
    console.log("res", res)
  },
  err => {
    // rejected
    console.log("err", err)
  }
)
