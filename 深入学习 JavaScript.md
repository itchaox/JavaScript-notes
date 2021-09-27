# 深入学习 JavaScript

#### 第一课 浏览器的工作原理和V8引擎

* V8引擎
  1. 代码被解析,v8引擎内部会创建一个对象(GlobalObject -> go)
  2. 运行代码
     * v8为了执行代码,v8yinqi八引擎内部会有一个执行上下文栈(Execution Context Stack,ECStack)(函数调用栈)
     * 执行全局代码时,为了全局代码能够正常的执行,需要创建全局执行上下文(Global Execution Context)(全局代码需要被执行时才会创建 )

---

#### 第二课 内存管理和内存泄漏

* 查找变量的规则：

  * 真实的查找路径是沿着**作用域链依次向上查找**

  * 例子：

    * ```javascript
      var name = 'itchao'
      
      foo(123)
      function foo(num){
          console.log(m)
          var m = 20
          var n = 30
          var name = 'foo'
          console.log(name)  //  输出结果：foo
      }
      console.log(name)  // 输出结果：itchao
      ```

  * 函数嵌套：

    * ```javascript
      var name = 'kobe'
      
      player(234)
      function player(num){
          console.log(age)  // 输出结果：undefined
          var age = 18
          var number = 8
          function man(){
              console.log(name)  // 输出结果：kobe
          }
          man()
      }
      ```

  * 函数调用函数的执行过程：

    * ```javascript
      // 函数调用函数的执行过程
      // 函数的父级作用域和它的定义位置有关系，与调用位置无关系
      var name ='kobe'
      
      function foo(){
          console.log(name)  // 输出结果：kobe
      }
      
      function bar(){
          var name = 'itchao'
          foo()
      }
      
      bar()
      ```

* 作用域提升面试题：

  * 作用域补充：

    * ```javascript
      // 作用域补充
      function foo(){
          // var m = 100  //  这样写会报错：未定义变量m，因为这里定义的是局部变量，外界无法进行访问
          m = 100  // 前面没写var相当于是全局变量，外界可以进行访问(但是建议不要这样写，不符合规范！面试可能会问，知道就行！)
      }
      
      foo()
      console.log(m)
      ```

  * 面试题一：

    * ```javascript
      // 面试题一
      var n = 100
      function foo(){
        n = 200
      }
      foo()
      
      console.log(n)  // 输出结果：200
      ```

  * 面试题二：

    * ```javascript
      // 面试题二
      function foo(){
          console.log(n)  // 输出结果：undefined(原因：存在AO，有变量提升)
          var n = 200
          console.log(n)  // 输出结果：200
      }
      
      var n =100
      foo()
      ```

  * 面试题三：

    * ```javascript
      // 面试题三
      var n = 100
      function foo1(){
          console.log(n)  // 输出结果：100（原因：函数的父级作用域是在定义的时候就决定好了，和调用位置无关）
      }
      
      function foo2(){
          var n = 200
          console.log(n)  // 输出结果：200（原因：查找变量按照作用域链依次向上查找）
          foo1()
      }
      
      foo2()
      console.log(n)  // 输出结果：100（原因：查找变量按照作用域链依次向上查找）
      ```

  * 面试题四：

    * ```javascript
      // 面试题四
      var a = 100
      function foo(){
          console.log(a)  // 输出结果：undefined（原因：函数在运行前会编译，编译的时候a为undefined，AO:{a:undefined}）
          return  // 退出函数 
          var a = 100
      }
      
      foo()
      ```

  * 面试题五：

    * ```javascript
      // 面试题五
      function foo(){
          var a = b = 100
          // 转成下面两行代码
          // var a = 100
          // b = 100
      }
      
      foo()
      
      console.log(a)  // 输出结果：报错，未定义变量a，因为这里的a是定义的局部变量
      console.log(b)  // 输出结果：100
      ```

* 认识**内存管理:**
  * 概念:不管什么样的编程语言,代码在执行过程中都是需要给它分配内存,不同的是某些编程语言需要手动管理内存,某些编程语言会自动管理内存
  * 内存管理的生命周期:
    * 第一步:分配申请你需要的内容(申请)
    * 第二步:使用分配的内存(存放一些东西,比如对象等)
    * 第三步:不需要使用时,对其进行释放
  * 不同的编程语言对于第一步和第三步会有不同的实现:
    * **手动管理内存**:比如C、C++,包括早期的OC,都是需要手动来管理内存的申请和释放(malloc和free函数)
    * **自动管理内存**:比如Java、JavaScript、Python、Swift、Dart等,它们自动帮助我们管理内存
  * JavaScript通常情况下手不需要手动管理的
* **JavaScript的内存管理:**
  * JavaScript会在**定义变量时**分配内存
  * 内存分配方式的区别:
    * JavaScript对于**基本数据类型内存的分配**会在执行时,直接在**栈空间**进行分配
    * JavaScript对于**复杂数据类型内存的分配**会在**堆内存**中开辟一块空间,并且将这块空间的指针返回值作为变量引用(因为复杂数据类型保存的是内存地址,所以也被成为引用数据类型)
