/*
 * @Version    : v1.00
 * @Author     : itchaox
 * @Date       : 2024-04-27 09:33
 * @LastAuthor : itchaox
 * @LastTime   : 2024-04-27 09:49
 * @desc       :
 */

function requestFn(name, successCallback, failureCallback) {
  // 用 setTimeout 模拟异步请求
  setTimeout(() => {
    // 此处获取到结果后，外部需要知道
    if (name === 'a') {
      successCallback('调用成功');
    } else {
      failureCallback('调用失败');
    }
  }, 1000);
}

requestFn(
  'a',
  (res) => {
    // 当定时器时间到了后，回调这个函数，打印如下数据

    // data： 调用成功
    console.log('data：', res);
  },
  (err) => {
    console.log('err', err);
  },
);
