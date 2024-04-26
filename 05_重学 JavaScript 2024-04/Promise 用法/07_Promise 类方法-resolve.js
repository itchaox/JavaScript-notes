/*
 * @Version    : v1.00
 * @Author     : itchaox
 * @Date       : 2024-04-26 23:10
 * @LastAuthor : itchaox
 * @LastTime   : 2024-04-26 23:17
 * @desc       :
 */

const obj = {
  name: 'aaa',
};

// 1. 入参为普通类型
const p1 = Promise.resolve(obj);

p1.then((res) => {
  console.log('res1', res);
});

// 等价于
// 说白了就是语法糖，然后 Promise 内部处理过，提供了一个简便的方式

const p2 = new Promise((resolve, reject) => {
  resolve(obj);
});

p2.then((res) => {
  console.log('res2', res);
});

// 2. 入参为 Promise
const p3 = new Promise((resolve, reject) => {
  // resolve('123');

  reject('err 123');
});

const p4 = Promise.resolve(p3);

p4.then(
  (res) => {
    console.log('res4', res);
  },
  (err) => {
    console.log('err3', err);
  },
);

// 3. 入参为 thenable
const thenObj = {
  then(resolve, reject) {
    // resolve('thenObj res');

    reject('err 02');
  },
};

const p5 = Promise.resolve(thenObj);

p5.then(
  (res) => {
    console.log('res', res);
  },
  (err) => {
    console.log('err', err);
  },
);
