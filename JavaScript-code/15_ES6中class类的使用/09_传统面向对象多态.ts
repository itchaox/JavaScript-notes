// 传统的面向对象多态有三个前提:
// 1. 必须有继承(是多态的前提)
// 2. 必须有重写
// 3. 必须有父类引用指向子类对象



// Shape形状
class Shape {
    getArea() {

    }
}

class  Rectangle extends  Shape {

}

class  Circle extends  Shape {

}

let r = new Rectangle()
let c = new Circle()


// 多态:当对不同的数据类型执行同一个操作时,如果表现出来的行为(形态)不一样.就是多态的体现
function calcArea(shape:Shape) {
    console.log(shape.getArea())
}

calcArea(r)
calcArea(c)