let obj = {
  name:'kobe',
  age:18,
  eating(){
    console.log(this.name + ' eating');
  }
}
// console.log(obj);

let subObj = Object.create(obj)
// console.log(subObj);

function createPerson(name) {
  let stu = Object.create(obj)
  stu.name = name
  stu.studying = function() {
    console.log('studying');
  }
  return stu.studying
}

let stu1 = createPerson('itchao')
let stu2 = createPerson('coderwhy')
let stu3 = createPerson('james')
console.log(stu1, stu2, stu3);