* **JavaScript的垃圾回收:**
  * 概念:**内存大小是有限的**,当**内存不再需要**的时候,我们就需要**对其进行释放**,便于**腾出更多内存空间**
  
  * 在手动管理内存的语言中,需要通过一些方式自己来释放不再需要的内存,比如free函数:
    * 这种管理方式是**非常低效**,影响**编写逻辑代码的效率**
    * 这种方式对**开发者的要求也很高**,并且**一不小心就会产生内存泄露**
    
  * 大部分现代的编程语言都有自己的垃圾回收机制:
    * 垃圾回收的英文是Garbage Collection,简称GC
    * 对于那些不再使用的对象,都称之为**垃圾**,它需要被**回收**,以便释放更多的内存空间
    * 而我们的语言允许环境,比如Java的运行环境JVM,JavaScript的允许环境js引擎都会内存**垃圾回收器**
    * 垃圾回收器简称GC,在很多地方看到的GC就是垃圾回收器
    
  * 另一个关键问题,GC如何知道哪些对象不再使用的呢?
    * 这里要用到**GC算法**
    
  * 常用GC算法:
    * 引用计数:
      * 当一个对象有一个引用指向它时,那么这个对象的引用就+1
      * 当引用计数变为0的时候就认为不需要这个变量了,然后进行垃圾回收
      * 存在弊端:循环引用(两个对象之间互相引用,永远无法进行垃圾回收,会造成内存泄露)
    * **标记清除:**
      * 概念:这个算法是设置一个根对象(root object),垃圾回收器会定期从这个根开始,找所有从根开始有引用到的对象,对于哪些没有引用到的对象,就认为是不可用的对象
      * 这个算法可以很好的解决循环引用到问题
    * JS引擎比较广泛的采用的就是**标记清除算法,**当然类型于V8引擎为了进行更好的优化,它在算法的实现细节上也会结合一些其他的算法
    
  * 内存泄露:
  
    * 概念:用完了的东西该销毁的没有被销毁就是内存泄露
  
    * 闭包产生的内存泄露解决办法:
  
      * ```javascript
        function foo(){
            let name = 'itchao'
            let age = 18
            
            function bar(){
                console.log(name)
                console.log(age)
            }
            return bar
        }
        
        let fn = foo()
        fn()
        
        // 解决闭包产生内存泄露的办法
        fn = null
        foo = null  // 严格意义上的解决内存泄露的办法
        ```
  

---

#### 第三课 作用域、作用域提升、执行上下文

##### 1. JavaScript函数内容（重要）

* JS中函数是一等公民
  * 在JavaScript中，函数是非常重要的，并且是一等公民：
    * 意味着函数的使用是非常灵活的
    * 函数可以作为另外一个函数的参数，也可以作为另外一个函数的返回值来使用
  * 自己编写高级函数
  * 使用内置的高阶函数

* 函数作为参数的使用案例：

  * ```javascript
    // 函数的基本使用
    function foo(val){
        console.log('itchao',val)
    }
    foo(321)
    
    // 将函数作为另外一个函数的参数
    function add(math){  // math这里是形参，可以自定义
        math()
    }
    
    function sum(){
        console.log('求和函数！')
    }
    add(sum)
    
    // 函数作为参数的使用案例
    function calc(num1, num2, calcFn){
        console.log(calcFn(num1, num2))
    }
    
    function add(num1, num2){
        return num1 + nu
    }
    
    function sub(num1, num2){
        return num1 - num2
    }
    
    function mul(num1, num2){
        return num1 * num2
    }
    
    var m = 20
    var n = 80
    calc(m, n, add)
    calc(m, n, sub)
    calc(m, n, mul)
    ```

* 函数作为返回值的使用：

  * ```javascript
    // js语法允许函数内部再定义函数
    function foo(){
        function bar(){
            console.log('hello itchao')
        }
        // bar()  // 这里不直接执行函数
        // return bar() // 不要这样写，这样写是执行这个函数，把这个函数返回出去了，这里是需要直接返回这个函数
        return bar  // 把函数直接返回出去
    }
    var fn = foo()  // 用fn变量来接受返回出来的bar()函数
    fn()  // 调用fn() 函数
    
    
    // 使用场景案例(通过传入的参数，定制函数)
    function makeAdder(count){
        function add(num){
            return count + num
        }
        return add
    }
    var add30 = makeAdder(30)
    console.log(add30(70))
    console.log(add30(150))
    // 高阶函数：把一个函数如果接受另外一个函数作为参数，或者该函数会返回另外一个函数作为返回值的函数，那么这个函数就被称之为是一个高阶函数
    // 上面的案例中makeAdder、foo是把另外一个函数作为返回值返回，所以makeAdder、foo是高阶函数
    ```

* 数组中的函数使用：

  * ```javascript
    // 函数和方法的区别：
    // 函数function：独立的function，那么称之为是一个函数
    // 例如：(该函数是定义在全局中的，不属于任何东西)
    // function foo(){ }
    // 方法method：当我们的一个函数属于某一个对象时，我们称这个函数是这个对象的方法
    // const obj = {
    //     foo: function(){ }
    // }
    // obj.foo()  // 调用obj对象内的foo方法
    
    const nums = [1, 20, 50, 100, 300]  // 下面的案例都是用的这个数组
    // 以下是几个关于数组的高级函数
    // 高级函数一：filter()，过滤函数，拿到自己需要的数据，过滤掉不需要的多余数据
    const newNums = nums.filter(item => item > 30)  // 生成一个新的数组newNums，把原数组nums中大于30的数据放到新数组newNums中
    console.log(newNums)
    
    // 高级函数二：map()，（映射）遍历数组中所有元素，每次执行匿名函数都支持三个参数，参数分别为item（当前每一项），index（索引值），arr（原数组）
    // map方法返回一个新的数组，数组中的元素为原始数组调用函数处理后的值
    const addNums = nums.map(item => item + 100)
    console.log(addNums)
    
    // 高级函数三：forEach()，调用数组的每个元素，将元素传给回调函数，每次执行匿名函数都支持三个参数，参数分别为item（当前每一项），index（索引值），arr（原数组）
    nums.forEach(item => console.log(item + 20))
    
    // 高级函数四：find/findIndex，匹配查找，拿到自己需要的值
    // 案例一：find（拿到符合自己要求的那个数据）
    const item = nums.find(item => item === 20)
    console.log(item)
    // 案例二：find（匹配查找对象，拿到符合自己需要的对象）
    const friends = [{
        name:'kobe',
        age:18,
        height:1.98
    },{
        name:'itchao',
        age:19,
        height:1.85
    },{
        name:'codewhy',
        age:20,
        height:1.88
    }]
    const findFriends = friends.find(item => item.age  === 20)  // item在这里是形参，可以自己命名
    console.log(findFriends)
    // 案例三：findIndex,匹配查找，拿到自己需要的数据的索引值
    const findIndexFriends = friends.findIndex(item => item.age === 20)
    console.log(findIndexFriends)
    
    
    // 高级函数五：reduce(),累加
    // 原生代码累加写法：
    let total = 0
    for(let i = 0; i < nums.length; i++){
        total += nums[i]
    }
    console.log(total)
    // reduce()函数写法：
    const total = nums.reduce(function (preValue, item){
        return preValue + item
    }, 0)
    console.log(total);
    // reduce()函数的过程分析：
    // preValue的初始化为0
    // 第一次： preValue:0, item:1
    // 第二次： preValue:1, item:20
    // 第三次： preValue:21, item:50
    // 第四次： preValue:71, item:100
    // 第五次： preValue:171, item:300
    // 最后的结果：preValue:171, item:300，preValue + item = 471
    ```

