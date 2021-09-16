// 基础代码
var name = 'itchaox'

function foo(){
  function x(){
    console.log(name)
  }
  x()
}
foo()

// with语句:形成自己到作用域

var player = {name:'kobe',age:18}
function foo(){
  function x(){
    with(player){
      console.log(name)
    }
  }
  x()
}
foo()