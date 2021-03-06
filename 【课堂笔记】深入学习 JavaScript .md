# 深入学习  JavaScript

#### 浏览器的工作原理和V8引擎

* V8引擎
  1. 代码被解析,v8引擎内部会创建一个对象(GlobalObject -> go)
  2. 运行代码
     * v8为了执行代码,v8引擎内部会有一个执行上下文栈(Execution Context Stack,ECStack)(函数调用栈)
     * 执行全局代码时,为了全局代码能够正常的执行,需要创建全局执行上下文(Global Execution Context)(全局代码需要被执行时才会创建 )

---

#### 内存管理和内存泄漏

###### 查找变量

* 查找变量规则：

  * 真实查找路径是沿着**作用域链依次向上查找**

  * 例子：

    * ```javascript
      var name = 'itchao'
      
      foo()
      function foo(){
          console.log(m)
          var m = 20
          var name = 'foo'
          console.log(name)  //  输出结果：foo
      }
      console.log(name)  // 输出结果：itchao
      ```
  
* 函数嵌套：

  * ```javascript
    var name = 'kobe'
    
    player()
    function player(){
        console.log(age)  // 输出结果：undefined
        var age = 18
        function man(){
            console.log(name)  // 输出结果：kobe
        }
        return man()
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

###### 作用域提升面试题：

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

###### 内存管理

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

###### 垃圾回收、内存泄露

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

#### 作用域、作用域提升、执行上下文

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
    
    // 函数作为参数的使用案例
    function calc(num1, num2, calcFn){
        console.log(calcFn(num1, num2))
    }
    
    function add(num1, num2){
        return num1 + num2
    }
    
    calc(80, 20, add)
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
    var fn = foo()  // 用fn变量来接受返回出来的 bar 函数
    fn()  // 调用fn() 函数，实则执行 bar() 函数
    
    // 使用场景案例(通过传入的参数，定制函数)
    function makeAdder(count){
        function add(num){
            return count + num
        }
        return add
    }
    var add30 = makeAdder(30)
    console.log(add30(70))
    // 高阶函数：以函数为参数 或 返回值为函数的一个函数为高阶函数
    // 上面的案例中makeAdder、foo是把另外一个函数作为返回值返回，所以makeAdder、foo是高阶函数
    ```
  
* 数组中的函数使用：

  * ```javascript
    // 函数和方法的区别：
    // 函数function：独立的function，则为一个函数
    // 例如：(该函数是定义在全局中的，不属于任何东西)
    // function foo(){ }
    // 方法method：当一个函数属于某个对象时，称该函数是这个对象的方法
    // const obj = {
    //     foo: function(){ }
    // }
    // obj.foo()  // 调用obj对象内的foo方法
    
    
    const nums = [1, 20, 50, 100, 300]  // 下面的案例都是用的这个数组
    // 以下是几个关于数组的高级函数
    // 高级函数一：filter()，过滤函数，拿到自己需要的数据，过滤掉不需要的多余数据
    const newNums = nums.filter(item => item > 30)  // 生成一个新的数组newNums，把原数组nums中大于30的数据放到新数组newNums中
    console.log(newNums)
    
    // 高级函数二：map()，（映射）遍历数组中所有元素，
    // 每次执行匿名函数都支持三个参数，参数分别为item（当前每一项），index（索引值），arr（原数组）
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
    const findFriends = friends.find(item => item.age  === 20)
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
    * 闭包和函数最大的区别在于,当捕捉闭包时,它的**自由变量**会在捕捉时被确定,即使脱离捕捉上下文,也能照常运行
  * 闭包的概念出现于60年代,最早实现闭包的程序是 Scheme，可以理解为什么 JavaScript 中有闭包：
    * 因为JavaScript中有大量的设计来源于 Scheme
  * MDN对 JavaScript 闭包的解释:
    * 一个函数和对其周围状态(词法环境)的引用捆绑在一起(或者说函数被引用包围)，这样的组合就是 **闭包(closure)**
    * 闭包：可以在内层函数中访问到其外层函数作用域
    * 在 JavaScript 中，每当创建一个函数吗，闭包就会在函数创建的同时被创建出来
  * **闭包 **由两部分组成: **函数 + 可以访问的自由变量**(严格意义上的闭包)
  * coderwhy 老师的理解和总结:
    * 一个普通函数 function，如果它可以访问外层作用域的自由变量，那么这个函数就是一个闭包
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
    // AO 不适用的属性
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

###### 3.1 为什么需要this

* 在常见的编程语言中，几乎都有this这个关键字（Objective-C中使用的是self），但是JavaScript中this和常见的面向对象语言中的this不太一样：
  * 常见面向对象的编程语言中，比如：Java、C++、Swift等等一系列语言中，this通常只会出现在类的方法中
  * 也就是你需要有一个类，类中的方法（特别是实例方法）中，this代表的就是当前调用的对象
  * 但是JavaScript中的this更加灵活，无论是它出现的位置还是它代表的含义

###### 3.2 this的作用

```javascript
// 从某些角度来说，开发中如果没有this，很多的问题我们也是有解决方案
// 但是没有this，会让我们编写代码变得非常不方便


let obj = {
    name:'itchao',
    age:18,
    eating() {
        console.log(`年龄${this.age}的${this.name}在吃东西`)  // 这里的this指向的是obj对象
    }
}

// console.log(obj);  // 打印obj对象

obj.eating()
```

###### 3.3 this全局作用域的指向

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

###### 3.4 this到底指向什么

* 函数中的this指向启发:

1. 函数在调用时,JavaScript会默认给this绑定一个值

2. this绑定和定义位置无关

3. this绑定和调用方式以及调用位置有关

   **this的绑定规则:**

   * 绑定一：默认绑定
   * 绑定二：隐式绑定
   * 绑定三：显示绑定
   * 绑定四：new绑定


###### 3.5 绑定规则一：默认绑定

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

###### 3.6 绑定规则二：隐式绑定

* 通过某个对象进行调用：
  * 也就是它的调用位置中，是通过某个对象发起的函数调用
  
  ```javascript
  // 隐式绑定：object.fn()
  // object对象会被js引擎绑定到fn函数中的this里面
  
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
  //     }
  // }
  //
  // obj1.eating()   // obj1对象调用eating函数，因此this指向了发起调用的obj1对象
  
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

###### 3.7 绑定规则三：显示绑定

* 隐式绑定有一个前提条件：

  * 必须在调用的对象内部有一个对函数的引用（比如一个属性）
  * 如果没有这样的引用，在进行调用时，会报找不到该函数的错误
  * 正是通过这个引用，间接的将this绑定到了这个对象上

* 如果不希望在**对象内部**包含这个函数的引用，同时又希望在这个对象上进行强制调用，该怎么做呢？

  * JavaScript所有的函数都可以使用call和apply方法（这个和prototype有关）
    * call和apply方法，第一个参数相同，后面的参数，apply为数组，call为参数列表
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
  //     foo
  // }
  // obj.foo()   // 对象obj调用了函数foo，因此this指向发起调用的obj对象
  
  
  // 需求：将this的指向改变为指向obj1，但是不在obj1内添加属性
  // 解决方法：使用call和apply函数，手动指定函数被调用时this的指向
  // 总结：call和apply函数可以手动改变this指向
  // let obj1 = {
  //     name:'kobe',
  //     age:18
  // }
  // foo.call()  // 只调用函数，未改变 this 指向，此时this指向全局作用域的window
  // foo.call(obj1)  // 调用函数且改变 this 指向，此时this指向obj1对象
  // foo.apply()  // 只调用函数，未改变 this 指向，此时this指向全局作用域的window
  // foo.apply(obj1)   // 调用函数且改变 this 指向，此时this指向obj1对象
  
  
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
  // 解决方案一(方案不佳)：call和apply函数都可改变 this 指向，但要改变多次就需要调用多次call或者apply函数，不方便
  // foo.call('aaa')
  // foo.call('aaa')
  
  // 需求：改变this的指向为aaa
  // 解决方案二：使用bind函数改变this指向为aaa，
  // bind函数优点：bind会生成一个新的函数，后面使用的时候调用新函数即可，可以手动改变this指向且不需要调用多次bind函数
  // 默认绑定和显示绑定bind冲突：优先级(显示绑定)
  let newFoo = foo.bind('aaa')  // foo对象调用bind函数，改变this指向为aaa
  
  newFoo()
  newFoo()
  ```

###### 3.8 绑定规则四：new绑定

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
  
  // new关键字：创建新对象然后赋值给this，最后返回this，也就是返回这个新对象
  let p1 = new Person('itchao', 22)
  
  console.log(p1)
  console.log(p1.name, p2.age);
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
// setTimeout函数内输出的this是指向window，原因:setTimeout函数内部调用function(){}时采用独立调用
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

1.  默认绑定优先级最低：

   * 默认绑定优先级最低，当存在其他绑定时，会通过其他绑定方式绑定 this

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
     //     bar
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
     // new 绑定高于隐式绑定
     function Person(name, age) {
       this.name = name;
       this.age = age
     }
     
     const obj = {
       name: 'itchao',
       Person
     };
     
     const p1 = new obj.Person('p1', 22)
     console.log(p1);  // Person { name: 'p1', age: 22 }
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

   * **new绑定 > 显示绑定(call / apply / bind) > 隐式绑定( obj.foo( ) ) > 默认绑定(独立函数调用)**

##### 5. 特殊绑定

###### 5.1 忽略显示绑定：null/undefined

```javascript
function foo() {
    console.log(this)
}

foo.call('aaa')  // 输出结果：'aaa'
foo.call({})     // 输出结果： {}

// 特殊情况：
// call/apply/bind：当传入null/undefined时，自动将this绑定成全局对象window
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

