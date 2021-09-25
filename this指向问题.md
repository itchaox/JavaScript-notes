##### 3. JS函数的this指向（重要）

###### 3.1 为什么需要this？

* 在常见的编程语言中，几乎都有this这个关键字（Objective-C中使用的是self），但是JavaScript中this和常见的面向对象语言中的this不太一样：
  * 常见面向对象的编程语言中，比如：Java、C++、Swift等等一系列语言中，this通常只会出现在类的方法中
  * 也就是你需要有一个类，类中的方法（特别是实例方法）中，this代表的就是当前调用的对象
  * 但是JavaScript中的this更加灵活，无论是它出现的位置还是它代表的含义

###### 3.2 this的作用：

```javascript
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
```

###### 3.3 this全局作用域的指向：

* 所有的函数在被调用时,都会创建一个执行上下文
* 这个上下文中记录着函数的调用栈、AO对象等
* this也是其中的一条记录(this是动态绑定的)

```javascript
// 在大多数情况下，this都是出现在函数中
// 在全局作用域下:
// 浏览器：window(globalObject)
// Node环境：{}

console.log(this)
// Node环境下是{}的原因：
// module -> 加载 -> 编译 -> 放到一个函数中 -> 执行函数.apply({})
// 例如：
// function foo(){}
// foo.apply('abc')
```

###### 3.4 this到底指向什么呢?

* 函数中的this指向启发:

1. 函数在调用时,JavaScript会默认给this绑定一个值

2. this的绑定和定义的位置(编写的位置没有关系)

3. this的绑定和调用方式以及调用的位置有关系

4. this是在运行时被绑定的

   **this的绑定规则:**

   * 绑定一:默认绑定
   * 绑定二:隐式绑定
   * 绑定三:显示绑定
   * 绑定四:new绑定

###### 3.5 规则一:默认绑定:

* 什么情况下使用默认绑定呢?独立函数调用

  * 独立的函数调用可以理解成函数没有被绑定到某个对象上进行调用

  ```javascript
  // 默认绑定:独立函数调用,this指向全局作用域
  
  
  // 案例一:
  // function foo(){
  //   console.log(this)
  // }
  //
  // foo()
  
  
  // 案例二:
  // function foo1(){
  //   console.log(this)
  // }
  //
  // function  foo2(){
  //   console.log(this)
  //   foo1()
  // }
  //
  // function  foo3(){
  //   console.log(this)
  //   foo2()
  // }
  //
  // foo3()
  
  
  // 案例三:(较难,重要!)
  // let obj = {
  //   name:'kobe',
  //   foo() {
  //     console.log(this)
  //   }
  // }
  //
  // let bar = obj.foo
  // bar()  // 调用bar函数的时候是以独立函数进行调用,所以this还是指向window
  
  
  // 案例四:
  // function foo(){
  //   console.log(this)
  // }
  //
  // let obj = {
  //   name:'coderwhy',
  //   foo:foo
  // }
  //
  // let bar = obj.foo
  // bar()  // 调用bar函数的时候是以独立函数进行调用,所以this还是指向window
  
  
  // 案例五:
  function foo(){
    function bar(){
      console.log(this)
    }
    return bar
  }
  
  let fo = foo()
  fo()  // 调用fo函数时是以独立函数进行调用,所以this还是指向window
  
  let obj = {
    name:'james',
    studying:fo
  }
  
  obj.studying()  // 不是独立函数,这里是obj对象调用了函数studying,所以this指向obj(隐式绑定)
  ```

###### 3.6 绑定规则二：隐式绑定：

* 通过某个对象进行调用：

  * 也就是它的调用位置中，是通过某个对象发起的函数调用

  ```javascript
  // 隐式绑定：object.fn()
  // object对象会被js引擎绑定到fn函数中的this里面
  
  
  //      console.log(this)
  //  }
  // bar()  // 独立函数调用，this指向window
  
  // 1.案例一：
  // let obj = {
  //     name:'itchao',
  //     age:18,
  //     foo(){
  //     console.log(this)
  // }
  // }
  //
  // obj.foo()  // 通过对象进行调用函数，this指向调用的对象
  
  // 2.案例二：
  // let obj1 = {
  //     name:'itchao',
  //     eating() {
  //         console.log(this.name + ' eating')
  //     },
  //     running() {
  //         console.log(this.name + ' running')
  //     }
  // }
  //
  // obj1.eating()   // obj1对象调用eating函数，因此this指向了发起调用的obj1对象
  // obj1.running()  // obj1对象调用running函数，因此this指向了发起调用的obj1对象
  
  // 注意：
  // let fn = obj1.eating
  // fn()    // 此时fn函数为独立函数，因此this指向window
  
  // 3.案例三：
  let obj2 = {
      name:'kobe',
      age:18,
      foo() {
          console.log(this)
      }
  }
  
  let obj3 = {
      name:'coderwhy',
      age:19,
      bar:obj2.foo
  }
  
  obj3.bar()  // 对象obj3调用了函数bar，因此this指向发起调用的obj3对象
  ```

