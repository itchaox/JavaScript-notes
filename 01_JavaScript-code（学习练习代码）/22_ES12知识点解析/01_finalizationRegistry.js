// ES12, 新增 FinalizationRegistry类
const finalRegistry = new FinalizationRegistry(value => {
  console.log('注册在finalRegistry的对象，某一个被销毁', value);
})

let obj = {
  name: 'itchao'
}

let info = {
  age: 22
}

finalRegistry.register(obj, '名字')
finalRegistry.register(info, '年龄')

obj = null
info = null