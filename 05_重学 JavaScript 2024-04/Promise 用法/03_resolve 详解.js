/*
 * @Version    : v1.00
 * @Author     : itchaox
 * @Date       : 2024-04-24 22:26
 * @LastAuthor : itchaox
 * @LastTime   : 2024-04-27 12:36
 * @desc       :
 */

// resolve 参数有三种类型

// 1. 普通数据类型：字符串、普通对象、数组 等
// 2. Promise
// 3. thenable 对象

const newPromise = new Promise((resolve, reject) => {
  resolve('new Promise Data');

  // reject('new Promise err');
});

const promise = new Promise((resolve, reject) => {
  // 1. 普通数据格式
  // resolve(111);
  // resolve({ name: 'aaa' });
  // resolve([11, 22, 33]);

  // 2. Promise
  // FIXME： 相当于拦截操作，此 Promise 的状态由 resolve 参数里面的 Promise 状态决定
  // resolve(newPromise);

  // 3. thenable
  // FIXME： 拦截操作，此 Promise 的状态由 thenable 的状态决定
  const obj = {
    // 此种展示方式即为 thenable
    then(resolve, reject) {
      reject('this is thenable callback');
    },
  };

  resolve(obj);
});

promise
  .then((res) => {
    // resolve 参数：111
    console.log(`resolve 参数：${res}`);
  })
  .catch((err) => {
    console.log(`err： ${err}`);
  });

// 1. 普通数据类型
const promise1 = new Promise((resolve, reject) => {
  resolve(111);
});

promise1.then((res) => {
  // res 111
  console.log('res', res);
});

// 2. promise 对象
const promise2 = new Promise((resolve, reject) => {
  // 当 resolve 中的参数为 promise 对象时，则当前这个 new Promise 的状态将会由此 promise 对象的状态决定
  // 我觉得就相等于是一个拦截操作，权限转移的操作

  resolve(
    new Promise((resolve, reject) => {
      // resolve('promise data');

      reject('promise err');
    }),
  );
});

promise2.then(
  (res) => {
    // res promise data
    console.log('res', res);
  },
  (err) => {
    // err promise err
    console.log('err', err);
  },
);

// 3. thenable 对象
// 何为 thenable 对象

const thenableObj = {
  then(resolve, reject) {
    resolve('thenable resolve');

    // reject('thenable reject');
  },
};

const promise3 = new Promise((resolve, reject) => {
  // 传入 thenable 的情况和 promise 情况一致
  // 当前这个 new Promise 的状态，由 resolve 中传入的 thenable 的状态决定
  // 相当于就是拦截操作，权限移交的操作
  resolve(thenableObj);
});

promise3.then(
  (res) => {
    // res thenable resolve
    console.log('res', res);
  },
  (err) => {
    // err thenable reject
    console.log('err', err);
  },
);
