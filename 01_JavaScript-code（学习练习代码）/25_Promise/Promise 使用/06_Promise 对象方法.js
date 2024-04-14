/*
 * @desc:
 * @Version: v1.00
 * @Author: wc
 * @Date: 2023-02-28 11:03:01
 * @LastEditors: wc
 * @LastEditTime: 2023-02-28 11:23:01
 */

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise fulfilled")
    // reject("Promise rejected")
  }, 1000)
})

// then
// 1.
// p.then(
//   (res) => {
//     console.log("res", res)
//   },
//   (err) => {
//     console.log("err", err)
//   }
// )

// 2.
// p.then((res) => {
//   console.log("res", res)
// }).catch((err) => {
//   console.log("err", err)
// })

// catch
// p.catch((err) => {
//   console.log("err", err)
// })

// finally
p.then((res) => {
  console.log("res", res)
})
  .catch((err) => {
    console.log("err", err)
  })
  .finally(() => {
    console.log("promise finally")
  })
