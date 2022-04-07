// ES12, 新增 WeakRef 类
// WeakRef.prototype.deref
// 1. 如果原对象未被销毁，则可以直接获取原对象
// 2. 如果原对象已被销毁，则获取到的是undefined
const finalRegistry = new FinalizationRegistry(value => {
  console.log('注册在finalRegistry的对象，某一个被销毁', value);
})

let obj = {
  name: 'itchao'
}

let info = new WeakRef(obj)

finalRegistry.register(obj, '名字')

obj = null

// deref() 拿到弱引用的原始对象
console.log(info.deref()?.name);  // 使用可选链 ?. , 防止在undefined中获取值时出现报错
