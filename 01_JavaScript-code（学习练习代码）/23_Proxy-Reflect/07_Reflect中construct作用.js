function Student(name, age) {
  this.name = name;
  this.age = age;
}

function Teacher() {

}

// Reflect.construct, 执行A构造函数内容，但是创建出来的对象是B构造函数的对象
const teacher = Reflect.construct(Student, ['itchao', 22], Teacher);
console.log(teacher);
console.log(teacher.__proto__ === Teacher.prototype);
