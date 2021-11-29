const weakSet = new WeakSet()

// 区别一：只能存放对象类型
// weakSet.add(5)
// console.log(weakSet);

// 区别二：对与对象来说是一个弱引用
let obj = {
  name: 'itchao'
}

weakSet.add(obj)
console.log(weakSet);