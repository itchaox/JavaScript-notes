function createObject(o) {
  function Fn() {}
  Fn.prototype = o
  return new Fn()
}

function inheritPrototype(SubType, SuperType){
  SubType.prototype = createObject(SuperType.prototype)
  Object.defineProperty(SubType.prototype,'constructor', {
    enumerable:false,
    configurable:true,
    writable:true,
    value:SubType
  })
}


function Person(name, age) {
  this.name = name
  this.age = age
}

Person.prototype.running = function () {
  console.log('running');
}

function Student(name, age, sno) {
  Person.call(this, name, age, sno)
  this.sno = sno
}

// Student.prototype = Person.prototype
inheritPrototype(Student, Person)

Student.prototype.studying = function() {
  console.log('studying');
}

Student.prototype.running = function() {
  console.log('running');
}

let info = new Student('kobe', 18, 20)
console.log(info);
info.studying()
info.running()
