let name = 'window';
let person = {
  name:'person',
  sayName() {
    console.log(this.name);
  }
}
function sayName() {
  let sss = person.sayName;
  sss();  // 输出结果：window，原因：独立函数调用，this执行是全局作用域的window，this.name = window.name,所以输出结果是window
  person.sayName();  // 输出结果：person，原因：隐式绑定，this指向发起调用的person对象，this.name = person.name，所以输出结果是person
  (person.sayName)();  // 输出结果：person，原因：隐式调用，加括号和不加括号没区别，加了括号依然是直接取到person.sayName,再进行打印
  (b = person.sayName)();  // 输出结果：window，
  // 原因：赋值表达式(独立函数调用):将person.sayName的结果作为整个(b = person.sayName)的结果再打印，间接函数引用
}
sayName()