###### 3.7 绑定规则三：显示绑定：

* 隐式绑定有一个前提条件：

  * 必须在调用的对象内部有一个对函数的引用（比如一个属性）
  * 如果没有这样的引用，在进行调用时，会报找不到该函数的错误
  * 正是通过这个引用，间接的将this绑定到了这个对象上

* 如果不希望在**对象内部**包含这个函数的引用，同时又希望在这个对象上进行强制调用，该怎么做呢？

  * JavaScript所有的函数都可以使用call和apply方法（这个和prototype有关）
    * 它们两个的区别这里不展开讲
    * 其实非常简单，第一个参数相同，后面的参数，apply为数组，call为参数列表
  * 这两个函数的第一个参数都要求是一个对象，这个对象的作用是什么呢？就是给this准备的
  * 在调用这个函数时，会将this绑定到这个传入的对象上

* **call-apply函数：**

  ```javascript
  // function foo()  {
  //     console.log('调用函数！', this)
  // }
  
  // 1.foo直接调用和call/apply调用的不同在于this绑定的不同
  // foo直接调用指向的是全局对象(window)
  // foo()  // 最简单的方式，直接调用函数
  // 可以改变this的指向，这里指向obj对象，但是需要在对象内加入一个属性
  // let obj = {
  //     name:'itchao',
  //     foo:foo
  // }
  // obj.foo()   // 对象obj调用了函数foo，因此this指向发起调用的obj对象
  
  // 需求：将this的指向改变为指向obj1，但是不在obj1内添加属性
  // 解决方法：使用call和apply函数，手动指定函数被调用时this的指向
  // 总结：call和apply函数可以手动改变this指向
  // let obj1 = {
  //     name:'kobe',
  //     age:18
  // }
  // foo.call()  // 只是调用了函数，没有改变this的指向，此时this指向全局作用域的window
  // foo.call(obj1)  // 调用了函数且改变了this的指向，此时this的指向被手动的改变为指向obj1对象
  // foo.apply()  // 只是调用了函数，没有改变this的指向，此时this指向全局作用域的window
  // foo.apply(obj1)  // // 调用了函数且改变了this的指向，此时this的指向被手动的改变为指向obj1对象
  // foo.apply('aaa')
  
  
  // 2.call和apply有什么区别？
  function sum(num1, num2){
      console.log(num1 + num2, this)
  }
  
  sum(20, 30, 40)
  sum.call('call', 20, 30, 40)  // 调用sum函数且改变this指向为call，call是按照【剩余参数的模式】传递参数
  sum.apply('apply', [20, 30, 40])  // 调用sum函数且改变this指向为apply，apply是按照【将参数放到一个数组】传递参数
  
  
  // 3.call和apply在执行函数时，是可以明确的绑定this(传入的第一个参数就是this的指向)，这个绑定规则称之为显示绑定
  ```

* **bind函数：**

  ```javascript
  function foo(){
      console.log(this)
  }
  
  // foo()  // 独立函数，this指向全局作用域的window
  // 需求：改变this的指向为aaa
  // 解决方案一(方案不佳)：call和apply函数都可以实现改变this的指向为aaa的效果，但是要想改变多次就需要调用多次call或者apply函数，不方便
  // foo.call('aaa')
  // foo.call('aaa')
  // foo.call('aaa')
  
  // 需求：改变this的指向为aaa
  // 解决方案二：使用bind函数改变this的指向为aaa，
  // bind函数优点：bind会生成一个新的函数，后面使用的时候调用新函数即可，可以手动改变this指向且不需要调用多次bind函数
  // 默认绑定和显示绑定bind冲突：优先级(显示绑定)
  let newFoo = foo.bind('aaa')  // foo对象调用bind函数，改变this指向为aaa
  newFoo()
  newFoo()
  newFoo()
  ```

###### 3.8 绑定规则四：new绑定：

* JavaScript中的函数可以当做一个类的构造函数来使用，也就是使用new关键字

