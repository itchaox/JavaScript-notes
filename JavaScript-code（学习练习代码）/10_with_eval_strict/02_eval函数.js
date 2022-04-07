// 基础用法,输出结果:itchao
var name = 'itchao'
console.log(name)

// eval函数
var jsString = 'var name = "itchaoxx"; console.log(name);'

eval(jsString)

// 不建议使用eval函数
// * eval代码的可读性非常差(代码的可读性是高质量代码的重要原则)
// * eval是一个字符串,那么可能在执行的过程中被刻意篡改,那么可能会造成被攻击的风险
// * eval的执行必须经过JS解释器,不能被JS引擎优化