;(obj2.bar = obj1.foo)()  // 输出结果：window，原因：相当于独立函数调用
// 注意：上面这行代码开头必须用;开头
// 否则编辑器无法正确解析，不知道代码结束没有，会把该行代码与上面的代码看成是一个整体，导致代码报错
```

###### 5.3 箭头函数 arrow function

* 箭头函数：

  * 不绑定 this、arguments 属性
  * 不能作为构造函数使用（不能和new一起来使用，会抛出错误）

* 箭头函数编写格式：

  * ( )：函数的参数
  * { }：函数的执行体

* 箭头函数的使用解析：

  ```javascript
  // 一. 编写箭头函数
  
  // 箭头函数完整写法：
  // let foo = (item) => {
  //   console.log(item)
  // }
  
  // 普通函数写法：
  // let bar = function (index) {
  //   console.log(index)
  // }
  
  
  // 高阶函数在使用时，也可以传入箭头函数
  let nums = [10, 20, 30, 40, 45]  // 后面使用的数组都是该数组
  nums.forEach((item, index, arr) => {
    console.log(item * 2, index, arr)
    // 输出结果：
    // 40 1 [ 10, 20, 30, 40, 50 ]
    // 60 2 [ 10, 20, 30, 40, 50 ]
    // 80 3 [ 10, 20, 30, 40, 50 ]
    // 90 4 [ 10, 20, 30, 40, 50 ]
  })
  
  // 箭头函数常见简写方式：
  
  // 简写一：如果参数只有一个时，那么()可以省略
  // let players = ['kobe', 'james', 'curry', 'coderwhy', 'itchao']
  // players.forEach( item => {  // 参数为一个时，可以省略()
  //   console.log(item)  // 输出结果：kobe james curry coderwhy itchao
  // })
  
  // 简写二：如果函数执行体只有一行代码，那么{}也可以省略
  // 强调：并且它会默认将这行代码的执行结果作为返回值
  // nums.forEach( item => console.log(item * 2) )  // 输出结果:20, 40, 60, 80, 100
  // let newNums = nums.filter(item => item % 20 === 0)
  // console.log(newNums)  // 输出结果：[20, 40]
  
  // 结合filter/map/reduce函数将nums进行一系列操作，先对nums进行求余20操作，再进行乘以20操作，最后进行求和操作
  // let sum = nums.filter(item => item % 20 ===0 ).map(item => item * 20).reduce((pre, item) => pre + item, 0)
  // console.log(sum)  // 输出结果：1200
  
  // 简写三(注意)：如果一个箭头函数，只有一行代码，并且返回一个对象，箭头函数的简写
  // 需求代码格式：
  // let bar = () => {
  //   return {name:'kobe', age:18}
  // }
  // 对应的箭头函数简写格式：
  // let bar = () => ({name:'kobe', age:18})  
  // 注意：箭头函数执行体只有一行代码对象时，简写需要将函数执行体放入()中，当成一个整体
  ```

###### 5.4 箭头函数—this获取

* 箭头函数不绑定this，而是根据外层作用域决定 this 指向

  ```javascript
  // 1. 测试箭头函数中 this 指向,箭头函数不绑定 this
  
  // let foo = () => {
  //   console.log(this)  // 箭头函数的this由外层作用域决定，箭头函数不绑定 this
  // }
  //
  // foo()  // 输出结果：window，独立函数调用
  // foo.call('aaa')  // 输出结果：window,显式绑定
  //
  // let obj = {
  // foo
  // }
  // obj.foo()
  
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
        console.log(this)  // this指向obj对象，原因：箭头函数中 this 根据外层作用域决定
      }, 2000)
    },
  }
  obj.getData()  // 隐式绑定，让 this 指向obj对象
  ```

##### 6. this面试题

###### 6.1 面试题一

```javascript
title = 'window';
let person = {
  title: 'person',
  foo() {
    console.log(this.title);
  }
}

function bar() {
  let a = person.foo;
  a();  // 输出结果：window，原因：独立函数调用，this执行是全局作用域的window，this.title = window.title
  person.foo();  // 输出结果：person，原因：隐式绑定
  (person.foo)();  // 输出结果：person，原因：隐式绑定，加括号和不加括号没区别，加了括号依然是直接取到person.foo
  (b = person.foo)();  // 输出结果：window
  // 原因：赋值表达式(独立函数调用):将person.foo的结果作为整个(b = person.foo)的结果再打印，间接函数引用
}

bar()
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

let person2 = {
  name:'person2'
}

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

##### 7. call-apply-bind

###### 7.1 call函数实现

```javascript
// 给所有函数添加一个hycall方法(实现call方法)

Function.prototype.hycall = function (thisArg, ...args) {
  // 在这里可以去执行调用的函数(foo)
  // 问题:得可以去获取哪一个函数执行了hycall
  // 1. 获取需要被执行的函数,this
  // this()
  // 2. 让thisArg转成对象类型(防止它传入非对象类型)
  thisArg = thisArg ?  Object(thisArg) : window
  // 3. 调用需要被执行的函数
  thisArg.this = this
   let result = thisArg.this(...args)
  delete thisArg

  // 4. 将最后的结果返回出去
  return result
}

function foo() {
  console.log('foo', this)
}

function sum(num1, num2) {
  return num1 + num2
}

// 系统的函数call方法
foo.call() // 输出结果:window
let result = sum.call({}, 20, 30)
console.log('系统调用结果:', result)


// 自己实现的hycall方法
// 默认进行this隐式绑定
// foo.hycall(123)
let result1 = sum.hycall('abc',1231, 612)
console.log('hycall调用结果:', result1)
```

###### 7.2 ES6剩余参数

```javascript
// ES6剩余参数

function sum(num1, num2, num3, ...args) {
  console.log(num1, num2 , num3)
  console.log(args)  // args是一个数组类型
}

sum(1, 2, 3, 4, 5 ,6 , 7, 8, 9)

function sum1(...args) {
  console.log(args)
}

sum1(1)
sum1(1, 3)
sum1(1, 3, 4, 6)

// 展开运算符(挨个取出数组内的元素)
let names = ['kobe', 'coderwhy', 'itchao']
let newNames = [...names]

function foo(name1, name2, name3) {
  console.log(name1 + ' ' + name2 + ' ' +name3)
}

foo(...names)
```

###### 7.3 apply函数实现

```javascript
// 给所有函数添加一个hyapply方法(实现apply方法)

Function.prototype.hyapply= function (thisArg, argArray) {
  // 1. 获取到要执行函数
  let fn = this
  // 2. 处理绑定的thisArg
  thisArg = thisArg ? Object(thisArg) : window
  // 3. 调用要执行函数
  thisArg.fn = fn
  var result
  // if(!argArray){  // 没有传参数
  //   result = thisArg.fn()
  // }else {  // 传递了参数
  //   result = thisArg.fn(...argArray)
  // }
  // argArray = argArray ? argArray : []
  argArray = argArray || []  // 判断数组是否为空,如果为空则传入空数组
  result = thisArg.fn(...argArray)
  delete  thisArg.fn
  // 4. 返回结果
  return result
}

function sum(num1, num2) {
  console.log('sum函数被调用:',this, num1, num2)
  return num1 + num2
}

function foo(num3) {
  console.log('数字3:', this, num3)
  return num3
}

function bar() {
  console.log('函数bar', this)
}

// 系统调用实现apply方法
// let sum1 = sum.apply('aaa',[10, 26])  // apply调用时参数为数组形式
// console.log(sum1)

// 自己实现hyapply方法
// let result = sum.hyapply('bbb',[100, 200])
// console.log(result)
//
// let result1 = foo.hyapply('ccc', [80])
// console.log(result1)

let result2 = bar.hyapply('ddd',[])
console.log('空数组:', result2)
```

###### 7.4 bind函数实现

```javascript
// 给所有函数添加一个hybind方法(实现bind方法)

Function.prototype.hybind = function(thisArg, ...argArray) {
  // console.log('在原型上添加hybind方法')

  // 1. 获取需要绑定的函数
  let fn = this
  // 2. 绑定this
  thisArg = (thisArg !== null && thisArg !== undefined) ? Object(thisArg) : window
  function proxyFn(...args) {
    // 3. 将函数放到thisArg中调用
    thisArg.fn = fn
    // 特殊:对两个传入参数进行合并
    let finalArgs = [...argArray, ...args]
    let result =  thisArg.fn(...finalArgs)
    delete thisArg.fn
    return result
  }
  // 4. 返回结果
  return proxyFn
}


function foo() {
  console.log('foo函数:', this)
  return 180
}

function sum(num1, num2, num3, num4) {
  console.log(num1, num2, num3, num4)
}

// 系统调用bind方法
// let bar = foo.bind('aaa')
// bar()
//
// bind时传参
// let sum1 = sum.bind('bbb', 1, 20, 40 ,60)
// sum1()
// 调用时传参
// let sum2 = sum.bind('ccc')
// sum2(10, 30, 50, 70)
// 依次传参
// let sum3 = sum.bind('ddd', 10, 50)
// sum3(90, 100)

// 使用自己定义的hybind方法
// let bar = foo.hybind('aaa')
// let result = bar()
// console.log(result)

let newSum = sum.hybind('bbb', 10 , 200)
let result = newSum(20, 500)
```

##### 8. arguments

###### 8.1 认识arguments

* arguments是对应于传递给函数的参数的类数组(array-like)对象

  ```javascript
  function foo(num1, num2, num3) {
    // [Arguments] {'0':10, '1':80, '2':30}
    console.log(arguments)
  }
  
  foo(10, 80, 30)
  ```

* array-like意味着它不是一个数组类型,而是一个对象类型:

  * 但是它却拥有数组的一些特性,比如length,比如可以通过index索引来访问

  * 但是它缺没有数组的一些方法,比如forEach、map等

    ```javascript
    console.log(arguments.length)
    console.log(arguments[0])
    console.log(arguments[1])
    ```

###### 8.2 arguments基本使用

```javascript
function foo(num1, num2, num3) {
  // 类数组对象中（长得像数组，本质是对象）:arguments
  console.log(num1, num2, num3)  // 输出结果：1 2 3
  console.log(arguments)  // 输出结果：[Arguments] { '0': 1, '1': 2, '2': 3, '3': 50, '4': 80 }

  // arguments三个常见操作
  // 1. 获取参数长度
  console.log(arguments.length)  // 输出结果：5
  // 2. 根据索引值获取某一个参数
  console.log(arguments[0])  // 输出结果：1
  // 3. callee获取当前arguments所在函数
  console.log(arguments.callee)
}
foo(1, 2, 3, 50, 80 )
```

###### 8.3 arguments转array

```javascript
function foo(num1, num2) {
  console.log(arguments)
  // 自己遍历
  // let newArray = []
  // for (let i = 0; i< arguments.length; i++) {
  //   newArray.push(arguments[i] * 10)
  // }
  // console.log(newArray)
  // 2. arguments转array类型
  // 2.1 自己遍历arguments中的所有元素

  // 2.2 通过Array.prototype.slice方法将arguments转成array类型
  let newArray2 = Array.prototype.slice.call(arguments)
  console.log(newArray2)

  let newArray3 = [].slice.call(arguments)
  console.log(newArray3)

  // 2.3 ES6语法
  let newArray4 = Array.from(arguments)
  console.log(newArray4)

  // 2.4 展开运算符
  let newArray5 = [...arguments]
  console.log(newArray5)
}

foo(1, 2, 23, 50 , 70)


// 额外补充知识点：Array中slice的实现
// Array.prototype.hyslice = function (start, end) {
//   let arr = this
//   start = start || 0
//   end = end || arr.length
//   let newArray = []
//   for(let i = start; i< end; i++) {
//     newArray.push(arr[i])
//   }
//   return newArray
// }
//
// let newArray = Array.prototype.hyslice.call(['aaa', 'bbbb', 'ccc'],1, 2)
// console.log(newArray)

// let names = ['kobe', 'james', 'curry', 'coderwhy', 'itchao']
// names.slice
```

###### 8.4 箭头函数中没有arguments