##### 2. JavaScript闭包（重要）

* JS中闭包的定义:
  * 闭包的定义,分成两个:在计算机科学中和在JavaScript中
  * 在计算机科学中对闭包的定义(维基百科):
    * 闭包(英文:Closure),又称**词法闭包(Lexical Closure)**或**函数闭包(function Closure)**
    * 是在支持**头等函数**的编程语言中,实现词法绑定的一种技术
    * 闭包在实现上市一个结构体,它存储了一个函数和一个关联的环境(相当于一个符号查找表)
    * 闭包和函数最大的区别在于,当捕捉闭包的时候,它的**自由变量**会在捕捉时被确定,这样即使脱离了捕捉到上下文,它也能照常运行
  * 闭包的概念出现于60年代,最早实现闭包的程序是 Scheme,那么我们就可以理解为什么JavaScript中有闭包:
    * 因为JavaScript中有大量的设计师来源于Scheme的
  * MDN对JavaScript闭包的解释:
    * 一个函数和对其周围状态(lexical environment,词法环境)的引用捆绑在一起(或者说函数被引用包围),这样的组合就是**闭包(closure)**
    * 闭包让你可以在一个内层函数中访问到其外层函数的作用域
    * 在JavaScript中,每当创建一个函数,闭包就会在函数创建的同时被创建出来
  * **闭包**是由两部分组成的: **函数 + 可以访问的自由变量**(严格意义上的闭包)
  * coderwhy老师的理解和总结:
    * 一个普通的函数function,如果它可以访问外层作用域的自由变量,那么这个函数就是一个闭包
    * 从广义的角度来说:JavaScript中的函数都是闭包(可以访问,但是并没有访问外层作用域变量)
    * 从狭义的角度来说:JavaScript中一个函数,如果访问了外层作用域的变量,那么它是一个闭包(已经访问外层作用域变量)
  
* **闭包内存泄漏：**

  * 闭包内存泄漏案例：

    ```javascript
    function createFnArray(){
        // 占据的空间是4M，4 * 1024 * 1024 ，1kb = 1024 byte
        let arr = new Array(1024*1024).fill(1)
        return function(){
            console.log(arr.length)  // 这个函数引用了上面的对象导致没法销毁
        }
    }
    
    // let arrayFn = new createFnArray()
    
    let arrayFn = []
    for(let i =0; i < 100; i++){
        setTimeout(() => {
            arrayFn.push(createFnArray())
        }, 100 * i)
    }
    
    // 等上面都创建完，再进行销毁
    setTimeout(() => {
        for(let i = 0; i < 50; i++){
            setTimeout(() => {
                arrayFn.pop()
            }, 100 * i)
        }
    }, 10000)
    ```

  * 闭包引用的自由变量销毁：

    ```javascript
    // AO不适用的属性
    // 闭包在引用外面自由变量的时候，js引擎会进行一定的优化，把没有使用到的自由变量进行销毁，便于腾出更多的空间
    function foo(){
        let name = 'itchao'
        let age = 18
        function bar(){
            // debugger  打断点，查看闭包内的信息
            console.log(name)
            console.log(age)
        }
        return bar
    }
    
    let fn = foo()
    fn()
    ```

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

###### 3.5 绑定规则一:默认绑定:

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

1.  默认规则的优先级最低：

   * 默认规则的优先级是最低的，因为存在其他规则时，就会通过其他规则的方式来绑定this

2.  显示绑定的优先级高于隐式绑定：

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

3.  new绑定的优先级高于隐式绑定:

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

4.  new绑定的优先级高于显示绑定：

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

5.  **优先级高低比较结论：**

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

###### 6.3 面试题三

```javascript
var name = 'window'
function Person(name) {
  this.name = name
  this.foo1 = function () {
    console.log(this.name)
  },
    this.foo2 = () => console.log(this.name),
    this.foo3 = function() {
    return function () {
      console.log(this.name)
      }
    },
    this.foo4 = function () {
    return () => {
      console.log(this.name)
    }
  }
}

let person1 = new Person('person1')
let person2 = new Person('person2')

// person1.foo1()  // person1,隐式绑定
// person1.foo1.call(person2)  // person2,显示绑定

// person1.foo2()  // person1,箭头函数不绑定this,外层作用域决定箭头函数this指向,此时外层作用域是person1函数作用域
// person1.foo2.call(person2)  // person1,箭头函数不绑定this,外层作用域决定箭头函数this指向,此时外层作用域是person1函数作用域

// person1.foo3()()  // window,独立函数调用
// person1.foo3.call(person2)()  // window,独立函数调用
// person1.foo3().call(person2)  // person2,显示绑定

// person1.foo4()()  // person1,箭头函数不绑定this,外层作用域决定箭头函数this指向,此时外层作用域是person1函数作用域
// person1.foo4.call(person2)()// person2,箭头函数不绑定this,外层作用域决定箭头函数this指向,此时外层作用域是person2函数作用域
// person1.foo4().call(person2)// person1,箭头函数不绑定this,外层作用域决定箭头函数this指向,此时外层作用域是person1函数作用域
```

