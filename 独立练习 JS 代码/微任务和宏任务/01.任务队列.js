console.log('主线程事件1')

setTimeout(() => {
  console.log('定时器回调事件1')
})


setTimeout(() => {
  console.log('定时器回调事件2')
}, 100)


setTimeout(() => {
  console.log('定时器回调事件3')
}, 300)

console.log('主线程事件2')
 
Promise.resolve().then(() => {
  console.log('微任务事件1')
})

const p1 = new Promise((res => {  
resolve()
}), (rej => {
reject()
}))