```javascript
// 箭头函数中没有arguments，在箭头函数中使用arguments会往上层作用域中去查找对应的arguments
// 浏览器中没有arguments
// node中有arguments(node中一个js文件会被当成一个模块，模块会被当成一个函数，该函数会被执行)

// 案例一：
// let foo = () => {
//   console.log(arguments)
// }
//
// foo()

// 案例二：
// 箭头函数没有arguments，在箭头函数中查找arguments会往上层作用域进行查找
// function foo1() {
//   let bar = () => {
//     console.log(arguments)
//   }
//   return bar
// }
// let fn = foo1(1, 2, 3)
// fn()

// 案例三：
// 建议多使用ES6中的省略参数来接收多余的参数
// let foo2 = (num1, num2, ...args) => {
//   console.log(num1, num2, args)
//   console.log(args)
// }
// foo2(1, 21, 123, 2132, 12312)
```



#### ES6 (重要)

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

```javascript
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  running() {
    console.log(this.name + 'running')
  }
}

class Student extends Person {
  constructor(name, age, son) {
    super(name, age);
    this.son = son
  }

  studying() {
    console.log(this.name + 'studying')
  }
}

let foo = new Student('kobe', 18,81)
console.log(foo)
```

##### 2. 继承内置类

```javascript
// 对系统类进行扩展
class HYArray extends Array {
  firstItem() {
    return this[0]
  }

  lastItem(){
    return this[this.length-1]
  }
}


let arr = new Array(1, 2, 3)
let hyArr = new HYArray(1, 7 ,9 ,10)

console.log(arr)

console.log(hyArr.firstItem())
console.log(hyArr.lastItem())
```

##### 3. js实现混入效果

```javascript
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
```

##### 4. JavaScript 多态

* 多态:(英语:polymorphism)指为不同数据类型的实体提供统一的接口,或使用一个单一的符号来表示多个不同的类型

  * 总结:不同的数据类型进行同一个操作,表现出不同的行为,就是多态的体现

* JavaScript代码:

  ```javascript
  // 多态:当对不同的数据类型执行同一个操作时,如果表现出来的行为(形态)不一样.就是多态的体现
  
  function foo(foo) {
    console.log(foo.getArea)
  }
  
  let obj1 = {
    name:'itchao',
    getArea() {
      return 100
    }
  }
  
  class  Person {
    getArea() {
      return 200
    }
  }
  
  let p = new Person()
  foo(obj1)
  foo(p)
  
  function sum(num1, num2) {
    return num1 + num2
  }
  
  sum(20, 30)
  sum('a', 'b')
  ```

* TypeScript代码:

  ```typescript
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
  ```

##### 5. 字面增强量

```javascript
let name = 'itchao'
let age = 18

let obj = {
  // 1. 属性简写
  name,
  // 原生属性
  age:age,

  // 2. 简写方法
  foo() {
  },
  // 原生方法
  bar:function(){
},

  // 3. 计算属性名
  [name + 123]:'coderwhy'
}

console.log(obj)

输出结果
// {
//   name: 'itchao',
//     age: 18,
//   foo: [Function: foo],
//   bar: [Function: bar],
//   itchao123: 'coderwhy'
// }

```

##### 6. 解构

* 数组结构:

  ```javascript
  let names = ['kobe', 'coderwhy', 'itchao']
  // 原生写法
  // let item1 = names[0]
  // let item2 = names[1]
  // let item3 = names[2]
  
  // 数组解构: []
  let [name1, name2, name3] = names
  console.log(name1, name2, name3)
  
  // 只解构后面元素
  let [, name4, name5] = names
  console.log(name4, name5)
  
  // 解构出一个元素,后面的元素放到一个新数组中
  let [item1, ...newNames] = names
  console.log(item1)
  console.log(newNames)
  
  // 解构的默认值
  let [x1, x2, x3, x4 = 'www'] = names
  console.log(x1, x2, x3, x4)
  ```

* 对象解构

  ```javascript
  // 对象解构
  
  let obj = {
    name:'itchao',
    age:19,
    height:1.85
  }
  
  // let {name, age, height} = obj
  // console.log(name, age, height)
  
  // 对象按照key进行查找配对解构,所以可以不按顺序解构
  
  let {age} = obj
  console.log(age)
  
  // 更改对象中的名字,取出obj的值,然后赋值给新的属性名itemName
  let {name: itemName} = obj
  console.log(itemName)
  
  // 给对象属性默认值(创建新的属性):如果对象没有值,则显示默认值
  let {address:newAddress = '成都市'}  = obj
  console.log(newAddress)
  
  // 给对象属性默认值:如果对象没有值,则显示默认值
  let {city = '北京市'} = obj
  
  console.log(obj.city)
  ```

##### 7. let/const

###### 7.1 基本使用

```javascript
// let 和 var 使用方法区别不大
var foo = 'itchao'

let bar = 'kobe'

// const 定义常量

const name = 'coderwhy'
// name = 123  // const定义的变量,无法再次赋值

// 注意事项一:const 本质上是传递的值不能修改
// 但是如果传递的是一个引用类型(内存地址)
// 那么不能修改引用类型的内存地址,但是可以直接修改引用类型的属性
const obj = {
  name:'james'
}

// obj = ''  // 不能直接给对象进行赋值
obj.name = 'curry'  // 但是可以直接给对象内的属性赋值

// 注意事项二: 通过let/const定义的变量名是不可以重复定义
// var 定义变量,可以重复命名
// let/const 定义变量,不可以重复命名
```

###### 7.2 作用域提升

```javascript
console.log(foo)
var foo = 'itchao'

// let/const 不存在变量提升,不能在没有定义前访问
console.log(bar)  // bar声明出来了,但是没办法访问
let bar = 'kobe'
// let/const定义变量,bar被创建出来了,但是没办法访问,所以不叫作用域提升(暂时性死区)
// 作用域提升:能提前访问
```

###### 7.3 和window关系

```javascript
var foo = 'foo'
console.log(window.foo)

var name = 'itchao'
console.log(window.name)

window.message = 'hello message'
console.log(message)
```

###### 7.4 ES5作用域理解

```javascript
// ES5

// 块代码
{
  // 表达式
  let foo = 'foo'
}

// 声明对象
let obj = {
  name:'itchao',
  age:18
}

// ES5没有块级作用域
// 块代码
{
  let foo = 'kobe'
}

// 在ES5中只有两个地方会形成作用域
// 1. 全局作用域
// 2. 局部作用域(函数作用域)
function  foo() {
  let height = 1.85
}
```

###### 7.5 ES6块级作用域理解

```javascript
// 代码块

// ES6的块级作用域
// 对let/const/function/class声明的类型是有效的
{
  var foo = 'itchao'
  let name = 'kobe' // let声明外界无法访问
  function bar(){}  // 函数声明外界无法访问(大部分浏览器有不同实现的[大部分浏览器为了兼容以前的代码,让function是没有块级作用域])
  class Person{ }  //  class声明外界无法访问
}

console.log(foo)
```

###### 7.6 if-switch-for块级作用域

```javascript
// {
//
// }
//
// // if语句代码是块级作用域
// if(true) {
//   var foo = 'foo'
//   let bar = 'bar'
// }
//
// // if语句代码是块级作用域
// switch (color) {
//   case 'red':
//     var age = 19
// }

// for语句代码时块级作用域
for (var i= 0; i < 10; i++) {

}
console.log(i)  // 可以访问i,因为var声明的没有块级作用域


for (let j= 0; j < 10; j++) {

}
console.log(j)  // 无法访问j,因为let声明的有块级作用域
```

###### 7.7 块级作用域应用场景

```javascript
let btns = document.getElementsByTagName('button')

for(let i = 0;i < btns.length ; i++) {
  btns[i].onclick = function() {
    console.log(`第${i}个按钮被点击`)
  }
}
```

##### 8. 模板字符串

作用：进行字符串拼接

###### 8.1 模板字符串基本使用

```javascript
// 模板字符串基本使用
const a = `1
2
3`
const b = '123'

console.log(a);
console.log(b);

 
const nameA = 'itchao'
const age = 22
const height = 1.85

function Age() {
  return age * 1.6
}

console.log(`名字 ${nameA},年龄 ${age},身高 ${height}`);
console.log(`名字 ${nameA},年龄 ${age*1.5},身高 ${height*2}`);
console.log(`名字 ${nameA},年龄 ${Age()},身高 ${height}`);
```

###### 8.2 标签模板字符串

```javascript
function foo(m, n) {
  console.log(m, n, '结束打印！');
}

foo(20, 30)

foo `Hello${111}World`
```

##### 9. 函数及对象默认值

```javascript
// 1.函数提供默认值
function foo(m = 1, n = 'aaa') {
  console.log(m, n);
}

// 调用函数时，若未传参，则可使用ES6默认参数
foo()


// 2.对象中参数默认值及默认值解构
// 前面是对象解构
// 后面是对象默认值
function Info({name,age} = {
  name: 'itchao',
  age: 22
}) {
  console.log(name, age);
}

Info({name: 'x',age: 2})

// 另外写法
function bar({name = 'coderwhy',age = 18} = {}) {
  console.log(name, age);
}

bar()


// 3.有默认值形参最好放最后
function a(x, y, z = 50) {
  console.log(x, y, z);
}

a(10, 20)

// 4. 有默认值函数，从默认值开始到最后的参数都算到length内
function b(z, x, c = 2) {
  console.log(z, x, c);
}
console.log(b.length);
```

##### 10. 函数剩余参数

* 剩余参数只能放最后一个
* 剩余参数本质就是数组，可使用数组所有方法

```javascript
function A(a, ...b) {
  console.log(a, b);
}

A(1, 2, 3, 4, 5)
// 1 [2, 3, 4, 5]
```

##### 11. 展开语法

```javascript
const names = ['itchao', 'coderwhy', 'kobe']
const name = 'itchao'
const info = {
  name: 'itchao',
  age: 22,
  height: 1.85

}

// 剩余参数
function foo(...args) {
  console.log(args);
}

// 1. 函数调用时
foo(...names)
foo(...name)

// 2. 构造数组时
const newArray = [...names, ...name]
console.log(newArray);

// 3. 构建对象字面量时 ES2018(ES9)
const InfoA = {...info, ...names, address: '成都市'}
console.log(InfoA);

// 补充：展开运算符进行的是浅拷贝
```

##### 12. 数值表示方式

```javascript
const num1 = 100 // 十进制
const num2 = 0b100 // 二进制
const num3 = 0o100 // 八进制
const num4 = 0x100 // 十六进制

console.log(num1, num2, num3, num4);

// 数值特别大(ES2021, ES12)
// 方便阅读
const num = 100_000_000_000_000_000_000
console.log(num);
```

##### 13. Symbol

* 概念：ES6新增的一个基本数据类型，翻译为符号
* 作用：避免出现相同属性名，造成属性名冲突

###### 13.1 Symbol基本使用

