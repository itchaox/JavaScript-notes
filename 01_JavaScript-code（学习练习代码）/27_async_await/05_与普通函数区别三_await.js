// TODO: 1. await + 表达式(Promise)

// function getData(time) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(`异步函数,执行结果!等待时间:${time}`)
//     }, time)
//   })
// }

// async function foo() {
//   const res1 =  await getData(1000) // await 有返回值 //TODO: 等待该部分代码执行完成，有结果之后，才执行后续代码！
//   console.log('第一个异步函数!', res1); //TODO: 该部分代码，相当于在上面 promise 代码的 then 方法中执行！
// }

// foo()

// TODO: 2. await + 其他值

// async function getSome() {
  // const res1 = await 123 FIXME: 普通值直接将结果返回！
  // console.log('res1:', res1);

  // const res2 = await {
  //   then(resolve, reject) {
  //     resolve(7777777),
  //     reject(666666)
  //   }
  // }
  // console.log('res2', res2);

//   const res3 = await new Promise((resolve, reject) => {
//     resolve(7777777)
//   })

//   console.log(res3);
  
// }

// getSome()

//TODO: 3. reject 值（出现错误时，需要用 catch 方法进行接收）
async function foo() {
  const res = await new Promise((resolve, reject) => {
    // resolve(7777777),
    reject('错误信息!')
  })
  console.log(res, 'res');
}

foo().catch( err => console.log(err, '错误 err!') )