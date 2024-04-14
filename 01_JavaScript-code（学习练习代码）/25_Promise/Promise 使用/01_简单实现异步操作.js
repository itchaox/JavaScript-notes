/*
 * @desc:
 * @Version: v1.00
 * @Author: wc
 * @Date: 2023-02-23 16:58:23
 * @LastEditors: wc
 * @LastEditTime: 2023-02-28 11:48:15
 */

/**
 * 处理异步方式
 * 1. 传入回调函数，在异步结束后调用对应回调函数（有如下缺点）
 *    a. 自己封装时，需要设计好 callback 名称，以及在适当的时机正确调用 callback
 *    b. 使用方式不统一，学习成本高（如使用别人封装的方法，自己使用时需查看具体入参如何传，以及结果怎么拿）
 */

function foo(url, successCallback, errorCallback) {
  setTimeout(() => {
    if (url === "itchao") {
      successCallback("调用成功")
    } else {
      errorCallback("调用失败")
    }
  }, 1000)
}

foo(
  "itchao",
  (res) => console.log(res),
  (err) => console.log(err)
)
