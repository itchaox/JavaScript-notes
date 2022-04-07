function foo(){
  function bar(){
    console.log('bar!!!!')
  }
  return bar
}
let fo = new foo()
fo()