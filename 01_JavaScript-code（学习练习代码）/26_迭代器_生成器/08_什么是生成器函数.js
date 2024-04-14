/*
 * @Desc:
 * @Version: v1.00
 * @Author: wc
 * @Date: 2022-10-02 15:58:54
 * @LastEditors: wc
 * @LastEditTime: 2022-10-02 16:16:17
 */
function* foo() {
  console.log(1)

  yield

  console.log(2)

  yield
  console.log(3)

  yield
  console.log(4)

  yield
}

const a = foo()
a.next()
a.next()
a.next()
