function Person() {

}

let p = new Person()

console.log(p instanceof Person);
console.log(Person.prototype.isPrototypeOf(p));

let obj = {
  name:'itchao',
  age:18
}

let info = Object.create(obj)

// console.log(info instanceof obj);
console.log(obj.isPrototypeOf(info))