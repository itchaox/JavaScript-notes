/*
 * @Desc:
 * @Version: v1.00
 * @Author: wangchao
 * @Date: 2023-02-27 21:38:07
 * @LastEditors: wangchao
 * @LastEditTime: 2023-02-27 21:52:11
 */

const p1 = new Promise((resolve, reject) => {
  resolve("111")
})

const thenable = {
  then: (resolve, reject) => {
    resolve("thenable")
  },
}

/**
 * resolve 三种参数类型：
 * 1. 普通值或普通对象 => 状态为 fulfilled，直接作为 then 方法参数
 * 2. promise => 状态由 promise 内部状态决定，且参数由对应状态决定
 * 3. thenable => 状态由 thenable 内部状态决定，且参数由对应状态决定
 */

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve("value")
    // resolve(p1)
    // resolve(thenable)
  }, 1000)
})

promise.then(
  res => {
    console.log("res", res)
  },
  err => {
    console.log("err", err)
  }
)