* 使用new关键字来调用函数，会执行如下操作：

  * 1.创建一个全新的对象
  * 2.这个新对象会被执行prototype连接
  * 3.这个新对象会绑定到函数调用的this上(this的绑定在这个步骤上完成)
  * 4.如果函数没有返回其他对象，表达式会返回这个新对象

  ```javascript
  // 通过一个new关键字调用一个函数时(构造器)，这个时候this是在调用这个构造器时创建出来的对象
  // this = 创建出来的对象
  // 这个绑定的过程就是new绑定
  
  function Person(name, age){
      this.name = name
      this.age = age
  }
  // new关键字：创建新的对象然后赋值给this，最后返回this，也就是返回这个新对象
  let p1 = new Person('itchao', 18)
  let p2 = new Person('kobe',18)
  console.log(p1)
  console.log(p1.name, p2.age);
  console.log(p2)
  console.log(p2.name, p2.age);
  ```

##### 4. this其他补充

###### 4.1 一些内置函数的this分析

```javascript
// 1.setTimeout函数，定时器


// 类比setTimeout函数举例：
// function hySetTimeout(fn, duration) {
//     fn
// }
// hySetTimeout(function() {
//
// }, 2000)

// 注意：
// setTimeout函数内输出的this是指向window，原因:setTimeout函数内部调用function(){}时采用独立调用的方式进行调用
// setTimeout(function() {  // 接收另个函数作为参数
//     console.log(this)  // 输出结果：window
// }, 2000)


// 2.监听事件

// 在监听事件的时候，浏览器内部调用onclick的时候采用了类似boxDiv.onclick()的隐式绑定，所以this指向了发起调用的对象boxDiv
// const boxDiv = document.querySelector('.box')
// boxDiv.onclick = function() {
//     console.log('--------------',this)  // 输出结果：boxDiv对象
// }
// boxDiv.onclick = function() {  // 后面的点击事件会覆盖前面的点击事件，只能显示一个
//     console.log('11111111111',this)  // 输出结果：boxDiv对象
// }
//
// boxDiv.addEventListener('click', function() {  // 后面的事件不会覆盖前面的事件，能显示多个事件
//     console.log(this)  // 输出结果：boxDiv对象
// })
// boxDiv.addEventListener('click', function() {
//     console.log(this)  // 输出结果：boxDiv对象
// })
// boxDiv.addEventListener('click', function() {
//     console.log(this)  // 输出结果：boxDiv对象
// })


// 3.数组：foeEach/map/filter/find

// let names = ['kobe', 'james', 'curry', 'coderwhy', 'itchao']
// for(let i of names) {
//     console.log(i)  // 输出结果：kobe james curry coderwhy itchao
//     console.log(this)  // 输出结果：window
// }
//
// for(let i in names) {
//     console.log(i)  // 输出结果：0 1 2 3 4
//     console.log(this)  // 输出结果：window
// }
// forEach：
// names.forEach(function(item) {
//     console.log(item, this)  // 输出结果：默认情况下不改变this的指向则输出结果是window
// }, 'aaa')  // forEach接受第二个参数来改变this的指向
// map:
// names.map(function(item) {
//     console.log(item, this)  // 输出结果：默认情况下不改变this的指向则输出结果是window
// }, 'bbb')  // map接受第二个参数来改变this的指向
// filter:
// names.filter(function(item) {
//     console.log(item, this)  // 输出结果：默认情况下不改变this的指向则输出结果是window
// }, 'ccc')  // filter接受第二个参数来改变this的指向
// find:
// names.find(function(item) {
//     console.log(item, this)  // 输出结果：默认情况下不改变this的指向则输出结果是window
// }, 'ddd') // find接受第二个参数来改变this的指向
```

###### 4.2 规则优先级

1. 默认规则的优先级最低：

   * 默认规则的优先级是最低的，因为存在其他规则时，就会通过其他规则的方式来绑定this

