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
    * 标记清除:
      * 概念:这个算法是设置一个根对象(root object),垃圾回收器会定期从这个根开始,找所有从根开始有引用到的对象,对于哪些没有引用到的对象,就认为是不可用的对象
      * 这个算法可以很好的解决循环引用到问题
    * JS引擎比较广泛的采用的就是**标记清除算法,**当然类型于V8引擎为了进行更好的优化,它在算法的实现细节上也会结合一些其他的算法

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

