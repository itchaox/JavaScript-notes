/*
 * @Version    : v1.00
 * @Author     : itchaox
 * @Date       : 2024-04-26 23:10
 * @LastAuthor : itchaox
 * @LastTime   : 2024-05-04 15:06
 * @desc       :
 */

const obj = {
  name: 'aaa',
};

// 1. 入参为普通类型
const p1 = Promise.resolve(obj);

p1.then((res) => {
  // res1 { name: 'aaa' }
  console.log('res1', res);
});

// 等价于
// 说白了就是语法糖，然后 Promise 内部处理过，提供了一个简便的方式

const p2 = new Promise((resolve, reject) => {
  resolve(obj);
});

p2.then((res) => {
  // res2 { name: 'aaa' }
  console.log('res2', res);
});

// 2. 入参为 promise
const p3 = new Promise((resolve, reject) => {
  reject('promise');
});

const p4 = Promise.resolve(p3);

p4.then(
  (res) => {
    console.log('res', res);
  },
  (err) => {
    // err promise
    console.log('err', err);
  },
);

// 3. 入参为 thenable
const thenObj = {
  then(resolve, reject) {
    reject('thenable');
  },
};

const p5 = Promise.resolve(thenObj);

p5.then(
  (res) => {
    console.log('res', res);
  },
  (err) => {
    // err thenable
    console.log('err', err);
  },
);