2. 显示绑定的优先级高于隐式绑定：

   * ```javascript
     // function bar() {
     //     console.log(this)
     // }
     //
     // let obj = {
     //     name:'kobe',
     //     age:18,
     //     foo() {
     //         console.log(this)
     //     },
     //     bar:bar
     // }
     //
     // bar()  // 输出结果：window，原因：独立函数调用，指向window
     // obj.bar()  // 输出结果：obj对象，原因：隐式绑定，指向发起调用的obj对象
     
     // 1. call/apply的显示绑定的优先级高于隐式绑定的优先级
     // obj.bar.call('aaa')  // 输出结果：'aaa'，原因：显示绑定优先级高于隐式绑定
     
     // 2. bind与隐式绑定的优先级比较，bind的优先级高于隐式绑定
     // let lol = obj.foo.bind('bbb')
     // lol()  //  输出结果：‘bbb',比较不明显，因为此时并没有用obj来调用函数
     
     // 3. 更加明显的比较bind和隐式绑定的优先级，bind的优先级高于隐式绑定
     function foo() {
         console.log(this)
     }
     
     let obj = {
         name:'obj',
         foo:foo.bind('bbb')
     }
     obj.foo()  // 输出结果：'bbb'
     // 此时利用了obj对象调用foo函数，但是输出结果依旧是bind改变后的this指向，因此bind的优先级高于隐式绑定
     ```

3. new绑定的优先级高于隐式绑定:

   * ```javascript
     // 结论：new关键字不能和call/apply一起使用
     
     // 将new与bind一起比较优先级
     // new绑定的优先级高于bind绑定
     function foo() {
         console.log(this)
     }
     
     let bar = foo.bind('aaa')
     
     let obj = new bar()  // 输出结果：foo {}
     ```

4. new绑定的优先级高于显示绑定：

   * ```javascript
     // 结论：new关键字不能和call/apply一起使用
     
     // 将new与bind一起比较优先级
     // new绑定的优先级高于bind绑定
     function foo() {
         console.log(this)
     }
     
     let bar = foo.bind('aaa')
     
     let obj = new bar()  // 输出结果：foo {}
     
     // 优先级高低结论：
     // new绑定 > 显示绑定(apply/call/bind) > 隐式绑定(obj.foo()) > 默认绑定(独立函数调用)
     ```

5. **优先级高低比较结论：**

   * **new绑定 > 显示绑定(apply/call/bind) > 隐式绑定(obj.foo()) > 默认绑定(独立函数调用)**

##### 5. 特殊绑定

###### 5.1 忽略显示绑定：null/undefined

```javascript
function foo() {
    console.log(this)
}

foo.call('aaa')  // 输出结果：'aaa'
foo.call('bbb')  // 输出结果: 'bbb'
foo.call({})     // 输出结果： {}

// 特殊情况：
// call/apply/bind：当传入null/undefined时，自动将this绑定成全局对象
foo.call(null)   // 输出结果：window
foo.apply(undefined)  // 输出结果：window

let bar = foo.bind(null)
bar()  // 输出结果:window
```

###### 5.2 间接函数引用

```javascript
let obj1 = {
  name:'kobe',
  foo() {
    console.log(this)
  }
}

let obj2 = {
  name:'coderwhy'
}

// obj2.bar = obj1.foo
// obj2.bar()  // 输出结果：obj2对象

;(obj2.bar = obj1.foo)()  // 输出结果：window，原因：这么写相当于独立函数调用
// 注意：上面这行代码开头必须用;开头
// 否则编辑器无法正确解析，不知道代码结束没有，会把该行代码与上面的代码看成是一个整体，导致代码报错
```

###### 5.3 箭头函数 arrow function

* 箭头函数是ES6新增的一种编写函数的方法，并且它比函数表达式更加简洁

  * 箭头函数不会绑定this、arguments属性
  * 箭头函数不能作为构造函数来使用（不能和new一起来使用，会抛出错误）

* 箭头函数编写格式：

  * ( )：函数的参数
  * { }：函数的执行体

