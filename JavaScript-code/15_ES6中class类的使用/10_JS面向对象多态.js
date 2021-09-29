// 多态:当对不同的数据类型执行同一个操作时,如果表现出来的行为(形态)不一样.就是多态的体现

function foo(foo) {
  console.log(foo.getArea)
}

let obj1 = {
  name:'itchao',
  getArea() {
    return 100
  }
}

class  Person {
  getArea() {
    return 200
  }
}

let p = new Person()
foo(obj1)
foo(p)

function sum(num1, num2) {
  return num1 + num2
}

sum(20, 30)
sum('a', 'b')