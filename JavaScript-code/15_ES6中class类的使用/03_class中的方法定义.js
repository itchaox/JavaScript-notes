class Person {
  constructor(name, age) {
    this.name =name
    this.age = age
    this._city = '成都市'
  }

  // 普通的实例方法
  // 创建出来的对象进行访问
  eating() {
    console.log(this.name + ' eating')
  }

  running() {
    console.log(this.age, this.name + ' running')
  }

  // 类的访问器方法
  get city() {
    console.log('拦截访问操作!')
    return this._city
  }

  set city(city) {
    console.log('拦截测试操作!!')
    this._city = city
  }

  // 类的静态方法(类方法)
  // 直接通过类名访问静态方法
  // Person.createPerson()
  static createPerson() {
    let nameIndex = Math.floor(MAth.random() * nams.length)
    let name = name[nameIndex]
    return new Person(name)

  }
}

let p = new Person('kobe', 18)
p.eating()
p.running()
p.city = '北京市'
// console.log(Object.getOwnPropertyDescriptors(Person.prototype))