###### 6.4 面试题四

```javascript
var name = 'window'
function Person(name) {
  this.name = name
  this.obj = {
    name:'obj',
    foo1:function () {
      return function () {
        console.log(this.name)
      }
    },
    foo2:function () {
      return () => {
        console.log(this.name)
      }
    }
  }
}

let person1 = new Person('person1')
let person2 = new Person('person2')

// person1.obj.foo1()()  // window,独立函数调用
// person1.obj.foo1.call(person2)()  // window,独立函数调用
// person1.obj.foo1().call(person2)  // person2,显示绑定

// person1.obj.foo2()()  // obj,箭头函数不绑定this,外层作用域决定了箭头函数的this,此时的外层作用域是foo2函数作用域
// person1.obj.foo2.call(person2)()  // person2,箭头函数不绑定this,外层作用域决定了箭头函数的this,此时的外层作用域是foo2函数作用域
// person1.obj.foo2().call(person2)  // obj,箭头函数不绑定this,外层作用域决定了箭头函数的this,此时的外层作用域是foo2函数作用域
```

#### 第十二课 ES6内容(重要)

##### 1.class 关键字

###### 1.1 class类的声明

```javascript
// 类的声明
class Person {

}

// function Peroson() {
//
// }

// 类的表达式
// let person = class {
//
// }

// 研究一下类的特点
console.log(Person.prototype)
console.log(Person.prototype.__proto__)
console.log(Person.prototype.constructor)  // constructor指向函数本身
console.log(typeof Person)
let p = new Person()
p.__proto__ = Person.prototype
console.log(p.__proto__ === Person.prototype)
```

###### 1.2 class类的构造函数

```javascript
// 类的声明
class Person {
  // 类的构造函数:constructor
  // 注意:一个类只能有一个构造函数
  // 1.在内存中创建一个对象
  // 2.将类的原型prototype赋值给创建出来的对象 moni.__proto__ = Person.prototype
  // 3.将对象赋值给函数的this:new绑定 this  = moni
  // 4.执行函数体中的代码
  // 5.自动返回创建出来的对象
  constructor(name, age) {
    console.log(this.name = name)
    console.log(this.age = age)
  }
}

let p = new Person('itchao', 18)  // 输出结果:itchao 18
console.log(p)  // 输出结果:Person { name: 'itchao', age: 18 }
```

###### 1.3 class中的方法定义

```javascript
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
```

###### 1.4 class中实现继承

* **super关键字:**

  * 在子(派生)类的构造函数中使用this或者返回默认对象之前,必须先通过super调用父类的构造函数!

  * super的使用位置有三个:子类的构造函数、实例方法、静态方法

    ```javascript
    class Person {
      constructor(name, age) {
        this.name = name
        this.age = age
      }
    
      eating() {
        console.log(this.name + ' eating')
      }
    
      running() {
        console.log(this.age + ' 岁的人在跑步')
      }
    }
    
    // Student称之为子类(派生类)
    class Student extends Person {
      // JS引擎在解析子类的时候就有要求,如果我们有实现继承
      // 那么子类的构造方法中,在使用this之前
      constructor(name, age, sno) {
        super(name, age)  // 必须调用父类的构造函数
        this.sno = sno
      }
    
      // 类对父类的方法进行重写,就是父类和子类的方法相同,子类的方法覆盖了父类的方法
      eating() {
        console.log('学生在吃饭!!!')
      }
    
      // 重写
      foo() {
        super.eating()  // 复用父类的方法
        console.log('子类重写父类方法!')
      }
    
      //重写静态方法
      static staticMethod() {
        console.log('StudentStaticMethod')
      }
    
    }
    
    let p = new Student('kobe', 18, 81)
    console.log(p)
    p.eating()
    p.running()
    // p.foo = '绵阳市'
    
    // console.log(Object.getOwnPropertyDescriptors(p.__proto__.__proto__))
    ```

###### 1.5 ES6转ES5的代码(没太听懂,需要再听一次)

```javascript
class Person {
  // constructor(name, age) {
  //   this.name = name
  //   this.age = age
  // }
}

// let p = new Person('kobe', 18)
// console.log(p)

// babael转换
function _callCallCheck(instance, Constructor) {
  if(! (instance instanceof  Constructor)) {
    throw new TypeError('Cannot call a class a function')
  }
}
let foo = function Person() {

}

foo()

//  /*#__PURE__*/  纯函数
// webpack 压缩 tree-shaking
// 这个函数没作用

```

###### 1.6 ES6转ES5的继承(没听到,需要再听!)





#### 第八课 基于对象的封装、原型链

* with语句(了解)

* eval函数(了解)

  * 概念:eval是一个特殊的函数,它可以将传入的字符串当做JavaScript代码来运行

  * 例子:

    ```javascript
    var jsString = 'var name = "itchao"; console.log(name);'
    
    eval(jsString)
    ```

    

  * 不建议使用eval函数:
    * eval代码的可读性非常差(代码的可读性是高质量代码的重要原则)
    * eval是一个字符串,那么可能在执行的过程中被刻意篡改,那么可能会造成被攻击的风险
    * eval的执行必须经过JS解释器,不能被JS引擎优化

