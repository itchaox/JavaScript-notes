// 对象解构

let obj = {
  name:'itchao',
  age:19,
  height:1.85
}

// let {name, age, height} = obj
// console.log(name, age, height)

// 对象按照key进行查找配对解构,所以可以不按顺序解构

let {age} = obj
console.log(age)

// 更改对象中的名字,取出obj的值,然后赋值给新的属性名itemName
let {name: itemName} = obj
console.log(itemName)

// 给对象属性默认值(创建新的属性):如果对象没有值,则显示默认值
let {address:newAddress = '成都市'}  = obj
console.log(newAddress)

// 给对象属性默认值:如果对象没有值,则显示默认值
let {city = '北京市'} = obj

console.log(obj.city)