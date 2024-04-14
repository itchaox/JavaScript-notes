// 工厂模式:工厂函数
function createPerson(name, age, height, address){
  let p = {}

  p.name = name
  p.age = age
  p.height = height
  p.address = address
  p.eating = function(){
    console.log(this.name + 'eating')
  }
  p.running = function(){
    console.log(this.name + 'running')
  }
  return p
}

let foo = new createPerson('kobe',18,1.98,'洛杉矶')
let foo1 = new createPerson('itchao',19,1.85,'成都')
let foo2 = new createPerson('coderwhy',20,1.88,'北京')
console.log(foo)
console.log(foo1)
console.log(foo2)

// 工厂模式的缺点(获取不到对象最真实的类型)
console.log(foo, foo1, foo2)