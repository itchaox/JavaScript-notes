// 创建一个对象,对某一个人进行抽象(描述)
// 1.创建方式一:通过 new Obje() 创建
var obj = new Object()
obj.name = 'itchao'
obj.age = 18
obj.height = 1.85
obj.eat = function (){
  console.log('吃东西')
}
obj.eat()

// 2.创建方式二:字面量创建
var itchao = {
  name:'chao',
  age:18,
  height:1.88,
  eat:function (){
    console.log('在吃冰淇淋!')
  }
}
itchao.eat()