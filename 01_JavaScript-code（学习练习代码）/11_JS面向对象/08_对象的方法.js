let obj = {
  name:'kobe',
  age:18
}

obj.height = 1.88
obj.address = '成都市'
obj.city = '北京市'
obj.city = '上海市'

// 禁止对象继续添加新的属性
Object.preventExtensions(obj)

// delete 可以删除对象内的元素
delete  obj.age
console.log(obj)
// freeze()方法让属性不可以修改(writable:false)
Object.freeze(obj)
obj.name = 'itchao'

console.log(obj.name)