```javascript
// 1. Symbol 基本使用
const s1 = Symbol('a')
const s2 = Symbol('b')

console.log(s1 === s2);
// ES2019(ES10)中，Symbol增加了描述（description）  
console.log(s1.description);

// 2. Symbol值作为key
const a1 = Symbol('a1')
const a2 = Symbol('a2')
const a3 = Symbol('a3')
const a4 = Symbol('a4')

// 2.1 定义对象字面量
const objA = {
  [a1]: 'a1',
  [a2]: 'a2'
}

console.log(objA);

// 2.2 新增属性
objA[a3] = 'a3'
console.log(objA);

// 2.3 Object.defineProperty 方式
Object.defineProperty(objA, a4, {
  enumerable: true, // 可枚举
  configurable: true, // 可配置
  writable: true, // 可重写
  value: 'a4'
})
console.log(objA);

// 获取Symbol语法
console.log(objA[a1]);
console.log(objA[a2]);
console.log(objA[a3]);
console.log(objA[a4]);

// 2.4 使用Symbol作为对象key时,遍历/Object.keys等获取不到Symbol值
console.log(Object.keys(objA));
// 需要使用Object.getOwnPropertySymbols,获取Symbol值
console.log(Object.getOwnPropertySymbols(objA));
// Symbol遍历方式
const sKeys = Object.getOwnPropertySymbols(objA)
for (const sKey of sKeys) {
  console.log(objA[sKey]);
}

// 2.5 创建相同Symbol使用Symbol.for(key)
// 获取Symbol的key，Symbol.keyFor(Symbol值)
const b1 = Symbol.for('b')
const b2 = Symbol.for('b')
console.log(b1 === b2);  // true

const key = Symbol.keyFor(b1)
console.log(key);  // b
const b3 = Symbol.for(key)
console.log(b3); // Symbol(b)
console.log(b1 === b3); // true
```

##### 14. Set

* ES6之前,数据结构主要有两种:数组、对象
  * ES6新增了另外两种数据解构:Set、Map,以及它们的另外形式WeakSet、WeakMap
* Set是新增的数据结构,可以用来保存数据,类似于数组,但是和数组的区别是**不允许重复**

```javascript
// 10 20 30 40 50
// 1. 创建set结构
let set = new Set()
set.add(10)
set.add(40)
set.add(20)
set.add(30)
set.add(50)
set.add(10)
// 2. 添加对象时特别注意
set.add({})  // 对象保存的内存地址不一样
set.add({})

const obj = {name:'itchao'}
set.add(obj)  // 保存的是同一个对象的内存地址
set.add(obj)

// console.log(set)

// 3. 数组去重
const arr = [10, 12, 22, 33, 55, 12, 10 ,60]
// const newArr = []
// for(const item in arr) {
//   if(newArr.indexOf(item) !== -1) {
//     newArr.push(item)
//   }
// }

const arrSet = new Set(arr)
// const newArr = Array.from(arrSet)
const newArr = [...set]
console.log(newArr)

// 4. size属性
console.log(arrSet.size)

// 5. set方法
// add
arrSet.add(100)
console.log(arrSet)
// delete
arrSet.delete(12)
console.log(arrSet)
// has
console.log(arrSet.has(100))
// clear
// arrSet.clear()
console.log(arrSet)

// 6. 对Set进行遍历
arrSet.forEach(item => {
  console.log(item)
})

for(const item of arrSet) {
  console.log(item)
}
```

##### 15. WeakSet

概念：内部元素不能重复的数据结构

WeakSet和Set区别：

* 区别一：WeakSet只存放对象类型，不存放基本数据类型
* 区别二：WeakSet对元素的引用的弱引用，如果没有其他引用对某个对象进行引用，那么GC可以对该对象进行回收

```javascript
const weakSet = new WeakSet()

// 区别一：只能存放对象类型
// weakSet.add(5)
// console.log(weakSet);

// 区别二：对与对象来说是一个弱引用
let obj = {
  name: 'itchao'
}

weakSet.add(obj)
console.log(weakSet);
```

##### 16. Map

概念：用于存储映射关系，以键值对形式存在

对象与Map区别：

* 对象只能用字符串（ES6新增Symbol）作为属性名（key）
* Map可以用对象作为属性名

```javascript
// 1. 对象中不能用对象作为属性名key
// const info = { name: 'itchao' }

// const obj = {
//   [info]: 'a'
// }

// console.log(obj);

// 2. Map 可以用对象作为属性名key
// 通过构造方法才创建 Map
const obj1 = {
  name: 'coderwhy'
}
const obj2 = {
  name: 'kobe'
}
const map = new Map();
map.set(obj1, 'a')
map.set(obj2, 'b')
map.set(1, 22)
console.log(map);

const a1 = {
  name: 'a1'
}
const b1 = {
  name: 'b1'
}
const c1 = {
  name: 'c1'
}
const map2 = new Map([
  [a1, 'a'],
  [b1, 'b'],
  [c1, 'c'],
  [2, 'd']
]);
console.log(map2);

// 3. 常见属性和方法
// 属性
console.log(map.size);
console.log(map2.size);

// 方法
// set(key, value) 新增属性
map2.set('chao', 'itchao')
console.log(map2);

// get(key) 获取属性
const getMap2 = map2.get('chao')
console.log(getMap2);

// has(key) 判断属性是否存在
const hasMap2 = map2.has('chao')
console.log(hasMap2);

// delete(key) 删除属性
map2.delete('chao')
console.log(map2);

// clear() 清除所有属性
// map2.clear()
// console.log(map2);

// 4. 遍历Map
map2.forEach((item, key) => console.log(item, key));

for (const item of map2) {
  console.log(item);
}

// [key, value] 数组解构
for (const [key, value] of map2) {
  console.log(key, value);
}
```

##### 17. WeakMap

概念：用于存储映射关系，以键值对形式存在

WeakMap与Map区别：

* 区别一：WeakMap的Key只能使用对象，不接受其他类型作为key
* 区别二：区别二：WeakSet对元素的引用的弱引用，如果没有其他引用对某个对象进行引用，那么GC可以对该对象进行回收

注意：WeakMap不能进行遍历

* 因为没有forEach方法，也不支持通过for of方式进行遍历

**WeakMap 基本使用：**

```javascript
// 1. WeakMap和Map的区别一：WeakMap的key必须是对象类型
const weakMap1 = new WeakMap();
// weakMap1.set(1, 'w')
console.log(weakMap1);
// WeakMap { <items unknown> } 因为WeakMap无法遍历

// 2. 区别二： WeakMap对元素的引用是弱引用
const obj = {
  name: 'obj'
}

const map = new Map()
map.set(obj, 'a')
console.log(map);

const weakMap = new WeakMap()
weakMap.set(obj, 'b')
console.log(weakMap);

// 3. WeakMap常见方法
// get方法，获取值
console.log(weakMap.get(obj));

// has方法，判断值是否存在
console.log(weakMap.has(obj));

// delete方法，删除值
weakMap.delete(obj);
console.log(weakMap);
```

**WeakMap 使用场景 (Vue3 响应式原理)：**

```javascript
// WeakMap应用场景（Vue3响应式原理）
const obj1 = {
  name: 'itchao',
  age: 22
}

function obj1Name1() {
  console.log('obj1Name1');
}

function obj1Name2() {
  console.log('obj1Name2');
}

function obj1Age1() {
  console.log('obj1Age1');
}

function obj1Age2() {
  console.log('obj1Age2');
}

const obj2 = {
  height: 1.85,
  address: '四川成都双流华阳北辰南湖香麓南一门'
}

function obj2Name1() {
  console.log('obj2Name1');
}

function obj2Name2() {
  console.log('obj2Name2');
}


// .0 创建WeakMap
const weakMap = new WeakMap();
// .1 收集依赖结构
// ·1-1 对obj1收集的数据结构
const obj1Map = new Map();
obj1Map.set('name', [obj1Name1, obj1Name2])
obj1Map.set('age', [obj1Age1, obj1Age2])
weakMap.set(obj1, obj1Map);
// .1-2 对obj2收集的数据结构
const obj2Map = new Map();
obj2Map.set('name', [obj2Name1, obj2Name2]);
weakMap.set(obj2, obj2Map);

// .2 如果obj1.name发生改变
// Proxy/Object.defineProperty
obj1.name = 'james'
const targetMap = weakMap.get(obj1);
const fns = targetMap.get('name')
fns.forEach(item => item())
```

##### 18. Proxy

###### 18.1 Proxy 基本使用

* 作用：监听对象属性
* 例子：`const p = new Proxy(监听对象， 捕获器)`

```javascript
// Proxy 实现监听对象
const info = {
  sex: 'male',
  age: 22,
  height: 1.85
}

const p = new Proxy(info, {
  // 获取值时的捕获器
  get(target, key) {
    console.log(key, '执行get操作');
    return target[key]
  },
  // 设置值时的捕获器
  set(target, key, newValue) {
    console.log('执行set操作');
    target[key] = newValue
  }
})

console.log(p.sex);
console.log(p.age);
console.log(p.height);

p.age = 18
console.log(p.age);
```

###### 18.2 Proxy 捕获器

作用：侦听具体操作

1.  get 函数

* target：目标对象（侦听对象）
* property：被获取的属性 key
* receiver：调用的代理对象

2. set 函数

* target：目标对象（侦听对象）
* property：被获取的属性 key
* newValue：新属性值
* receiver：调用的代理对象

3. has 函数

* 监听 in 捕获器
* target：目标对象（侦听对象）
* property：被获取的属性 key

4. deleteProperty 函数

* 监听 delete 捕获器
* target：目标对象（侦听对象）
* property：被获取的属性 key

5.  apply 函数

* 监听 **函数** 捕获器
* target：目标函数
* thisArg：指向函数
* argArray：参数

6.  construct 函数

* 监听 new 捕获器
* target：目标对象
* argArray：参数
* newTarget：新对象

**共13个捕获器，其余捕获器不常用，需要时自行查找即可**

##### 19. Reflect

###### 19.1 Reflect 基本使用

* 概念：Reflect是ES6新增的API，是**一个对象**，字面意思**反射**
* 作用：操作 JavaScript 对象的方法，有点像 Object 中操作对象的方法
* 目的：替代 Object 中本来不该属于 Object 的一些方法
* 使用场景：Reflect 经常与 Proxy 一起使用

###### 19.2 Reflect 方法

* Reflect 有13个方法，和Proxy一一对应

###### 19.3 Receiver

* 作用：改变对象中 get 和 set 的 this 指向，让 this 直接指向代理对象，不直接操作原始对象

```javascript
const obj = {
  _name: 'itchao',
  get name() {
    return this._name
  },
  set name(newValue) {
    this._name = newValue
  }
}

const pObj = new Proxy(obj, {
  get(target, key, receiver) {
    console.log('-get-', key);
    return Reflect.get(target, key, receiver)
  },
  set(target, key, newValue, receiver) {
    console.log('-set-', key);
    Reflect.set(target, key, newValue, receiver)
  }
})

pObj.name = 'coderwhy'
console.log(pObj.name);
```

