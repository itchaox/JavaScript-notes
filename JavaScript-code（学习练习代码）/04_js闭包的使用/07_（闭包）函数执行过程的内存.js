function foo(){
  let name = 'itchao'
  let age = 18
  function bar(){
    console.log(name, age)
  }
  return bar
}
let fo = foo()

fo()