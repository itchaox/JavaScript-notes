// 10 20 30 40 50
// 1. 创建set结构
let set = new Set()
set.add(10)
set.add(40)
set.add(20)
set.add(30)
set.add(50)
set.add(10)
// 2. 添加对象时特别注意
set.add({})  // 对象保存的内存地址不一样
set.add({})

const obj = {name:'itchao'}
set.add(obj)  // 保存的是同一个对象的内存地址
set.add(obj)

// console.log(set)

// 3. 数组去重
const arr = [10, 12, 22, 33, 55, 12, 10 ,60]
// const newArr = []
// for(const item in arr) {
//   if(newArr.indexOf(item) !== -1) {
//     newArr.push(item)
//   }
// }

const arrSet = new Set(arr)
// const newArr = Array.from(arrSet)
const newArr = [...set]
console.log(newArr)

// 4. size属性
console.log(arrSet.size)

// 5. set方法
// add
arrSet.add(100)
console.log(arrSet)
// delete
arrSet.delete(12)
console.log(arrSet)
// has
console.log(arrSet.has(100))
// clear
// arrSet.clear()
console.log(arrSet)

// 6. 对Set进行遍历
arrSet.forEach(item => {
  console.log(item)
})

for(const item of arrSet) {
  console.log(item)
}