###### 19.5 Reflect 中 construct

* 作用：执行A构造函数内容，但是创建出来的对象是B构造函数的对象

```javascript
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
```





#### ES7-ES12

##### 1. ES7

###### 1.1 includes 方法

注意:  ES7之前用 indexOf 方法返回的索引值是否等于-1判断数组中是否包含某个元素，ES7后直接使用includes判断数组是否包含某个属性

作用：判断数组中是否包含某个元素

indexOf 与 includes 区别：

* indexOf 不能判断数组中是否包含 NaN，includes 可以判断数组中是否包含 NaN

```javascript
const names = ['itchao', 'coderwhy', 'kobe']

// 以前常用判断数组是否包含某个元素 indexOf
if (names.indexOf('itchao') !== -1) {
  console.log('包含itchao');
}

// ES7/ES2016, 新增 includes 方法(判断数组是否包含某个元素)
// 可传入第二个参数，用于定义判断数组的起始位置
if (names.includes('kobe')) {
  console.log('包含kobe');
}
console.log(names.includes('kobe'));

// indexOf 与 includes 区别：indexOf不能判断NaN是否存在，includes能判断NaN是否存在
const N = [NaN]
if (N.indexOf(NaN) !== -1) {
  console.log('indexOf NaN');
}

if (N.includes(NaN)) {
  console.log('includes NaN');
}
```

###### 1.2 指数运算符

* ES7之前进行指数计算，需要通过Math.pow( )方法，ES7新增 ** 指数运算符

````javascript
const res1 = Math.pow(2, 4)

// ES7, 新增指数运算符 **
const res2 = 2 ** 4

console.log(res1, res2);
````

##### 2. ES8

###### 2.1 Object.values

* 之前可以通过Object.keys( )方法，获取对象所有的 key
* ES8新增通过Object.values( )方法，获取对象所有的 value

```javascript
const foo = {
  name: 'itchao',
  age: 22,
  height: 1.85
}

// 获取对象所有key
console.log(Object.keys(foo));
// 获取对象所有value
console.log(Object.values(foo));

// 传入数组、字符串（用的少）
console.log(Object.values([1, 2, 3])); // 直接打印数组本身
console.log(Object.values('itchao')); // 将字符串拆分，然后再放入一个数组中
```

###### 2.2 Object.entries

* 通过Object.entries获取一个数组，数组中存放可枚举属性的键值对数组

```javascript
const obj = {
  name: 'itchao',
  age: 22,
  height: 1.85
}

console.log(Object.entries(obj));
// [ [ 'name', 'itchao' ], [ 'age', 22 ], [ 'height', 1.85 ] ]

const objEntries = Object.entries(obj);
objEntries.forEach(item => {
  console.log(item[0], item[1]);
})

// 传入数组、字符串
console.log(Object.entries(['a1', 'b2', 'c3']));
console.log(Object.entries('abc'));
```

###### 2.3 String Padding

* 在字符串首部和尾部填充
* padStart：字符串首部填充
* padEnd：字符串尾部填充

```javascript
const message = 'itchao Good!'

const NewMessage = message.padStart(15, '*').padEnd(20, '^')
console.log(NewMessage);
// ***itchao Good!^^^^^
```

###### 2.4  Trailing-Commas

```javascript
// 以逗号结尾
// ES8，新增了可以在函数的参数末尾多一个逗号，函数调用时传参数也可以多一个逗号

function foo(a, b,) {
  console.log(a, b);
}

foo(1, 3,)
```

###### 2.5 Object Descriptors

* Object.getOwnPropertyDescriptors
* Async Function：async、await

##### 3. ES9

* Async iterators：迭代器
* Object spread operators：对象扩展运算符
* Promise finally：最终异步

##### 4. ES10

###### 4.1 flat 和 flatMap

* flat( )方法，**(降维的作用)**，按照一个可指定深度递归遍历数组，并将所有元素合并再返回成一个新数组
* flatMap( )方法，首先使用映射函数映射每个元素，然后把结果亚索成一个新数组
  * 注意一：flatMap先进行map操作，再进行flat操作
  * 注意二：flatMap中 flat相当于深度为1

```javascript
// 1. flat使用(数组降维)
const arr1 = [1, 2, [3, 4], 5, 7, [2, 1, [3, 5]]]
const newArr1 = arr1.flat(2)
// flat(),传参为降维的维度
console.log(newArr1);

// 2. flatMap使用
const arr2 = [1, 2, 4, 5, 3, 8]
const newArr2 = arr2.flatMap(item => {
  return item * 2
})

console.log(newArr2);

// 3. flatMap使用场景(将数组元素为字符串组的元素，单独抽离成单个字符串)
const message = ["itchao aa", "coderwhy bb", "kobe cc"]
const msg = message.flatMap(item => {
  return item.split(" ")
})
console.log(msg);
```

###### 4.2 Object.fromEntries

* 概念：将entries格式还原成对象格式

```javascript
const obj = {
  name: 'itchao',
  age: 22,
  height: 1.85
};

const objEntries = Object.entries(obj);
console.log(objEntries);

// 1. ES10, 新增Object.fromEntries, 将entries格式还原成对象格式
const replaceObj = Object.fromEntries(objEntries)
console.log(replaceObj);

// 2. Object.fromEntries 使用场景（url中传递参数的解析成对象格式）
const queryString = 'name=itchao&age=22&height=1.85'
const queryParams = new URLSearchParams(queryString)
console.log(queryParams);
for (const item of queryParams) {
  console.log(item);
}

const paramObj = Object.fromEntries(queryParams)
console.log(paramObj);
```

###### 4.3 trimStart和trimEnd

* trimStart：去除首部空格
* trimEnd：去除尾部空格

```javascript
const msg = '   itchao aaa     '
console.log(msg);

// trimStart 去除首部空格
console.log(msg.trimStart());
// trimEnd 去除尾部空格
console.log(msg.trimEnd());
// trim 去除首尾空格
console.log(msg.trim());
```

###### 4.4 ES10 其他知识点

* Symbol description
* Optional catch binding

##### 5. ES11

###### 5.1 BigInt

* 作用：表示最大数字

```javascript
// ES11之前，表示最大数使用 max_safe_integer
const max = Number.MAX_SAFE_INTEGER
console.log(max); // 9007199254740991

// ES11，表示最大数用 BigInt
const bigInt = 9007199254740991000000n
console.log(bigInt);
console.log(bigInt + 999n);

// BigInt类型与Number类型数字直接相加需要用 BigInt() 进行转换
const num = 10002
console.log(bigInt + BigInt(num));
```

###### 5.2 Nullish-Coalescing-operator

* 控制合并运算

```javascript
// ES11, 新增空值合并运算 ？？
// 使用空值合并运算？？，只有当值为null和undefined时，才显示默认值
// 使用或运算符||，当值为null、undefined、0、''时，都显示默认值

const foo = null
// const bar = foo || '默认值'
// console.log(bar);
const it = foo ?? '空值合并运算-默认值'
console.log(it);
```

###### 5.3 Optional Chaining

* 可选链
* 作用：让代码在进行null和undefined判断时更加清晰和简洁

```javascript
const info = {
  name: 'itchao',
  friend: {
    name: 'coderwhy',
    girlfriend: {
      name: 'hmm'
    }
  }
}

console.log(info);

// ES11, 新增可选链，Optional Chainling
// 无可选链时，访问undefined.属性，会直接报错，导致后续逻辑代码无法执行
const obj = {
  name: 'kobe'
}

console.log(obj);
console.log(obj.son);
// console.log(obj.son.name)  直接运行则会报错，影响后续逻辑代码执行
console.log(obj.son?.name)  // 使用可选链执行该代码，在执行到undefined时，直接不执行后续获取属性操作
```

###### 5.4 globalThis

* 作用：获取某一环境下的全局对象（global Object）

```javascript
// 获取某一个环境下的全局对象(Global This)

// ES11之前，获取全局对象，分情况讨论
// 1. window环境下
// console.log(this);
// console.log(window);
// 2. node环境下
// console.log(global);

// ES11, 新增globalThis, 获取某一环境下的全局对象
console.log(globalThis);
```

###### 5.5 for...in 标准化

* 对for...in 进行标准化，用于遍历对象的key值

```javascript
// ES11, 对 for...in 进行标准化，用于遍历对象的key值

const info = {
  name: 'itchao',
  age: 22,
  height: 1.85
}

for (const item in info) {
  console.log(item);
}
```

###### 5.6 ES11 其他知识点

* Dynamic Import
* Promise.allSettled
* import meta

##### 6. ES12

###### 6.1 FinalizationRegistry

* 作用：监听对象被销毁（垃圾回收）时请求一个回调
  * FinalizationRegistry 提供方法：当一个在注册表中注册的对象被回收时，请求在某个时间点上调用一个清理回调（finalizer）
  * 通过调用 register 方法，注册任何想要清理回调的对象，传入该对象和所含值

```javascript
// ES12, 新增 FinalizationRegistry类
const finalRegistry = new FinalizationRegistry(value => {
  console.log('注册在finalRegistry的对象，某一个被销毁', value);
})

let obj = {
  name: 'itchao'
}

let info = {
  age: 22
}

finalRegistry.register(obj, '名字')
finalRegistry.register(info, '年龄')

obj = null
info = null
```

###### 6.2 WeakRef

* 概念：使用弱引用获取对象
* 默认将一个对象赋值给另一个对象时，则引用是强引用

```javascript
// ES12, 新增 WeakRef 类
// WeakRef.prototype.deref
// 1. 如果原对象未被销毁，则可以直接获取原对象
// 2. 如果原对象已被销毁，则获取到的是undefined
const finalRegistry = new FinalizationRegistry(value => {
  console.log('注册在finalRegistry的对象，某一个被销毁', value);
})

let obj = {
  name: 'itchao'
}

let info = new WeakRef(obj)

finalRegistry.register(obj, '名字')

obj = null

// deref() 拿到弱引用的原始对象
console.log(info.deref()?.name);  // 使用可选链 ?. , 防止在undefined中获取值时出现报错
```

###### 6.3 logical-assign-operator

* 逻辑赋值运算

```javascript
// 1. ||= 逻辑或赋值运算
// let msg = undefined;
// msg = msg || '默认值（逻辑或赋值运算）'
// msg ||= '默认值（逻辑或赋值运算）'
// console.log(msg);


// 2. &&= 逻辑与赋值运算(使用场景很少)
// const obj = {
//   name: 'itchao',
//   foo: function () {
//     console.log('foo 函数被调用');
//   }
// };
// 判断前面的值是否存在，若存在则才继续判断后面的值是否存在
// obj && obj.foo && obj.foo()
// let info = {
//   name: 'itchao',
//   age: 22,
//   height: 1.85
// }

// info = info && info.name
// console.log(info);

// info &&= info.name
// console.log(info);


// 3. ??= 逻辑空赋值运算
// let a = ''
// a = a ?? '默认值（逻辑空赋值运算）'
// console.log(a);

// a ??= '默认值（逻辑空赋值运算）'
// console.log(a);
```

