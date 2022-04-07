// 对象的响应式，首先创建一个对象
const obj = {
  name: 'itchao',
  age: 22,
  height: 1.85
}

// 封装一个响应式函数
class Depend {
  constructor() {
    this.r = []
  }

  addDepend(foo) {
    this.r.push(foo)
  }

  notify() {
    this.r.forEach(foo => {
      foo()
    })
  }
}

const depend = new Depend()
function watchFns(fn) {
  depend.addDepend(fn)
}

watchFns(function () {
  console.log(obj.name, '-----');
})

function foo() {
  console.log(obj.age, '******');
}

obj.name = 'coderwhy'
depend.notify()