/*
 * @desc:
 * @Version: v1.00
 * @Author: wc
 * @Date: 2023-02-28 10:45:11
 * @LastEditors: wc
 * @LastEditTime: 2023-02-28 13:37:31
 */

// resolve
const obj = {
  name: "itchao",
  age: 23
}

// plain value concerted to Promise

// Promise.resolve
const p1 = Promise.resolve(obj)

// like this code
// new Promise((resolve, reject) => {
//   resolve(obj)
// })

p1.then((res) => {
  console.log("res", res)
})

// Promise.reject
const p2 = Promise.reject(obj)

p2.then((res) => {
  console.log("res", res)
}).catch((err) => {
  console.log("err", err)
})

// Promise.all
const pa1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("pa1")
  }, 1200)
})

const pa2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("pa2")
  }, 800)
})

const pa3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("pa3")
  }, 500)
})

// Promise.all
const promiseAll = Promise.all([pa1, pa2, pa3])

promiseAll
  .then((res) => {
    console.log("res promiseAll", res)
  })
  .catch((err) => {
    console.log("err promiseAll", err)
  })

// Promise.allSettled
const promiseAllSettled = Promise.allSettled([pa1, pa2, pa3])

promiseAllSettled.then((res) => {
  console.log("res promiseAllSettled", res)
})

// Promise.race
const promiseRace = Promise.race([pa1, pa2, pa3])

promiseRace
  .then((res) => {
    console.log("res promiseRace", res)
  })
  .catch((err) => {
    console.log("err promiseRace", err)
  })

// Promise.any
const promiseAny = Promise.any([pa1, pa2, pa3])

promiseAny
  .then((res) => {
    console.log("res promiseAny", res)
  })
  .catch((err) => {
    console.log("err promiseAny", err)
  })
