// 对象的响应式，首先创建一个对象
const obj = {
  name: 'itchao',
  age: 22,
  height: 1.85
}

// 封装一个响应式函数
let r = []
function watchFns(fn) {
  r.push(fn)
}

watchFns(function () {
  console.log(obj.name, '-----');
})

function foo() {
  console.log(obj.age, '******');
}

obj.name = 'coderwhy'

r.forEach(fn => {
  fn()
})