/*
 * @desc:
 * @Version: v1.00
 * @Author: wc
 * @Date: 2023-03-01 10:06:53
 * @LastEditors: wc
 * @LastEditTime: 2023-03-03 10:57:19
 */

// 状态管理
const PROMISE_STATUS_PENDING = "pending"
const PROMISE_STATUS_FULFILLED = "fulfilled"
const PROMISE_STATUS_REJECTED = "rejected"

/**
 * @desc: 执行函数并捕获异常
 * @author: wc
 */
function execFunctionWithCatchError(execFn, value, resolve, reject) {
  try {
    const res = execFn(value)
    resolve(res)
  } catch (err) {
    reject(err)
  }
}

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
    // then 方法没有第二个参数则直接抛出异常
    const defaultOnRejected = (err) => {
      throw err
    }
    onRejected = onRejected || defaultOnRejected

    // 返回 Promise，处理 then 方法链式调用
    return new WCPromise((resolve, reject) => {
      // Promise 确定状态后再次调用 then 方法
      if (this.state === PROMISE_STATUS_FULFILLED && onFulfilled) {
        execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
      }

      if (this.state === PROMISE_STATUS_REJECTED && onRejected) {
        execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
      }

      // 多次调用 then 方法处理
      if (this.state === PROMISE_STATUS_PENDING) {
        this.onFulfilledFns.push(() => {
          execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
          return onFulfilled
        })

        this.onRejectedFns.push(() => {
          execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
          return onRejected
        })
      }
    })
  }

  catch(onRejected) {
    this.then(undefined, onRejected)
  }
}

const promise = new WCPromise((resolve, reject) => {
  console.log("pending")

  // resolve("resolve")
  reject("reject")
})

promise
  .then((res) => {
    console.log("res1", res1)
  })
  .catch((err) => {
    console.log("err2", err)
  })
