class  Person{

}

// 实现js混入效果
function mixinRunner(BaseClass) {
  class NewClass extends  BaseClass {
    running() {
      console.log('running!')
    }
  }
  return NewClass
}
// 在JS中类只能有一个父类:单继承
class  Student extends Person {

}

let NewStudent = mixinRunner(Student)
let ns = new NewStudent()

ns.running()  // 输出结果:running
