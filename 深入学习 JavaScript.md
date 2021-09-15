# 深入学习 JavaScript

* V8引擎
  1. 代码被解析,v8引擎内部会创建一个对象(GlobalObject -> go)
  2. 运行代码
     * v8为了执行代码,v8yinqi八引擎内部会有一个执行上下文栈(Execution Context Stack,ECStack)(函数调用栈)
     * 执行全局代码时,为了全局代码能够正常的执行,需要创建全局执行上下文(Global Execution Context)(全局代码需要被执行时才会创建 )

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

