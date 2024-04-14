/*
 * @desc:
 * @Version: v1.00
 * @Author: wc
 * @Date: 2023-02-27 11:40:15
 * @LastEditors: wc
 * @LastEditTime: 2023-02-27 11:41:48
 */

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("a")
  }, 1000)
})

p1.then((res) => console.log(res))
