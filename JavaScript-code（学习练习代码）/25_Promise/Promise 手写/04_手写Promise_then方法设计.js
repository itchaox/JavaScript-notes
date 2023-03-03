/*
 * @desc:
 * @Version: v1.00
 * @Author: wc
 * @Date: 2023-03-01 10:06:53
 * @LastEditors: wc
 * @LastEditTime: 2023-03-02 09:45:23
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
        queueMicrotask(() => {
          this.value = value
          this.onFulfilled(this.value)
        })
      }
    }

    const reject = (reason) => {
      if (this.state === PROMISE_STATUS_PENDING) {
        this.state = PROMISE_STATUS_REJECTED
        queueMicrotask(() => {
          this.reason = reason
          this.onRejected(this.reason)
        })
      }
    }

    executor(resolve, reject)
  }

  then(onFulfilled) {
    this.onFulfilled = onFulfilled
    this.onRejected = onRejected
  }
}

const promise = new WCPromise((resolve, reject) => {
  console.log("pending")
  setTimeout(() => {
    resolve("resolve")
  }, 1220)
  // reject("reject")
})

promise.then(
  (res) => {
    console.log("res", res)
  },
  (err) => {
    console.log("err", err)
  }
)
