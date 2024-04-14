/*
 * @desc:
 * @Version: v1.00
 * @Author: wc
 * @Date: 2023-03-01 10:06:53
 * @LastEditors: wc
 * @LastEditTime: 2023-03-01 10:31:25
 */

// 状态管理
const PROMISE_STATUS_PENDING = "pending"
const PROMISE_STATUS_FULFILLED = "fulfilled"
const PROMISE_STATUS_REJECTED = "rejected"

class WCPromise {
  constructor(executor) {
    this.state = PROMISE_STATUS_PENDING

    const resolve = () => {
      if (this.state !== PROMISE_STATUS_PENDING) return

      this.state = PROMISE_STATUS_FULFILLED
      console.log("WCPromise resolve")
    }

    const reject = () => {
      if (this.state !== PROMISE_STATUS_PENDING) return

      this.state = PROMISE_STATUS_REJECTED
      console.log("WCPromise reject")
    }

    executor(resolve, reject)
  }
}

const promise = new WCPromise((resolve, reject) => {
  reject()
  resolve()
})