###### 6.4 ES12 其他知识点

* Numeric Separator：数字分割符 _ ，例子：123_456_789
* String.replaceAll：字符串替换

#### 原理

##### 1. 响应式原理

###### 1.1 什么是响应式

```javascript
let n = 10

// 响应式，实时动态改变，蝴蝶效应
console.log(n);

console.log(n ** 2);

// 用的最多：对象的响应式
const obj = {
  name: 'itchao',
  age: 22,
  height: 1.85
}

console.log('--------------');
console.log(obj.name);
console.log(obj.age);
console.log(obj.height);
```

###### 1.2 响应式函数封装

```javascript
// 对象的响应式，首先创建一个对象
const obj = {
  name: 'itchao',
  age: 22,
  height: 1.85
}

// 封装一个响应式函数
let r = []
function watchFns(fn) {
  r.push(fn)
}

watchFns(function () {
  console.log(obj.name, '-----');
})

function foo() {
  console.log(obj.age, '******');
}

obj.name = 'coderwhy'

r.forEach(fn => {
  fn()
})
```

###### 1.3 依赖收集类的封装

```javascript
// 对象的响应式，首先创建一个对象
const obj = {
  name: 'itchao',
  age: 22,
  height: 1.85
}

// 封装一个响应式函数
class Depend {
  constructor() {
    this.r = []
  }

  addDepend(foo) {
    this.r.push(foo)
  }

  notify() {
    this.r.forEach(foo => {
      foo()
    })
  }
}

const depend = new Depend()
function watchFns(fn) {
  depend.addDepend(fn)
}

watchFns(function () {
  console.log(obj.name, '-----');
})

function foo() {
  console.log(obj.age, '******');
}

obj.name = 'coderwhy'
depend.notify()
```

###### 1.4 自动监听对象变化

```javascript
// 对象的响应式，首先创建一个对象
const obj = {
  name: 'itchao',
  age: 22,
  height: 1.85
}

// 封装一个响应式函数
class Depend {
  constructor() {
    this.r = []
  }

  addDepend(foo) {
    this.r.push(foo)
  }

  notify() {
    this.r.forEach(foo => {
      foo()
    })
  }
}

// 封装一个获取depend函数
const targetMap = new WeakMap()
function getDepend(target, key) {
  // 根据target对象获取map的过程
  let map = targetMap.get(target)
  if (!map) {
    map = new Map()
    targetMap.set(target, map)
  }

  // 根据key获取depend对象
  let depend = map.set(key)
  if (!depend) {
    depend = new Depend()
    map.set(key, depend)
  }
}

const depend = new Depend()
function watchFns(fn) {
  depend.addDepend(fn)
}

// 获取对象的属性变化，Proxy(Vue3),Object.defineProperty(Vue2)
const pObj = new Proxy(obj, {
  get(target, key, receiver) {
    return Reflect.get(target, key, receiver)
  },
  set(target, key, newValue, receiver) {
    Reflect.set(target, key, newValue, receiver)
    const depend = getDepend(target, key)
    depend.notify()
  }
})

watchFns(function () {
  console.log(pObj.name, '-----');
})

function foo() {
  console.log(pObj.age, '******');
}

pObj.name = 'coderwhy'
```



<hr/>

#### 严格模式

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

#### 深入学习对象

##### 对象概念

* JavaScript 支持多重编程范式,包括**函数式编程和面向对象编程**:

  * Javascript 中的对象被设计成一组**属性的无序集合**,由 key 和 value 组成
  * **key：标识符名称,value：可以是任意类型**,也可以是**其他对象或者函数类型**
  * 如果值是**一个函数**,那这个函数可以称之为**对象的函数**

##### 创建对象的方式:

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
    ```

* Object.defineProperty()方法

  * 直接在对象上定义一个新属性,或者修改一个对象的现有属性,并返回此对象

  * ```javascript
    Object.defineProperty(obj, prop, descriptor)
    ```

  * 可接收三个参数:

    * obj:要定义属性的对象
    * prop:要定义或者修改的属性的名称或者Symbol
    * descriptor:要定义或修改的属性描述符 (属性描述符是一个对象)

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

  * Configurable（可配置）：属性是否通过 delete 删除、是否修改它的特性，是否将它修改为存取属性描述符
    * 直接在一个对象上定义某个属性时，Configurable 默认为 **true**
    * 通过属性描述符定义一个属性时，Configurable 默认为 **false**
  * Enumerable（可枚举）：属性是否可以通过 for-in 或者 Object.keys() 返回该属性
    * 直接在一个对象上定义某个属性时，Enumerable 默认为 **true**
    * 通过属性描述符定义一个属性时，Enumerable 默认为 **false**
  * Writable（可书写）：是否可以修改属性值
    * 直接在一个对象上定义某个属性时，Writable 默认为 **true**
    * 通过属性描述符定义一个属性时，Writable 默认为 **false**
  * value（属性值）：读取属性时，返回该值；修改属性时，修改该值
    * 默认情况下这个值是 **undefined**

* 存储属性描述符:

  * 隐藏某一个私有属性不希望直接被外界使用和赋值
  * 如果我们希望截获一个属性它访问和设置值得过程时,也会使用存储属性描述符

* 定义多个属性描述符:
  * 私有属性：JS 没有严格意义上的私有属性，但用 _ 开头都默认是私有属性或者私有方法
  * Object.defineProperties( )：定义多个对象

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
  
  // Object.preventExtensions( ): 阻止对象添加新属性
  Object.preventExtensions(obj)
  
  // delete:删除对象内元素
  delete  obj.age
  console.log(obj)
  // freeze(): 阻止对象更新属性值(writable:false)
  Object.freeze(obj)
  obj.name = 'itchao'
  console.log(obj.name)
  ```


##### 创建多个对象方案:

* 工厂模式:

  * 工厂模式是一种常见的设计模式

  * 通过工厂方法可以产生想要的对象

  * ```javascript
    // 工厂模式:工厂函数
    function createPerson(name, age){
      let p = {}
      p.name = name
      p.age = age
      p.eating = function(){
        console.log(this.name + 'eating')
      }
      return p
    }
    
    let foo1 = new createPerson('itchao',19)
    let foo2 = new createPerson('coderwhy',20)
    console.log(foo1)
    console.log(foo2)
    
    // 工厂模式的缺点(获取不到对象最真实类型)
    console.log(foo1, foo2)
    ```
  
* **构造函数:**

  * 构造函数也称为构造器(constructor)，通常在常见对象时会调用的函数

  * 其他面向对象编程语言里，构造函数存在于类中的一个方法，称为构造方法

  * 但是 JavaScript 中构造函数不一样

  * ```javascript
    function foo(){
    console.log('foo____')
    }
    
    // 这样调用就是一个普通的函数
    foo()
    
    // 通过new调用函数就变成了构造函数
    // 在 JavaScript 中任何函数都是普通函数，也可以是构造函数
    new foo()
    ```
    
  * new操作符调用的作用:

    1. 在内存中创建一个新的空对象
    2. 这个对象内部的[[prototype]]属性会被赋值为该构造函数的prototype属性
    3. 构造函数内部 this 指向：创建出来的新对象
    4. 执行函数的内部代码(函数体代码)
    5. 如果构造函数没有返回非空对象,则返回创建出来的新对象

  * 构造函数的使用介绍:

    * ```javascript
      // 规范：构造函数的首字母一般都是大写
      function Person(name, age, height){
        this.name = name
        this.age = age
        this.height = height
        this.eating = function(){
          console.log('eating')
        }
      }
      
      let kobe = new Person('kobe',18,1.98)
      let james = new Person('james',19,2.03)
      console.log(kobe, james)
      ```

##### 对象知识补充

* 对象方法的补充:

  * hasOwnProperty
    * 验证某个属性是否存在于：对象（只判断对象本身，不判断对象原型）
  * in/for in 操作符
    * 验证某个属性是否存在于：对象或对象原型
  * instanceof
    * 用于检测**构造函数的 prototype**，是否出现在**某个实例对象的原型链**上
  * isPrototypeOf
    * 用于检测**某个对象**，是否出现在**某个实例对象的原型链**上

