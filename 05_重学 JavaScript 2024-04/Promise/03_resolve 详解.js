/*
 * @Version    : v1.00
 * @Author     : itchaox
 * @Date       : 2024-04-24 22:26
 * @LastAuthor : itchaox
 * @LastTime   : 2024-04-25 11:14
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
