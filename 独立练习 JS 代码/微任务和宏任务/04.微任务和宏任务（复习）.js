console.log(1)

console.log(2)

console.log(3)

setTimeout(() => {
  console.log(4)
})

setTimeout(() => {
  console.log(5)
})

setTimeout(() =>{
  console.log(6)
}, 100)

Promise.resolve().then(() => {
  console.log(7);
})

queueMicrotask(() => {
  console.log(8);
})

console.log(9);


/**
 * 运行结果
 * 1
 * 2
 * 3
 * 9
 * 7
 * 8
 * 5
 * 6
 * 7
 */