* 对象 — 函数 — 原型的关系:（对象的隐式原型 === 构造函数的显示原型）

  * ```javascript
    let obj = {
      name:'itchao',
      age:18
    }
    
    // 对象有隐式原型：__proto__
    console.log(obj.__proto__)
    
    // Foo 是函数时有显示原型：prototype
    // Foo.prototype来自哪里?
    // 答案:创建了一个函数，Foo.prototype = {constructor: Foo}
    
    // Foo 是对象时,它有隐式原型：Foo__proto__
    // Foo.__proto__来自哪里?
    // 答案:new Function，Foo.__proto__ = Function.prototype
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

#### 原型和原型链 (重要)

##### 原型理解

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

##### 原型应用

* Person构造函数原型:

  ```javascript
  function Person(){
  
  }
  
  let p1 = new Person()
  
  // 对象隐式原型__proto__ === 构造函数显示原型prototype
  console.log(p1.__proto__ === Person.prototype)
  
  // 例子:如果要打印一个对象的name属性,假如该对象没有age属性,那么会沿着原型链去向上查找,看原型链上是否有name属性
  
  // console.log(p1.name)  // 输出结果:undefined
  
  // p1.__proto__.name = 'kobe'
  // console.log(p1.name)  // 输出结果:kobe
  
  Person.prototype.name = 'james'
  console.log(p1.name)  // 输出结果:james
  ```
  
* 函数原型上的属性:

  ```javascript
  function foo(){
      
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
  
  // 真实开发中可以通过Object.defineProperty方式添加constructor
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
  
  let foo1 = new foo('itchao',20,1.85)
  console.log(foo1)
  foo1.eat()
  ```

##### 原型链

```javascript
let obj = {
  name:'itchao',
  age:18
}

// [[get]]操作
// 1.在当前对象查找属性
// 2.如果没有找到,这个时候就会去原型(__proto__)对象上查找

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

  * [Object:null prototype] { },是最顶层的原型

    * 从Object 直接创建出来的对象的原型都是[Object:null prototype] { }
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

  * Object 是所有类的父类:

    * 原型链最顶层的原型对象：Object 原型对象

* **JavaScript中的类和对象:**

  * 在 JS 中 Person，被称为构造函数

  * 面向对象语言中,也习惯称之为类,因为类可以创建出对象p1、p2

  * 面向对象的编程范式角度看, Person 可以称之为类

    ```javascript
    //例子
    function foo(){  // foo是普通的函数
        
    }
    
    let foo1 = new foo()  // 通常称foo为类
    let foo2 = new foo()
    ```

#### 面向对象的特性—继承

##### 继承概念

* 面向对象的三大特性:封装、继承、多态
  * 封装:将属性和方法封装到一个类中,可以称之为封装的过程
  * 继承:继承是面向对象中非常重要的,不仅仅可以减少重复代码的数量,也是多态的前提(纯面向对象中)
  * 多态:不同的对象在执行时表现出不同的形态
* 继承是做什么呢?
  * 继承可以帮助我们将重复的代码和逻辑抽取到父类中,子类只需要直接继承过来使用即可
* 父类、子类：子类可以继承自父类

##### 继承实现

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
      * 问题一: 构造函数会被调用两次,一次在创建子类型原型对象的时候,一次在创建子类型实例的时候
      * 问题二: 父类型中的属性会有两份:一份在原型对象中,一份在子类型实例中
    
  * 事实上,可以利用寄生式继承将这两个问题解决掉

    * 需要明确一点:当在子类型的构造函数中调用父类型.call(this,参数)这个函数时,就会将父类型中的属性和方法复制一份到子类型中,所以父类型本身里面的内容,不再需要
    * 这时,还需要获取一份父类型的原型对象中的属性和方法

  * 能不能直接让子类型的原型对象 = 父类型的原型对象?

    * 不要这么做,因为这么做意味着以后修改了子类型原型对象的某个引用类型的时候,父类型原生对象的引用类型也会被修改
    * 使用前面的寄生式思想就可以了

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

#### JSON 与数据存储

##### 1. JSON 基础知识

* 概念：JSON 是一种可以用于服务器与客户端之间进行传递的数据格式，不是一门编程语言
* 使用场景：
  * 网络数据传输 JSON 数据
  * 项目某些配置文件
  * 非关系型数据库（NoSQL）将 JSON 作为存储格式
* JSON 顶层支持三种类型的值：
  * 简单值：数值、字符串（只支持双引号）、布尔值、null 类型
  * 对象值：由 key、value 组成，key 是字符串类型（只支持双引号），value 值可以是简单值、对象值、数组值
  * 数组值：数组内的值可以是简单值、对象值、数组值

##### 2. JSON 序列化

* 序列化：
  * 概念：将对象或数组类型转换成字符串 string 类型，便于使用 JSON 数据格式存储
  * 语法：JSON.stringlfy( obj )
* 反序列化：
  * 概念：将 JSON 数据格式还原成原始数据格式（对象、数组等类型）
  * 语法：JSON.parse( jsonObj )

##### 3. JSON 数据存储

* Storage 提供两种 key、value 存储方式：
  1. localStorage：本地存储。提供永久存储，不会自动删除数据，需要手动删除数据
  2. sessionStorage：会话存储。提供会话存储，会话结束就删除数据
* Storage 常见方法和属性：(localStorage 和 sessionStorage 的常见方法和属性相同)
  1. 存储数据：localStorage.setItem(key, value)。注意判断value类型，如果value是对象或者数组类型，需要通过JSON.stringify( )
  2. 读取数据：localStorage.getItem(key)
  3. 获取长度：localStorage.length
  4. 获取key值：localStorage.key(index)
  5. 清除某个数据：localStorage.removeItem(key)
  6. 清空数据：localStorage.clear( )

#### async_await

##### 1. async 异步函数写法

* 普通函数：

  ```javascript
  async function foo() {
  }
  ```

* 箭头函数：

  ```javascript
  const foo = async () => {
  }
  ```

* class 类里面的函数：

  ```javascript
  class Person {
    async foo() {
    }
  }
  ```

##### 2. 异步函数执行流程

```javascript
//  只写 async 时,该函数与普通函数的执行流程是一样的（单线程执行）
 async function foo() {
  console.log(1);
  console.log(2);
  console.log(3);
}

console.log('start');
foo()
console.log('end');
```

##### 3. async 函数与普通函数区别

* 区别一：返回值

  * 异步函数的返回值一定是一个 promise
  * 返回值类型：
    1. 普通值
    2. 返回 thenable
    3. 返回 Promise

* 区别二：异常

  * 异步函数中的异常,会被作为异步函数返回的 promise 的 reject 值，而且需要用 catch 方法接收错误信息

    ```javascript
    async function foo() {
      console.log('start');
    
      throw new Error('err')
      console.log('end');
    }
    
    foo().catch( err => console.log('错误信息:', err))
    
    console.log('后续代码!');
    ```

* 区别三：await

  * 

 #### 进程与线程

##### 1. 进程与线程基础知识

* 线程和进程是操作系统中的两个概念：
  * 进程（process）：计算机已经运行的程序，是操作系统管理程序的一种方式；
  * 线程（thread）：操作系统能够运行运算调度的最小单位，通常情况下它被包含在进程中；
* **听起来很抽象，这里还是给出我的解释：**
  * 进程：我们可以认为，启动一个应用程序，就会默认启动一个进程（也可能是多个进程）；
  * 线程：每一个进程中，都会启动至少一个线程用来执行程序中的代码，这个线程被称之为主线程； 
  * 所以我们也可以说进程是线程的容器；
* **再用一个形象的例子解释：**
  * 操作系统类似于一个大工厂；
  * 工厂中里有很多车间，这个车间就是进程；
  * 每个车间可能有一个以上的工人在工厂，这个工人就是线程；

##### 2. 浏览器中的 JavaScript 线程

* 通常说 JavaSctipt 是单线程执行，但 JavaScript 线程也有自己的容器进程：浏览器或 Node
* 浏览器是多进程，有多线程运行：
  * 目前多数浏览器都是多进程，当打开一个 tab 页面时就会开启一个新进程，这是为了防止一个页面卡死而造成所有页面无法响应，整个浏览器需要强制退出
  * 每个进程又有很多线程，其中就包括执行 JavaScript 代码进程
* JavaScript 代码是单线程执行：
  * JavaScript 代码在同一时刻只能做一件事
  * 如果这件事是非常耗时的，则意味着当前线程会被阻塞
* 所以真正耗时的操作，实际上并非由 JavaScript 线程执行：
  * 浏览器每个进程是多线程的，那么其他线程就可以完成这个耗时操作
  * 比如网络请求、定时器，只需要在特定的时候执行对应回调即可

#### 包管理工具

##### 1. npm

1.1 包管理工具配置文件（package.json）

* 概念：存储当前项目和所依赖的相关信息
* 初始化：npm init
* dependencies：生产和开发时都依赖（核心库：Vue、Vuex 等）
* devDependencies：开发时依赖（工具类库：ESLint、Less 等）
* 全局安装：npm i webpack -g（工具类库）
* 局部安装：npm i vue（核心库）
* 生产和开发时依赖安装：npm i vue
* 开发时依赖安装：npm i webpack -D
* npm install 原理：

##### 2. yarn

* 概念：以前为了解决 npm 不足时，几个大公司一起研发的依赖管理工具

##### 3. cnpm

* 概念：不能无法直接从 npm 下载包时，可以通过 cnpm 进行下载包

##### 4. npx

* 概念：npm5.2 之后自带的命令，通常用于调用项目中某个模块的命令

#### Cookie_BOM_DOM

##### 1. Cookie

* 概念：第一次访问服务器时，服务器设置 Cookie，再存储到浏览器上。当浏览器再次发送请求时，自动携带 Cookie 进行请求数据
* 缺点：
  1. 将 cookie 附加到每一次的http 请求中
  2. 明文传输，安全性低
  3. 大小限制：4kb
  4. cookie 验证登录（只有浏览器能自动携带，不是很方便）

##### 2. BOM

* 概念：浏览器对象模型（Brower Object Model）
* 分析：BOM 可以看成是 JavaScript 与 浏览器的连接桥梁
* BOM 主要的对象模型：
  1. window：包括全局属性、方法，控制浏览器窗口相关的属性、方法
  2. location：浏览器连接到的对象位置（URL）
  3. history：操作浏览器历史
  4. document：当前窗口操作文档的对象

##### 3. DOM

* 概念：文档对象模型（Document Object Model）
* 分析：JavaScript 通过 DOM 操作浏览器元素 

##### 4. 事件监听

* 概念：一些与浏览器进行交互的事情
* 常见例子：鼠标点击、移动、滚动 等等
* 分析：事件在浏览器被触发，并且绑定在元素或浏览器，就可以给元素或浏览器绑定事件处理程序，来对事件进行监听

##### 5. 事件流

* 概念：点击一个元素之后，会让父元素也产生相应事件形成的一系列现象
* 事件冒泡：事件监听从内层元素依次到外层元素
* 事件捕获：事件监听从外层元素依次到内层元素
* event 对象：
  1. 概念：一个事件发生后，存储事件相关信息的对象
  2. 常见属性：
     * type：事件类型
     * target：当前事件发生元素
     * currentTarget：当前处理事件元素
     * offsetX、offsetY：点击元素位置
  3. 常见方法：
     * 阻止默认事件：   event.preventDefault( )
     * 阻止冒泡/捕获事件：   event.stopPropagation( )

#### 异常处理

##### 1. 函数出现错误处理

```javascript
function sum(num1, num2) {
  if (typeof num1 !== "number" || typeof num2 !== "number") {
    throw "参数类型不正确"; // 1.主动抛出异常，提示使用者解决异常，并且停止后续代码执行
    // return '参数类型不正确' // 2. return 提示使用者异常，但后续代码会继续执行
  }
  return num1 + num2;
}

console.log(sum("a", "2"));
```

##### 2. 抛出异常其他补充

```javascript
// 创建异常类
class WCError {
  constructor(err, msg) {
    this.err = err;
    this.msg = msg;
  }
}

function foo(type) {
  console.log("开始执行!");

  if (type === 0) {
    // throw "类型不能为 0"; // 1. 抛出基本数据类型（String，Number， Boolean）
    // throw { ErrorCode: -1, ErrorMessage: "类型不能为 0" }; // 2. 常见用法：抛出对象
    // throw new WCError(-1, "类型不能为 0"); // 3. 定义一个类，然后使用类抛出异常
    // throw new Error("类型不能为 0");
    // 4. 使用JavaScript 内置定义好的 Error 错误抛出类
    /**
     *  4.1 Error 包含三个属性
     *   01_ message： 创建 Error 对象时传入的 message
     *   02_ name：Error 的名称，通常和类名一致
     *   03_ stack：整个 Error 错误信息，包括函数调用栈，直接打印 Error 对象时，打印的就是 stack
     *  4.2 Error 子类
     *   01_ RangeError：下标值越界的错误类型
     *   02_ SyntaxError：解析语法的错误类型
     *   03_ TypeError：类型错误的错误类型
     */
    throw new TypeError("类型错误:不能为 0!"); // 5. TypeError（类型错误） 为 Error 子类

    //TODO: throw 抛出错误后，后续代码不再执行
  }

  console.log("结束执行");
}

foo(0);

//TODO: 函数调用栈：函数调用的顺序
// 例子(a3 -> a2 -> a1)

function a3() {
  console.log("打印a3函数信息!");
}

function a2() {
  a3();
}

function a1() {
  a2();
}
```

##### 3. 抛出异常处理

```javascript
function foo() {
  throw new Error("主动抛出异常!");
}

// 两种处理方式:
// 方法一：不处理，则异常会进一步抛出，直到最顶层调用
//  如果最顶层也未对异常进行处理，则程序会终止执行，并且报错

// function test() {
//   foo();
// }

// 方法二: 使用 try catch 主动捕获异常，然后对错误进行处理
function test() {
  try {
    foo();
  } catch (err) {
    console.log("错误信息:", err.message);
  } finally {
    console.log("finally 处理事件!");
  }
}

function demo() {
  test();
}

demo();
```

#### 模块化

* 概念：将程序分成一个个小的结构，每个小结构就是模块
* 特征：
  1. 每个结构编写自己的逻辑代码，有自己的独立作用域，不影响其他结构
  2. 每个结构可以导出变量、函数、对象 等给其他结构使用
  3. 每个结构可以从其他结构中导入变量、函数、对象等
* 不同规范化：AMD、CMD、CommonJS、ESModule
* 没有模块化导致的问题：
  1. 多个 js 文件没有自己作用域，可能存在变量名冲突
  2. 可以使用立即执行函数表达式解决变量没有作用域的问题，但是又会存在让代码混乱、各个公司规范不一致等问题

##### 4.1 CommonJS 规范

* 概念：CommonJS 是一种规范
* CommonJS 与 Node 的关系：
  1. Node 是对 CommonJS 的规范进行支持和实现，让开发 node 过程中更加方便的进行模块化开发
  2. Node 中每个 js 文件就是一个单独的模块
  3. 这个单独的模块包括 CommonJS 规范的核心变量：exports、module.exports、require
*  exports、module.exports：对模块内容进行导出
* require：导入其他模块（自定义模块、系统模块、第三方模块）

###### 4.1.1 导出

1. module.exports：（用的最多的一种方式）

   * 使用方式：

     * 直接导出属性

       ```javascript
       const name = itchao
       module.exports.name = name
       ```

     * 导出对象

       ```javascript
       const name = itchao
       const age = 18
       const height = 1.88
       
       module.exports = {
         name,
         age,
         height
       }
       ```

2. exports：（exports 是符合 CommonJS 规范，但是 node 社区逐渐抛弃这种用法）

   * 使用方式：

     ```javascript
     exports.name = name
     exports.age = age
     exports.height = height
     ```

   * 源码分析：

     ```javascript
     // 将 module.exports 对象地址赋值给 exports，因为他们两个是同一个对象
     module.exports = {}
     exports = module.exports
     
     // 结论：导出对象始终是 module.exports 对象
     ```

###### 4.1.2 导入

1. require：

   * 使用方式:

     ```javascript
     const obj = require('./wc.js')
     ```

   * 分析：

     1. require 传的参数是一个路径
     2. require 返回值是一个对象，即导出文件导出的对象
     
   * 细节：{ 导入格式：`require(X) `}

     1. 查找规则：
        * 情况一：X 是一个 Node 的核心模块，比如： path、http 等，则直接返回核心模块，并且停止查找
        * 情况二：X 以 ./ 或 ../ 或 / (根目录) 开头（路径）
          * 第一步：把 X 当成一个文件，在对应目录下查找：
            1. 如果有后缀名，则直接按照后缀名的格式查找对应的文件
            2. 如果没有后缀名，则按照如下顺序查找：
               1. 直接查找文件 X
               2. 查找 X.js 文件
               3. 查找 X.json 文件
               4. 查找 X.node 文件
          * 第二步：没有找到对应的文件，则将 X 作为一个目录（查找目录下面的 index 文件）
            1. 查找 X/index.js 文件
            2. 查找 X/index.json 文件
            3. 查找 X/index.node 文件
          * 第三步：如果都没有找到，则报错：not found
        * 情况三：直接是一个 X（没有路径），并且 X 不是一个核心模块
          * 则会以从当前目录的 node_modules 文件夹中查找，如果没有找到则依次向外在对应的 node_modules 文件夹查找，直到在根目录 /node_modules 文件夹中查找
          * 如果在所有目录下的 node_modules 文件夹中都没有查找到对应文件，则报错：not found

###### 4.1.3 内部原理

1. 对象保存的是内存地址
2. `module.exports` 导出的是一个对象，这个对象拥有自己的内存地址
3. `require` 导入的返回值是一个对象，这个对象就是导出时的对象
4. 导出和导入的是同一个对象，拥有同样的内存地址

###### 4.1.4 模块的加载过程

* 结论一：模块在被第一次引入时，模块中的 js 代码会被运行依次
* 结论二：模块被多次引入时，会缓存，最终只加载依次
  * 因为每个模块对象 module 都有一个属性：loaded
  * loaded 属性默认值为 false 表示未加载，当加载过一次后 loaded 属性值变成 true，就形成了缓存效果
* 结论三：如果有循环引入，那么加载顺序是什么？
  * 形成一种数据结构：图结构
  * Node 中采用图结构遍历的深度优先搜索算法

###### 4.1.5 CommonJS 规范缺点

* CommonJS 加载模块是同步的：
  * 同步意味着只有等到对应模块加载完毕，当前模块中的内容才能被运行
  * 在服务器没问题，因为服务器加载的 js 文件都是本地文件，加载速度非常快
* 如果将它应用于浏览器呢？
  * 浏览器加载 js 文件需要先从服务器将文件下载下来，然后再加载运行
  * 采用同步就意味着后续的 js 代码都无法正常运行，即使是一些简单的 DOM 操作
* 所以在浏览器中，通常不使用 CommonJS 规范：
  * 在 webpack 中使用 CommonJS 时，它会把本地的代码转成浏览器可以直接执行的代码
* 在早期为了可以在浏览器中使用模块化，通常会采用 AMD 或 CMD
  * 但是目前一方面现代浏览器已经支持 ES Modules
  * 另一方面借助于 webpack 等工具可以实现对 CommonJS 或者 ES Module 代码的转换
  * 现在 AMD 和 CMD 已经使用的非常少了

##### 4.2 AMD 规范

* 概念：主要应用于浏览器的一种模块化规范
* AMD：Asynchronous Module Definition（异步模块定义）的缩写
* 采用异步加载模块

##### 4.3 CMD 规范

* 概念：主要应用于浏览器的一种模块化规范
* CMD：Common Module Definition（通用模块定义）的缩写
* 采用异步加载模块

##### 4.4 ES Module 规范

* 概念：
  1. export 负责将模块内容导出
  2. import 负责从其他模块导入内容
  3. 采用编译期静态分析，并且加入了动态引入的方式
4. 采用 ES Module 将自动开启严格模式：use strict（了解）


###### 4.4.1 导出

1. export + 声明语句：

   ```javascript
   export const name = 'itchao'
   export const age = 18
   export const height = 1.88
   ```

2. export 导出和声明语句分开：

   ```javascript
   const name = 'itchao'
   const age = 18
   const height = 1.88
   
   export {
     name,
     age,
     height
   }
   ```

3. export 导出和声明语句分开（导出时起别名）：

   ```javascript
   const name = 'itchao'
   const age = 18
   const height = 1.88
   
   export {
     name as fName,
     age as fAge,
     height as fHeight
   }
   ```

4. 默认导出：(默认导出只有一个)

   ```javascript
   // 方式一：
   const name = 'itchao'
   const age = 18
   const height = 1.88
   
   export {
     name,
     age,
     height as default
   }
   
   // 方式二:
   const name = 'itchao'
   const age = 18
   const height = 1.88
   
   export default name
   ```

###### 4.4.2 导入

1. 普通导入：

   ```javascript
   import { name , age, height } from './foo.js'
   ```

2. 普通导入（导入时起别名）：

   ```javascript
   import { name as fName, age as fAge, height as fHeight } from './foo.js'
   ```

3. 将导出所有内容放到一个标识符中：

   ```javascript
   import * as importObj from './foo.js'
   ```

4. 默认导入：

   ```javascript
   import foo from './foo.js'
   ```

   

###### 4.4.3 导入和导出结合使用

* （封装 utils 工具文件夹时，最好在里面创建一个 index.js 出口文件进行整合）

1. 先导入再导出：

   ```javascript
   import { add, sub } from './math.js'
   import { timeFormat, priceFormat } from './format.js'
   
   export {
     add,
     sub,
     timeFormat,
     priceFormat
   }
   ```

2. 导入时直接导出：

   ```javascript
   export { add, sub } from './math.js'
   export { timeFormat, priceFormat } from './format.js'
   ```

3. 导入时直接全量导出：

   ```javascript
   export * from './math.js'
   export * from './format.js'
   ```

###### 4.4.4  import 函数

* 注意：（导入为同步执行代码，需要执行成功之后，才执行后续代码，因此可能存在阻塞问题！）

  ````javascript
  import foo from './foo.js'
  ````

* import ( ):

  * 返回值是一个 Promise

  * 示例：

    ```javascript
    import('./foo.js').then(res => {
        console.log('res: ', res)
    })
    ```

###### 4.4.5 ES Module 解析流程

* ES Module 解析过程分为三个阶段：
  * 阶段一：构建；根据地址查找 js 文件，并且下载，然后将其解析成模块记录
  * 阶段二：实例化；对模块记录进行实例化，并且分配内存空间，解析模块导入和导出语句，把模块指向对应内存地址
  * 阶段三：运行；运行代码，计算值，然后将值填充到内存地址中

##### 4.5 CommonJS 与 ES Module 结合使用

* 开发环境：
  1. 浏览器（不支持）
  2. node（根据 node 版本进行区分）
  3. webpack（支持）

#### 浏览器 Node 事件循环（微任务_宏任务）

* 事件循环概念：（包括微任务队列和宏任务队列）
  1. js 单线程执行同步任务 
  2. --(遇到异步任务)--> 放入其他线程执行
  3.  --> 等待一段时间后，把其他线程放入到事件队列中 
  4. --(同步任务执行完成之后)-->再把事件队列中的异步任务放到 js 单线程执行
* 微任务队列（microtask queue）：
  * 示例：Promise 的 then 回调、Mutation Observe API、queueMicrotask( ) 等
* 宏任务队列（macrotask queue）：
  * 规范：微任务队列清空后才开始执行宏任务
  * 示例：ajax、setTimeout、setInterval、DOM 监听、UI Rendering 等
* 事件循环执行顺序：
  1. main script 中的代码优先执行（编写的顶层 script 代码）
  2. 在执行每个宏任务之前，都会先查看微任务队列中是否有任务需要执行
     * 执行宏任务之前，必须保证微任务队列为空
     * 如果微任务队列不为空，则优先执行微任务队列中的微任务（回调），之后再开始执行宏任务

#### 数组常用方法























