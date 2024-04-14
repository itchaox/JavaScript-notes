/*
 * @desc:
 * @Version: v1.00
 * @Author: wc
 * @Date: 2023-03-01 10:06:53
 * @LastEditors: wc
 * @LastEditTime: 2023-03-01 10:22:00
 */

class WCPromise {
  constructor(executor) {
    const resolve = () => {
      console.log("WCPromise resolve")
    }

    const reject = () => {
      console.log("WCPromise reject")
    }

    executor(resolve, reject)
  }
}

const promise = new WCPromise((resolve, reject) => {
  resolve()
  reject()
})
