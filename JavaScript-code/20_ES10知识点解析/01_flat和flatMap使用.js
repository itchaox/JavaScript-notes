// 1. flat使用(数组降维)
const arr1 = [1, 2, [3, 4], 5, 7, [2, 1, [3, 5]]]
const newArr1 = arr1.flat(2)
// flat(),传参为降维的维度
console.log(newArr1);

// 2. flatMap使用
const arr2 = [1, 2, 4, 5, 3, 8]
const newArr2 = arr2.flatMap(item => {
  return item * 2
})

console.log(newArr2);

// 3. flatMap使用场景(将数组元素为字符串组的元素，单独抽离成单个字符串)
const message = ["itchao aa", "coderwhy bb", "kobe cc"]
const msg = message.flatMap(item => {
  return item.split(" ")
})
console.log(msg);