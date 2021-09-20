function foo(){
  function bar(){
    var name = 'foo'
    console.log('bar!',name)
  }
  return bar
}
let foo1 = new foo()
foo1()