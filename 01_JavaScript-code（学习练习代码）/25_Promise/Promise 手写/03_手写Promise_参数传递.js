/*
 * @desc:
 * @Version: v1.00
 * @Author: wc
 * @Date: 2023-03-01 10:06:53
 * @LastEditors: wc
 * @LastEditTime: 2023-03-01 11:02:16
 */

// 状态管理
const PROMISE_STATUS_PENDING = "pending"
const PROMISE_STATUS_FULFILLED = "fulfilled"
const PROMISE_STATUS_REJECTED = "rejected"

class WCPromise {
  constructor(executor) {
    this.state = PROMISE_STATUS_PENDING
    this.value = undefined
    this.reason = undefined

    const resolve = (value) => {
      if (this.state === PROMISE_STATUS_PENDING) {
        this.state = PROMISE_STATUS_FULFILLED
        this.value = value
      }
    }

    const reject = (reason) => {
      if (this.state === PROMISE_STATUS_PENDING) {
        this.state = PROMISE_STATUS_REJECTED
        this.reason = reason
      }
    }

    executor(resolve, reject)
  }
}

const promise = new WCPromise((resolve, reject) => {
  console.log("pending")
  reject("reject")
  resolve("resolve")
})