* 箭头函数的使用解析：

  ```javascript
  // 一. 编写箭头函数
  // 箭头函数格式：
  // 1. ():参数
  // 2. =>:箭头
  // 3. {}:函数执行体
  
  // 箭头函数完整写法：
  // let foo = (item) => {
  //   console.log(item)
  // }
  
  // 普通函数写法：
  // let bar = function (index) {
  //   console.log(index)
  // }
  
  
  // 高阶函数在使用时，也可以传入箭头函数
  let nums = [10, 20, 30, 40, 50]  // 后面使用的数组都是该数组
  nums.forEach((item,index,arr) => {
    console.log(item * 2, index, arr)
    // 输出结果：
    // 40 1 [ 10, 20, 30, 40, 50 ]
    // 60 2 [ 10, 20, 30, 40, 50 ]
    // 80 3 [ 10, 20, 30, 40, 50 ]
    // 100 4 [ 10, 20, 30, 40, 50 ]
  
  })
  
  
  // 箭头函数常见简写方式：
  
  // 简写一：如果参数只有一个时，那么()可以省略
  // let players = ['kobe', 'james', 'curry', 'coderwhy', 'itchao']
  // players.forEach(item => {  // 参数为一个时，可以省略()
  //   console.log(item)  // 输出结果：kobe james curry coderwhy itchao
  // })
  
  // 简写二：如果函数执行体只有一行代码，那么{}也可以省略
  // 强调：并且它会默认将这行代码的执行结果作为返回值
  // nums.forEach(item => console.log(item * 2))  // 输出结果:20, 40, 60, 80, 100
  // let newNums = nums.filter(item => item % 20 === 0)
  // console.log(newNums)  // 输出结果：[20, 40]
  
  // 结合filter/map/reduce函数将nums进行一系列操作，先对nums进行求余20操作，再进行乘以20操作，最后进行求和操作
  // let sum = nums.filter(item => item % 20 ===0 ).map(item => item * 20).reduce((preValue, item) => preValue + item)
  // console.log(sum)  // 输出结果：1200
  
  // 简写三(注意)：如果一个箭头函数，只有一行代码，并且返回一个对象，这时怎么编写箭头函数的简写
  // 需求代码格式：
  // let bar = () => {
  //   return {name:'kobe', age:18}
  // }
  // 对应的箭头函数简写格式：
  // let bar = () => ({name:'kobe', age:18})  // 注意：箭头函数执行体只有一行代码对象时，简写需要将函数执行体放入()中，当成一个整体
  ```

###### 5.4 ES6箭头函数—this获取问题

* 箭头函数不使用this的四种标准规则(也就是不绑定this)，而是根据外层作用域来决定this

  ```javascript
  // 1. 测试箭头函数中this的指向,箭头函数是不绑定this 的
  // let name = 'kobe'
  //
  // let foo = () => {
  //   console.log(this)  // 箭头函数的this由外层作用域决定，箭头函数是不绑定this的
  // }
  //
  // foo()  // 输出结果：window，独立函数调用
  // foo.call('aaa')  // 输出结果：window,显式绑定
  //
  // let obj = {foo:foo}
  
  // 2. 应用场景
  let obj = {
    data:[],
    getData() {
      // 发送网络请求，将结果放在上面的data属性中
      // 箭头函数之前的做法：
      // let that = this
      // setTimeout(function() {
      //   let nums = [10, 20, 30, 40, 50]
      //   that.data = nums
      //   console.log(this)  // this指向window，原因：setTimeout函数的内部是独立函数调用
      // }, 1000)
      // 箭头函数之后的做法：
      setTimeout(() => {
        let nums = [10, 20, 30, 40, 50]
        this.data = nums
        console.log(this)  // this指向obj对象，原因：箭头函数中的this是根据外层作用域决定的
      }, 2000)
    },
  }
  obj.getData()  // 隐式绑定，改变this的指向为指向obj对象
  ```

##### 6. this面试题

###### 6.1 面试题一

```javascript
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
```

###### 6.2 面试题二

```javascript
var name = 'window'

var person1 = {  // 对象不产生作用域，{}只是一个对象而已，这里的this指向的外层作用域是指向window
  name:'person1',
  foo1() {
    console.log(this.name)
  },
  foo2:() => console.log(this.name),
  foo3() {
    return function () {
      console.log(this.name)
    }
  },
  foo4() {
    return () => {
      console.log(this.name)
    }
  }
}

let person2 = {name:'person2'}

person1.foo1()  // person1,隐式绑定
person1.foo1.call(person2)  // person2,显示绑定的优先级高于隐式绑定的优先级

person1.foo2()  // window,箭头函数的this由外层作用域决定,foo2函数的外层作用域是window
person1.foo2.call(person2)  // window,箭头函数不绑定this，箭头函数的this由外层作用域决定,foo2函数的外层作用域是window

person1.foo3()()  // window,独立函数调用
person1.foo3.call(person2)()  // window,独立函数调用
person1.foo3().call(person2)  // person2,显示绑定改变this指向为发起调用的persson2

person1.foo4()()  // person1,隐式绑定和箭头函数不绑定this，箭头函数的this由外层作用域决定，这里的外层作用域是foo4函数作用域
person1.foo4.call(person2)()  // person2,显示绑定和箭头函数不绑定this，箭头函数的this由外层作用域决定，这里的外层作用域是foo4函数作用域
person1.foo4().call(person2)  // person1,隐式绑定和箭头函数不绑定this，箭头函数的this由外层作用域决定，这里的外层作用域是foo4函数作用域
```