* **严格模式(掌握)**

  * 在ECMAScript5标准中,JavaScript提出了**严格模式的标准(Strict Mode)**

  * **严格模式**是一种具有限制性的JavaScript模式,从而让代码隐式的脱离了"懒散(sloppy)模式"

  * 支持严格模式的浏览器在检测到代码中有严格模式时,会以严格模式的方式进行检测和执行

  * 用法:

    * "use strice"  // 在这后面的代码都开启了严格模式

  * 严格模式对正常的JavaScript语义进行了一些限制:

    * 严格模式通过抛出错误来消除一些原有的**静脉(silent)错误**
    * 严格模式让**JS引擎在执行代码时可以进行更多的优化**(不需要对一些特殊的语法进行处理)
    * 严格模式禁用了**在ECMAScript未来版本可能会定义的一些语法**

  * 严格模式的开启方式:

    * 全局开启严格模式:

      * ```javascript
        //全局开启严格模式
        "use strict"
        var name = 'kobe'
        console.log(name)
        
        var truex = 'james'
        console.log(truex)
        ```

        

    * 局部开启严格模式:

      * ```javascript
        // 局部开启严格模式
        function foo(){
          "use strict"
          var name = 'itchao'
          console.log(name)
        }
        foo()
        
        player = 'kobe'
        console.log(player)
        ```

  * 严格模式的限制

    * 禁止意外创建全局变量

      * ```javascript
        "use strict"
        // 1. 禁止意外创建全局变量
        name = 'itchao'
        console.log(name)
        
        function foo(){
          age = 20
        }
        
        foo()
        console.log(age)
        ```

    * 不允许函数内又相同的参数名称

      * ```javascript
        "use strict"
        // 2. 不允许函数有相同的参数
        function foo(x, y, x){
          console.log(x, y, x)
        }
        foo(10, 20, 10)
        ```

    * 静默错误

      * ```javascript
        "use strict"
        // 3.静默错误
        true.name = 'abc'
        NaN = 123
        ```

    * 不允许使用八进制

      * ```javascript
        "use strict"
        // 4.不允许使用八进制的格式
        var num1 = 0o123 // 八进制
        var num2 = 0x123 // 十六进制
        var num3 = 0b123 // 二进制
        console.log(num1, num2, num3)
        ```

    * with语句不允许使用

    * eval函数不会向上引用变量

      * ```javascript
        var jsString = 'var name = "itchao"; console.log(name);'
        eval(jsString)
        ```
      
    * 严格模式下的this
  
      * 在严格模式下,自执行函数(默认绑定)会指向undefined
      * 之前编写的代码中,自执行函数我们是没有使用过this直接去引用window

#### 第九课、深入学习对象

* JavaScript其实支持多重编程范式的,包括**函数式编程和面向对象编程**:

  * Javascript中的对象被设计成一组**属性的无序集合**,像是一个**哈希表**,由key和value组成
  * **key是一个标识符名称,value可以说任意类型**,也可以事**其他对象或者函数类型**
  * 如果值是**一个函数**,那么我们可以称之为是**对象的函数**

