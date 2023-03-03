/*
 * @desc: 优化：1. then 方法多次调用 2. Promise 状态确定后继续调用 then
 * @Version: v1.00
 * @Author: wc
 * @Date: 2023-03-01 10:06:53
 * @LastEditors: wc
 * @LastEditTime: 2023-03-03 10:08:16
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
    this.onFulfilledFns = []
    this.onRejectedFns = []

    const resolve = (value) => {
      // 加入微任务队列
      queueMicrotask(() => {
        if (this.state !== PROMISE_STATUS_PENDING) return

        this.state = PROMISE_STATUS_FULFILLED
        this.value = value
        this.onFulfilledFns.forEach((fn) => fn(this.value))
      })
    }

    const reject = (reason) => {
      // 加入微任务队列
      queueMicrotask(() => {
        if (this.state !== PROMISE_STATUS_PENDING) return

        this.state = PROMISE_STATUS_REJECTED
        this.reason = reason
        this.onRejectedFns.forEach((fn) => fn(this.reason))
      })
    }

    executor(resolve, reject)
  }

  then(onFulfilled, onRejected) {
    switch (this.state) {
      // Promise 确定状态后再次调用 then 方法
      case PROMISE_STATUS_FULFILLED:
        onFulfilled && onFulfilled(this.value)
        break
      case PROMISE_STATUS_REJECTED:
        onRejected && onRejected(this.reason)
        break

      // 多次调用 then 方法处理
      case PROMISE_STATUS_PENDING:
        this.onFulfilledFns.push(onFulfilled)
        this.onRejectedFns.push(onRejected)
    }
  }
}

const promise = new WCPromise((resolve, reject) => {
  console.log("pending")

  // resolve("resolve")
  reject("reject")
})

promise.then(
  (res) => {
    console.log("res", res)
  },
  (err) => {
    console.log("err", err)
  }
)

promise.then(
  (res) => {
    console.log("res", res)
  },
  (err) => {
    console.log("err", err)
  }
)

setTimeout(() => {
  promise.then(
    (res) => {
      console.log("res", res)
    },
    (err) => {
      console.log("err", err)
    }
  )
}, 2210)
