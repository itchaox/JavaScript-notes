class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  running() {
    console.log(this.name + 'running')
  }
}

class Student extends Person {
  constructor(name, age, son) {
    super(name, age);
    this.son = son
  }

  studying() {
    console.log(this.name + 'studying')
  }
}

let foo = new Student('kobe', 18,81)
console.log(foo)

