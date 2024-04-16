/*
 * @Version    : v1.00
 * @Author     : itchaox
 * @Date       : 2024-04-13 17:21
 * @LastAuthor : itchaox
 * @LastTime   : 2024-04-14 08:57
 * @desc       :
 */

// ...省略号在此处为剩余参数的意思，后续的数据都放作为数据放入该数组中
function fn(m, ...list) {
  console.log(m, list);
}

fn(1, 2, 3); // 1 [2, 3]

// 剩余参数必须放最后一个
// SyntaxError: Rest parameter must be last formal parameter
function foo(...m, n) {
  console.log(m, n)
}

foo(1, 2, 3);

function bar(n, ...m) {
  console.log(n, m);
}

bar(1, 23, 4, 5, 5); // 1 [23, 4, 5, 5]
