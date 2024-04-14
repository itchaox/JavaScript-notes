/*
 * @desc: 优化：then 方法链式调用
 * @Version: v1.00
 * @Author: wc
 * @Date: 2023-03-01 10:06:53
 * @LastEditors: wc
 * @LastEditTime: 2023-03-03 13:57:30
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

    // then 方法没有第一个参数则直接返回数据
    const defaultOnFulfilled = (value) => value
    onFulfilled = onFulfilled || defaultOnFulfilled

    // 返回 Promise，处理 then 方法链式调用
    return new WCPromise((resolve, reject) => {
      // Promise 确定状态后再次调用 then 方法
      if (this.state === PROMISE_STATUS_FULFILLED) {
        execFunctionWithCatchError(onFulfilled, this.value, resolve, reject)
      }

      if (this.state === PROMISE_STATUS_REJECTED) {
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
    return this.then(undefined, onRejected)
  }

  finally(onFinally) {
    this.then(
      () => {
        onFinally()
      },
      () => {
        onFinally()
      }
    )
  }

  static resolve(value) {
    return new WCPromise((resolve) => resolve(value))
  }

  static reject(reason) {
    return new WCPromise((resolve, reject) => reject(reason))
  }

  static all(promiseList) {
    // 关键：执行 resolve 和 reject 的时机

    return new WCPromise((resolve, reject) => {
      const valueList = [] // 存放所有 resolve 的返回数据
      promiseList.forEach((promise) => {
        promise.then(
          (res) => {
            valueList.push(res)
            if (valueList.length === promiseList.length) {
              resolve(valueList)
            }
          },
          (err) => {
            reject(err)
          }
        )
      })
    })
  }

  static allSettled(promiseList) {
    return new WCPromise((resolve, reject) => {
      const valueList = [] // 存放所有 resolve 和 reject 的状态和结果
      promiseList.forEach((promise) => {
        promise.then(
          (res) => {
            valueList.push({
              status: PROMISE_STATUS_FULFILLED,
              value: res
            })
            if (valueList.length === promiseList.length) {
              resolve(valueList)
            }
          },
          (err) => {
            valueList.push({
              statue: PROMISE_STATUS_REJECTED,
              reason: err
            })
            if (valueList.length === promiseList.length) {
              resolve(valueList)
            }
          }
        )
      })
    })
  }
}

const p1 = new WCPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("111")
  }, 100)
})

const p2 = new WCPromise((resolve, reject) => {
  setTimeout(() => {
    reject("222")
  }, 200)
})

const p3 = new WCPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("333")
  }, 300)
})

// all
WCPromise.all([p1, p2, p3])
  .then((res) => {
    console.log("res", res)
  })
  .catch((err) => {
    console.log("err", err)
  })

// allSettled
WCPromise.allSettled([p1, p2, p3]).then((res) => {
  console.log("res", res)
})