* 创建对象的方式:

  * 方式一:通过new Object( )创建

    * ```javascript
      var obj = new Object()
      obj.name = 'itchao'
      obj.age = 18
      obj.height = 1.85
      obj.eat = function (){
        console.log('吃东西')
      }
      obj.eat()
      ```

  * 方式二:通过字面量创建

    * ```javascript
      var itchao = {
        name:'chao',
        age:18,
        height:1.88,
        eat:function (){
          console.log('在吃冰淇淋!')
        }
      }
      itchao.eat()

* Object.defineProperty()方法

  * 会直接在一个对象上定义一个新属性,或者修改一个对象的现有属性,并返回此对象

  * ```javascript
    Object.defineProperty(obj, prop, descriptor)
    ```

  * 可接收三个参数:

    * obj:要定义属性的对象
    * prop:要定义或者修改的属性的名称或者Symbol
    * descriptor:要定义或修改的属性描述符)(属性描述符是一个对象)

  * 返回值:

    * 被传递给函数的对象

  * 用法:

    * ```javascript
      var itchao = {
        name:'chao',
        age:18,
        height:1.88
      }
      console.log(itchao)
      Object.defineProperty(itchao, "name",{
        value:'kobe'
      })
      console.log(itchao)
      ```

* 数据属性描述符:(有如下四个特性)

  * [[Configurable]]:表示属性是否可以通过delete删除属性,是否可以修改它的特性,或是否可以将它修改为存取属性描述符
    * 当我们直接在一个对象上定义某个属性时,这个属性的[[Configurable]]默认为**true**
    * 当我们通过属性描述符定义一个属性时,这个属性的[[Configurable]]默认为**false**
  * [[Enumerable]]:表示属性是否可以通过for-in或者Object.keys()返回该属性
    * 当我们直接在一个对象上定义某个属性时,这个属性的[[Enumerable]]默认为**true**
    * 当我们通过属性描述符定义一个属性时,这个属性的[[Enumerable]]默认为**false**
  * [[Writable]]:表示是否可以修改属性的值
    * 当我们直接在一个对象上定义某个属性时,这个属性的[[Writable]]默认为**true**
    * 当我们通过属性描述符定义一个属性时,这个属性的[[Writable]]默认为**false**
  * [[value]]:属性的value值,读取属性时会返回该值,修改属性时,会对其进行修改
    * 默认情况下这个值是**undefined**

* 存储属性描述符:

  * 隐藏某一个私有属性不希望直接被外界使用和赋值
  * 如果我们希望截获一个属性它访问和设置值得过程时,也会使用存储属性描述符

* 定义多个属性描述符:
  * 私有属性:JS里面没有严格意义上的私有属性,但是用 _ 开头的都默认是私有属性或者私有方法
  * Object.defineProperties( )方法,可以定义多个对象

* 对象的方法:

  ```javascript
  let obj = {
    name:'kobe',
    age:18
  }
  
  obj.height = 1.88
  obj.address = '成都市'
  obj.city = '北京市'
  obj.city = '上海市'
  
  // 禁止对象继续添加新的属性
  Object.preventExtensions(obj)
  
  // delete 可以删除对象内的元素
  delete  obj.age
  console.log(obj)
  // freeze()方法让属性不可以修改(writable:false)
  Object.freeze(obj)
  obj.name = 'itchao'
  
  console.log(obj.name)
  ```

* 创建多个对象的方案:

  * 工厂模式:

    * 工厂模式是一种常见的设计模式

    * 通常我们会有一个工厂方法,通过该工厂方法我们可以产生想要的对象

    * ```javascript
      // 工厂模式:工厂函数
      function createPerson(name, age, height, address){
        let p = {}
      
        p.name = name
        p.age = age
        p.height = height
        p.address = address
        p.eating = function(){
          console.log(this.name + 'eating')
        }
        p.running = function(){
          console.log(this.name + 'running')
        }
        return p
      }
      
      let foo = new createPerson('kobe',18,1.98,'洛杉矶')
      let foo1 = new createPerson('itchao',19,1.85,'成都')
      let foo2 = new createPerson('coderwhy',20,1.88,'北京')
      console.log(foo)
      console.log(foo1)
      console.log(foo2)
      
      // 工厂模式的缺点(获取不到对象最真实的类型)
      console.log(foo, foo1, foo2)
      ```

  * **构造函数:**

    * 构造函数也称为构造器(constructor),通常是我们在常见对象时会调用的函数

    * 在其他面向的编程语言里面,构造函数是存在于类中的一个方法,称之为构造方法

    * 但是JavaScript中单构造函数有点不太一样

    * ```javascript
      function foo(){
      console.log('foo____')
      }
      
      // 这样调用就是一个普通的函数
      foo()
      
      // 通过new调用函数就变成了构造函数,在JavaScript中任何函数都可以说普通函数也可以说构造函数
      new foo()
      ```

    * new操作符调用的作用:

      * 1.在内存中创建一个新的对象(空对象)
      * 2.这个对象内部的[[prototype]]属性会被赋值为该构造函数的prototype属性
      * 3.构造函数内部的this,会指向创建出来的新对象
      * 4.执行函数的内部代码(函数体代码)
      * 5.如果构造函数没有返回非空对象,则返回创建出来的新对象

    * 构造函数的使用介绍:

      * ```javascript
        // 规范:构造函数的首字母一般都是大写!
        function Person(name, age, height){
          this.name = name
          this.age = age
          this.height = height
          this.eating = function(){
            console.log('eating')
          }
        
        }
        
        new aerson()
        
        let kobe = new Person('kobe',18,1.98)
        let james = new Person('james',19,2.03)
        console.log(kobe, james)
        ```

##### 原型和原型链(重要):

* 对象原型的理解:

  ```javascript
  // 每个对象中都有一个[[prototype]]属性,这个属性可以称之为对象的原型(隐式原型)
  var obj = {name:'itchao'} // [[ prototype ]]
  
  var info = { } // [[ prototype ]]
  // 1.解释原型的概念和查看原型
  // 早期的ECMA是没有规范如何去查看[[prototype]]
  
  // 给对象中提供了一个属性,可以让我们查看这个原型对象(浏览器提供)
  console.log(obj.__proto__)
  console.log(info.__proto__)
  
  // ES5以后提供查看[[prototype]]的方法
  console.log(Object.getPrototypeOf(obj))
  
  // 2.原型的作用
  // 当我们从一个对象中获取某一个属性时,会触发[[get]]操作
  // 步骤:
  // 1.在当前对象中去查找对应的属性,如果找到就直接使用该属性
  // 2.如果没有找到就沿着原型链去查找[[prototype]]
  // obj.age = 18
  obj.__proto__.age = 21  // 如果自己的对象中没有找到age属性,沿着原型链中查找就可以查到该age属性
  console.log(obj.age)
  ```

* 函数原型的理解:

  ```javascript
  function foo(){
  }
  
  // 函数也是一个原型
  console.log(foo.__proto__)  // 函数作为一个对象来说,它也有[[ prototype ]]隐式原型
  
  // 函数它因为是一个函数,所以它会多出来一个显示原型属性:prototype
  console.log(foo.prototype)
  
  let foo1 = new foo()
  let foo2 = new foo()
  
  console.log(foo1.__proto__ == foo.prototype)
  console.log(foo2.__proto__ == foo.prototype)
  ```

* Person构造函数原型:

  ```javascript
  function Person(){
  
  }
  
  let p1 = new Person()
  let p2 = new Person()
  
  // 对象的隐式原型__proto__等于构造函数的显示原型prototype
  console.log(p1.__proto__ === Person.prototype)
  console.log(p2.__proto__ === Person.prototype)
  
  // 例子:如果要打印一个对象的name属性,假如该对象没有age属性,那么会沿着原型链去向上查找,看原型链上是否有name属性
  
  // console.log(p1.name)  // 输出结果:undefined
  
  // p1.__proto__.name = 'kobe'
  // console.log(p1.name)  // 输出结果:kobe
  
  Person.prototype.name = 'james'
  console.log(p1.name)  // 输出结果:james
  ```

* 函数原型上的属性:

  ```javascript
  function  foo(){
      
  }
  // console.log(foo.prototype)
  
  // console.log(Object.getOwnPropertyDescriptors(foo))
  
  Object.defineProperty(foo.prototype,"constructor",{
    enumerable:true,
    configurable:true,
    writable:true,
    value:'原型和原型链相关问题!'
  })
  
  // prototype.constructor // 构造函数本身
  // console.log(foo.prototype.constructor)  // [ Function:foo ]
  // console.log(foo.prototype.constructor.name)
  
  // 2.我们也可以添加自己的属性
  foo.prototype.name = 'itchao'
  foo.prototype.age = 18
  
  let foo1 = new foo()
  console.log(foo1.name, foo1.age)
  
  // 3.直接修改整个prototype的对象
  foo.prototype = {  // 创建一个新的对象,有一个新的内存地址,可以直接改变指针的指向
    name:'kobe',
    age:18,
    height:1.98
  }
  
  let foo2 = new foo()
  console.log(foo2.height)
  
  // 真实开发中我们可以通过Object.defineProperty方式添加constructor
  Object.defineProperty(foo.prototype, 'constructor',{
    enumerable:false,
    configurable:true,
    writable:true,
    value:foo
  })
  ```

* 创建对象的方案--原型和构造函数:

  ```javascript
  function foo(name,  age, height){
    this.name = name
    this.age = age
    this.height = height
    foo.prototype.eat = function (){
      console.log(`${this.name} + eating`)
    }
  }
  
  let foo1 = new foo('kobe',18,1.98)
  let foo2 = new foo('coderwhy',19,1.88)
  let foo3 = new foo('itchao',20,1.85)
  console.log(foo1)
  console.log(foo2)
  console.log(foo3)
  foo1.eat()
  foo2.eat()
  foo3.eat()
  ```

* **原型链:**

  ```javascript
  let obj = {
    name:'itchao',
    age:18
  }
  
  // [[get]]操作
  // 1.在当前对象查找属性
  // 2.如果没有找到,这个时候就会去原型(__proto__)对象上查找
  // 3.
  
  
  obj.__proto__.address = '南湖立交地铁站'
  obj.__proto__ = {
  
  }
  
  obj.__proto__.__proto__ = {
    game:'lol'
  }
  console.log(obj)
  // 原型链
  console.log(obj.address)
  console.log(obj.game)
  ```

  * Object原型:

    * [Object:null prototype]{},是最顶层的原型

      * 从Object直接创建出来的对象的原型都是[Object:null prototype]{}
      * 特殊一: 该对象有原型属性,但是它的原型属性已经指向的是null,已经是顶层原型了
      * 特殊二: 该对象上有很多默认的属性和方法

    * 顶层原型:

      ```javascript
      let obj1 = {}  // 字面量创建对象
      let obj2 = new Object()   // 创建一个对象
      
      function Foo(){
        console.log('hello itchao')
      }
      
      let foo1 = new Foo()
      
      // 1.在内存中创建一个对象
      // var obj ={}
      // 2.this的赋值
      // this = obj
      // 3.将Foo函数的显示原型prototype赋值给前面创建出来的对象的隐式原型p.__proto__ = Foo.prototype
      
      let bar = {
        name:'kobe',
        age:18
      }
      
      console.log(bar.__proto__)
      console.log(Object.prototype)
      console.log(bar.__proto__ === Object.prototype)
      ```

    * Object是所有类的父类:

      * 原型链最顶层的原型对象就是Object的原型对象

* **JavaScript中的类和对象:**

  * 当我们编写如下代码时,怎么称呼这个Person呢?

  * 在JS中Person应该被称之为是一个构造函数

  * 从很多面向对象语言过来的开发者,也习惯称之为类,因为类可以帮助我们创建出来对象p1、p2

  * 如果从面向对象的编程范式角度来看,Person确实是可以称之为类

    ```javascript
    //例子
    function foo(){  // foo是普通的函数
        
    }
    
    let foo1 = new foo()  // 通常称foo为类
    let foo2 = new foo()
    ```


##### 面向对象的特性--继承:

* 面向对象的三大特性:封装、继承、多态
  * 封装:将属性和方法封装到一个类中,可以称之为封装的过程
  * 继承:继承是面向对象中非常重要的,不仅仅可以减少重复代码的数量,也是多态的前提(纯面向对象中)
  * 多态:不同的对象在执行时表现出不同的形态
  
* 继承是做什么呢?
  * 继承可以帮助我们将重复的代码和逻辑抽取到父类中,子类只需要直接继承过来使用即可
  
* 父类、子类：子类可以继承自父类

* **原型链**的继承方案：

  ```javascript
  // 父类：公共属性和方法
  function Person(){
      this.name = 'itchao'
      this.friend = []
  }
  
  Person.prototype.eating = function(){
      console.log(this.name + ' eating')
  }
  
  // 子类：特定属性和方法
  function Student() {
      this.sno = 24
  }
  
  let p = new Person()  // 注意顺序不能乱写，不能放在studying的后面，这样会报错
  Student.prototype = p  // 把对象中该有的属性放到了Student原型上面
  
  Student.prototype.studying = function() {
      console.log(this.name + ' studying')
  }
  let stu = new Student()
  console.log(stu.name)
  console.log(stu.sno)
  stu.eating()
  stu.studying()
  
  // 原型链实现继承的弊端：
  // 1.第一个弊端：打印stu对象，继承的属性是看不到的（原型上的属性是看不到的，只看得到对象本身有的属性）
  // console.log(stu.name)
  
  // 2.第二个弊端：创建出来两个对象
  let stu1 = new Student()
  let stu2 = new Student()
  
  // 情况一：
  // 获取引用，修改引用中的值，会影响其他对象
  // stu1.friend.push('kobe')
  //
  // console.log(stu1.friend)
  // console.log(stu2.friend)
  
  // 情况二：
  // 直接修改对象上的属性，是给本对象添加一个新属性，不会影响其他对象
  // stu1.name = 'kobe'
  // console.log(stu2.name)
  
  // 3.第三个弊端：在前面实现类的过程中都没有传递参数
  ```

* 借用**构造函数**继承：

  * 为了解决原型链继承中存在的问题，开发人员提供了一种新的技术：constructor stealing(有很多的名称：借用构造函数或者称之为经典继承或者称之为伪造对象)

    * steal是偷窃、剽窃的意思，但是这里可以翻译成借用

  * 借用继承的做法非常简单：在子类型构造函数的内部调用父类型构造函数

    * 因为函数可以在任意的时刻被调用

    * 因此通过apply（）和call（）方法也可以在新创建的对象上执行构造函数

    * ```javascript
      function Student(name, friends, sno){
        Person.call(this, name, friends)
        this.sno = sno
      }
      
      Student.prototype = Person.prototype
      ```

    * 具体代码如下:

    ```javascript
    // Person.call(this, name, age, friends)  // 关键代码，改变this的指向为Student，可以直接解决前面提到的所有弊端问题
    
    // 父类：公共属性和方法
    function Person(name, age, friends){
        this.name = name
        this.age = age
        this.friends = friends
    }
    
    Person.prototype.eating = function(){
        console.log(this.name + ' eating')
    }
    
    // 子类：特定属性和方法
    function Student(name, age, friends, sno) {
        Person.call(this, name, age, friends)  // 关键代码，改变this的指向为Student，可以直接解决前面提到的所有弊端问题
        this.sno = sno
    }
    
    let p = new Person()  // 注意顺序不能乱写，不能放在studying的后面，这样会报错
    Student.prototype = p  // 把对象中该有的属性放到了Student原型上面
    
    Student.prototype.studying = function() {
        console.log(this.name + ' studying')
    }
    let stu = new Student('coderwhy',19,['JavaScript', 'CSS', 'HTML'], 110)
    console.log(stu.name)
    console.log(stu.sno)
    stu.eating()
    stu.studying()
    
    // 原型链实现继承的弊端：
    // 1.第一个弊端：打印stu对象，继承的属性是看不到的（原型上的属性是看不到的，只看得到对象本身有的属性）
    // console.log(stu)
    
    // 2.第二个弊端：创建出来两个对象
    // let stu1 = new Student('a',1,['b','c'],11)
    // let stu2 = new Student('d',2,['e','f'],22)
    
    // 情况一：
    // 获取引用，修改引用中的值，会影响其他对象
    // stu1.friends.push('kobe')
    //
    // console.log(stu1.friends)
    // console.log(stu2.friends)
    
    // 情况二：
    // 直接修改对象上的属性，是给本对象添加一个新属性，不会影响其他对象
    // stu1.name = 'kobe'
    // console.log(stu2.name)
    
    // 3.第三个弊端：在前面实现类的过程中都没有传递参数
    
    
    // 强调：借用构造函数也有弊端：
    // 1.第一个弊端：Person函数至少被调用两次
    // 2.第二个弊端：stu的原型对象上会多出一些属性，但是这些属性是没有存在的必要
    ```

* 父类原型赋值给子类:

  * ```javascript
    Student.prototype = Person.prototype
    ```

  * (不正确,不要这样写,改变子类的原型会影响父类的原型)直接将父类的原型赋值给子类,作为子类的原型

* 原型式继承函数:

  * ```javascript
    let obj = {
      name:'kobe',
      age:18,
      play(){
        console.log('play basketball!')
      }
    }
    
    // console.log(obj);
    
    // 原型式继承函数
    function createObject(o){
      let newObj = {}
      Object.setPrototypeOf(newObj, o)
      return newObj
    }
    
    let bar = createObject(obj)
    console.log(bar.__proto__);
    
    // 最初实现原型式继承函数代码
    function createObject2(o){
      function Fo(){ }
      Fo.prototype = o
      let newObj = new Fo()
      return newObj
    }
    
    let info = createObject2(obj)
    console.log(info.__proto__);
    
    // ES实现的Object.create()函数直接实现原型式继承
    let foo = Object.create(obj)
    console.log(foo.__proto__);
    ```

* 寄生式继承:

  * ```javascript
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
    ```

* 寄生组合式函数:

  * 回顾一下之前提出的比较理想的组合继承:

    * 组合继承是比较理想的继承方式,但是存在两个问题
    * 问题一:

    ```javascript
    function createObject(o) {
      function Fn() {}
      Fn.prototype = o
      return new  Fn()
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
    ```

* 对象的方法补充:

  * hasOwnProperty
    * 对象是否有某一个属于自己的属性(不是在原型上的属性)
  * in/for in 操作符
    * 判断某个属性是否在某个对象或者对象的原型上
  * instanceof
    * 用于检测**构造函数的prototype**,是否出现在**某个实例对象的原型链**上
  * isPrototypeOf
    * 用于检测**某个对象**,是否出现在**某个实例对象的原型链**上

* 对象-函数-原型的关系:

  * ```javascript
    let obj = {
      name:'itchao',
      age:18
    }
    
    // 对象里面有一个__prototype__对象:隐式原型对象
    console.log(obj.__proto__)
    
    // Foo是一个函数,有一个原型对象:prototype
    // Foo.prototype来自哪里?
    // 答案:创建了一个函数,Foo.prototype = {constructor: Foo}
    
    // Foo是一个对象,那么它会有一个隐式原型对象:Foo__proto__
    // Foo.__proto__来自哪里?
    // 答案:new Function Foo.__proto__ = Function.prototype
    // Function.prototype = {constructor:Function}
    
    function Foo() {
    
    }
    
    console.log(Foo.__proto__)  // {}
    console.log(Foo.prototype)  // {}
    console.log(Foo.__proto__ === Foo.prototype)  // false
    console.log(Foo.prototype.constructor)  // [Function: Foo]
    console.log(Foo.__proto__.constructor)  // [Function: Function]
    console.log(Function.__proto__ === Function.prototype)  // true
    ```

* 

