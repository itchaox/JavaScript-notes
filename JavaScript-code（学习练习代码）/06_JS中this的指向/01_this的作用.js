// 从某些角度来说，开发中如果没有this，很多的问题我们也是有解决方案
// 但是没有this，会让我们编写代码变得非常不方便


let obj = {
    name:'itchao',
    age:18,
    eating() {
        console.log(`年龄${this.age}的${this.name}在吃东西`)  // 这里的this指向的是obj对象
    },
    running() {
        console.log(`年龄${this.age}的${this.name}在跑步`)
    },
    studying() {
        console.log(`年龄${this.age}的${this.name}在学习`)
    }
}

// console.log(obj);  // 打印obj对象

obj.eating()
obj.running()
obj.studying()